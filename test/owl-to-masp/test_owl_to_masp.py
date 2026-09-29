"""Unit tests for scripts/owl-to-masp.py.

See scripts/owl-to-masp.spec.md for the spec these tests verify, and
test_data/owl/fixture.ttl for the fixture ontology exercised here.
"""

import importlib.util
import json
import sys
from datetime import datetime
from pathlib import Path

import pytest

REPO_ROOT = Path(__file__).resolve().parents[2]
FIXTURE = REPO_ROOT / "test_data" / "owl" / "fixture.ttl"
EXTRA_FIXTURE = REPO_ROOT / "test_data" / "owl" / "fixture-extra.ttl"
NAMESPACE = "http://example.org/ns#"
EXTRA_NAMESPACE = "http://example.org/extra#"
FIXED_START_TIME = "2026-01-01T00:00:00+00:00"


def _load_module():
    spec = importlib.util.spec_from_file_location("owl_to_masp", REPO_ROOT / "scripts" / "owl-to-masp.py")
    module = importlib.util.module_from_spec(spec)
    sys.modules[spec.name] = module
    spec.loader.exec_module(module)
    return module


owl_to_masp = _load_module()


def _by_id(entities, entity_id):
    for entity in entities:
        if entity["@id"] == entity_id:
            return entity
    raise KeyError(entity_id)


@pytest.fixture
def crate(tmp_path):
    output_dir = tmp_path / "fixture-schema"
    metadata_path = owl_to_masp.convert(
        str(FIXTURE),
        str(output_dir),
        namespace=NAMESPACE,
        name="Fixture Schema",
        start_time=FIXED_START_TIME,
    )
    return json.loads(metadata_path.read_text(encoding="utf-8"))


def test_writes_ro_crate_metadata_with_graph(crate):
    assert "@graph" in crate
    assert isinstance(crate["@graph"], list)


def test_writes_schema_text_stub(tmp_path):
    output_dir = tmp_path / "fixture-schema"
    owl_to_masp.convert(str(FIXTURE), str(output_dir), namespace=NAMESPACE, name="Fixture Schema")
    schema_text = (output_dir / "schema-text.md").read_text(encoding="utf-8")
    assert "${rules.all}" in schema_text
    assert "Fixture Schema" in schema_text


def test_in_namespace_classes_are_converted(crate):
    widget = _by_id(crate["@graph"], "http://example.org/ns#Widget")
    assert widget["@type"] == "rdfs:Class"
    assert widget["rdfs:label"] == "Widget"
    assert widget["name"] == "Widget"
    assert widget["rdfs:comment"] == "A basic fixture class."


def test_label_is_local_name_and_name_is_the_expanded_owl_label(crate):
    # ex:Gadget's OWL rdfs:label ("Gadget Class") deliberately differs from
    # its IRI's local name ("Gadget") -- MASP's rdfs:label must be the local
    # name (the JSON-LD term), and name must carry the expanded OWL label.
    gadget = _by_id(crate["@graph"], "http://example.org/ns#Gadget")
    assert gadget["rdfs:label"] == "Gadget"
    assert gadget["name"] == "Gadget Class"

    # Same split on a property: local name "hasWidget" vs OWL label "has widget".
    has_widget = _by_id(crate["@graph"], "http://example.org/ns#hasWidget")
    assert has_widget["rdfs:label"] == "hasWidget"
    assert has_widget["name"] == "has widget"


def test_out_of_namespace_class_is_excluded(crate):
    ids = {entity["@id"] for entity in crate["@graph"]}
    assert "http://example.org/external#Thing" not in ids


def test_named_subclass_of_is_kept_as_array(crate):
    gadget = _by_id(crate["@graph"], "http://example.org/ns#Gadget")
    assert gadget["rdfs:subClassOf"] == [{"@id": "http://example.org/ns#Widget"}]


def test_blank_node_subclass_of_is_dropped_not_crashed_on(crate):
    gadget = _by_id(crate["@graph"], "http://example.org/ns#Gadget")
    # Only the named superclass should survive -- the anonymous
    # owl:Restriction superclass must not appear or raise.
    assert len(gadget["rdfs:subClassOf"]) == 1


def test_object_property_domain_and_range(crate):
    has_widget = _by_id(crate["@graph"], "http://example.org/ns#hasWidget")
    assert has_widget["@type"] == "rdf:Property"
    assert has_widget["domainIncludes"] == {"@id": "http://example.org/ns#Gadget"}
    assert has_widget["rangeIncludes"] == {"@id": "http://example.org/ns#Widget"}


def test_datatype_property_maps_xsd_string_to_schema_text(crate):
    widget_name = _by_id(crate["@graph"], "http://example.org/ns#widgetName")
    assert widget_name["domainIncludes"] == {"@id": "http://example.org/ns#Widget"}
    assert widget_name["rangeIncludes"] == {"@id": "schema:Text"}


def test_owl_union_of_domain_expands_to_multiple_domain_includes(crate):
    # RiC-O-derived case: rdfs:domain pointing at a blank node owl:unionOf
    # of named classes must expand into multiple domainIncludes values,
    # not be dropped like an unsupported blank node (e.g. owl:Restriction).
    described_by = _by_id(crate["@graph"], "http://example.org/ns#describedBy")
    domain_ids = {ref["@id"] for ref in described_by["domainIncludes"]}
    assert domain_ids == {"http://example.org/ns#Widget", "http://example.org/ns#Gadget"}


def test_range_outside_namespace_is_still_referenced_by_full_iri(crate):
    refers_to = _by_id(crate["@graph"], "http://example.org/ns#refersTo")
    assert refers_to["rangeIncludes"] == {"@id": "http://example.org/external#Thing"}


def test_plain_rdfs_class_is_converted_without_owl_class_typing(crate):
    # CLDF-derived case (scripts/owl-to-masp.spec.md, "Plain RDFS
    # vocabularies (no OWL typing)"): a class asserted only as rdfs:Class,
    # never owl:Class, must still be picked up.
    legacy_widget = _by_id(crate["@graph"], "http://example.org/ns#LegacyWidget")
    assert legacy_widget["@type"] == "rdfs:Class"
    assert legacy_widget["rdfs:label"] == "LegacyWidget"


def test_plain_rdf_property_is_converted_without_owl_property_typing(crate):
    legacy_name = _by_id(crate["@graph"], "http://example.org/ns#legacyName")
    assert legacy_name["@type"] == "rdf:Property"
    assert legacy_name["rdfs:label"] == "legacyName"
    assert legacy_name["domainIncludes"] == {"@id": "http://example.org/ns#LegacyWidget"}
    assert legacy_name["rangeIncludes"] == {"@id": "schema:Text"}


def test_resource_descriptor_lists_every_generated_entity_sorted(crate):
    descriptor = _by_id(crate["@graph"], "#hasSpecializedSchema")
    assert descriptor["@type"] == "ResourceDescriptor"
    part_ids = [part["@id"] for part in descriptor["hasPart"]]
    assert part_ids == sorted(part_ids)
    assert "http://example.org/ns#Widget" in part_ids
    assert "http://example.org/external#Thing" not in part_ids


def test_instances_of_a_converted_class_become_instance_entities(crate):
    red = _by_id(crate["@graph"], "http://example.org/ns#red")
    assert red == {
        "@id": "http://example.org/ns#red",
        "@type": "http://example.org/ns#Colour",
        "name": "red",
        "description": "The colour red.",
    }
    # owl:NamedIndividual is not a converted class, so it is not kept in @type
    blue = _by_id(crate["@graph"], "http://example.org/ns#blue")
    assert blue["@type"] == "http://example.org/ns#Colour"
    assert "description" not in blue


def test_instances_are_listed_in_an_item_list_per_class(crate):
    item_list = _by_id(crate["@graph"], "#itemlist_Colour")
    assert item_list["@type"] == "ItemList"
    assert item_list["name"] == "Colour values"
    assert item_list["itemListElement"] == [
        {"@id": "http://example.org/ns#blue"},
        {"@id": "http://example.org/ns#red"},
    ]


def test_range_pointing_at_a_class_with_instances_also_gets_the_item_list(crate):
    # the class stays so custom instances still validate; the list adds the standard values
    has_colour = _by_id(crate["@graph"], "http://example.org/ns#hasColour")
    assert has_colour["rangeIncludes"] == [
        {"@id": "http://example.org/ns#Colour"},
        {"@id": "#itemlist_Colour"},
    ]
    # ranges pointing at classes without instances are untouched
    has_widget = _by_id(crate["@graph"], "http://example.org/ns#hasWidget")
    assert has_widget["rangeIncludes"] == {"@id": "http://example.org/ns#Widget"}


def test_subject_typed_only_as_rdfs_resource_is_not_ported(crate):
    with pytest.raises(KeyError):
        _by_id(crate["@graph"], "http://example.org/ns#ignoredResource")


def test_item_lists_are_in_the_resource_descriptor(crate):
    descriptor = _by_id(crate["@graph"], "#hasSpecializedSchema")
    part_ids = [part["@id"] for part in descriptor["hasPart"]]
    assert "#itemlist_Colour" in part_ids
    assert "http://example.org/ns#red" not in part_ids


def test_root_dataset_points_at_resource_descriptor(crate):
    dataset = _by_id(crate["@graph"], "./")
    assert dataset["@type"] == "Dataset"
    assert dataset["hasResource"] == [{"@id": "#hasSpecializedSchema"}]


def test_conversion_is_idempotent_given_a_fixed_start_time(tmp_path):
    first_dir = tmp_path / "first"
    second_dir = tmp_path / "second"
    first_path = owl_to_masp.convert(
        str(FIXTURE), str(first_dir), namespace=NAMESPACE, name="Fixture Schema", start_time=FIXED_START_TIME
    )
    second_path = owl_to_masp.convert(
        str(FIXTURE), str(second_dir), namespace=NAMESPACE, name="Fixture Schema", start_time=FIXED_START_TIME
    )
    assert first_path.read_text(encoding="utf-8") == second_path.read_text(encoding="utf-8")


def test_default_start_time_is_a_real_iso_timestamp_when_not_overridden(tmp_path):
    output_dir = tmp_path / "fixture-schema"
    metadata_path = owl_to_masp.convert(str(FIXTURE), str(output_dir), namespace=NAMESPACE, name="Fixture Schema")
    graph = json.loads(metadata_path.read_text(encoding="utf-8"))["@graph"]
    create_action = _by_id(graph, owl_to_masp.CREATE_ACTION_ID)
    # Must parse as a real ISO 8601 timestamp -- not asserting an exact value,
    # since the CLI always uses the real current time (see spec: Idempotency vs. the timestamp).
    datetime.fromisoformat(create_action["startTime"])


def test_source_owl_file_is_copied_into_schema_crate(tmp_path, crate):
    output_dir = tmp_path / "fixture-schema"
    owl_to_masp.convert(
        str(FIXTURE), str(output_dir), namespace=NAMESPACE, name="Fixture Schema", start_time=FIXED_START_TIME
    )
    copied = output_dir / "schema-crate" / "fixture.ttl"
    assert copied.read_bytes() == FIXTURE.read_bytes()


def test_source_file_entity_is_present_and_referenced_from_has_part(crate):
    file_entity = _by_id(crate["@graph"], "fixture.ttl")
    assert file_entity["@type"] == "File"
    assert file_entity["encodingFormat"] == "text/turtle"

    dataset = _by_id(crate["@graph"], "./")
    assert dataset["hasPart"] == [{"@id": "fixture.ttl"}]


def test_create_action_links_file_instrument_and_result(crate):
    create_action = _by_id(crate["@graph"], owl_to_masp.CREATE_ACTION_ID)
    assert create_action["@type"] == "CreateAction"
    assert create_action["object"] == {"@id": "fixture.ttl"}
    assert create_action["instrument"] == {"@id": owl_to_masp.SCRIPT_URL}
    assert create_action["result"] == {"@id": "./"}
    assert create_action["startTime"] == FIXED_START_TIME

    script_entity = _by_id(crate["@graph"], owl_to_masp.SCRIPT_URL)
    assert script_entity["@type"] == "SoftwareApplication"

    dataset = _by_id(crate["@graph"], "./")
    assert dataset["mentions"] == [{"@id": owl_to_masp.CREATE_ACTION_ID}]


# Merging multiple --input sources into one schema crate (spec:
# "Merging multiple ontologies into one schema"). Every test above passes a
# bare string for input_sources/namespace (the pre-existing call style) --
# these prove that keeps working unchanged, alongside the new list form.


def test_multiple_inputs_are_merged_into_one_crate(tmp_path):
    output_dir = tmp_path / "merged-schema"
    metadata_path = owl_to_masp.convert(
        [str(FIXTURE), str(EXTRA_FIXTURE)],
        str(output_dir),
        namespace=[NAMESPACE, EXTRA_NAMESPACE],
        name="Merged Fixture Schema",
        start_time=FIXED_START_TIME,
    )
    crate = json.loads(metadata_path.read_text(encoding="utf-8"))

    widget = _by_id(crate["@graph"], "http://example.org/ns#Widget")
    sprocket = _by_id(crate["@graph"], "http://example.org/extra#Sprocket")
    assert widget["@type"] == "rdfs:Class"
    assert sprocket["@type"] == "rdfs:Class"
    assert sprocket["rdfs:comment"] == "A fixture class from a second, merged-in ontology."


def test_multiple_inputs_each_get_their_own_file_entity_and_are_all_copied(tmp_path):
    output_dir = tmp_path / "merged-schema"
    owl_to_masp.convert(
        [str(FIXTURE), str(EXTRA_FIXTURE)],
        str(output_dir),
        namespace=[NAMESPACE, EXTRA_NAMESPACE],
        name="Merged Fixture Schema",
        start_time=FIXED_START_TIME,
    )
    metadata_path = output_dir / "schema-crate" / "ro-crate-metadata.json"
    crate = json.loads(metadata_path.read_text(encoding="utf-8"))

    fixture_file = _by_id(crate["@graph"], "fixture.ttl")
    extra_file = _by_id(crate["@graph"], "fixture-extra.ttl")
    assert fixture_file["@type"] == "File"
    assert extra_file["@type"] == "File"

    dataset = _by_id(crate["@graph"], "./")
    assert {p["@id"] for p in dataset["hasPart"]} == {"fixture.ttl", "fixture-extra.ttl"}

    create_action = _by_id(crate["@graph"], owl_to_masp.CREATE_ACTION_ID)
    assert {o["@id"] for o in create_action["object"]} == {"fixture.ttl", "fixture-extra.ttl"}

    assert (output_dir / "schema-crate" / "fixture.ttl").read_bytes() == FIXTURE.read_bytes()
    assert (output_dir / "schema-crate" / "fixture-extra.ttl").read_bytes() == EXTRA_FIXTURE.read_bytes()


def test_no_namespace_given_with_multiple_inputs_converts_everything_unfiltered(tmp_path):
    # The common case for a merge (spec): omit --namespace entirely so every
    # source's classes/properties come through, including ones that a
    # single-source run would exclude as "outside the namespace" (ex:Thing,
    # normally excluded from the main fixture's own namespace-filtered runs).
    output_dir = tmp_path / "merged-schema-unfiltered"
    metadata_path = owl_to_masp.convert(
        [str(FIXTURE), str(EXTRA_FIXTURE)],
        str(output_dir),
        name="Merged Fixture Schema",
        start_time=FIXED_START_TIME,
    )
    crate = json.loads(metadata_path.read_text(encoding="utf-8"))
    ids = {e["@id"] for e in crate["@graph"]}
    assert "http://example.org/ns#Widget" in ids
    assert "http://example.org/extra#Sprocket" in ids
    assert "http://example.org/external#Thing" in ids
