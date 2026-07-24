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
NAMESPACE = "http://example.org/ns#"
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


def test_resource_descriptor_lists_every_generated_entity_sorted(crate):
    descriptor = _by_id(crate["@graph"], "#hasSpecializedSchema")
    assert descriptor["@type"] == "ResourceDescriptor"
    part_ids = [part["@id"] for part in descriptor["hasPart"]]
    assert part_ids == sorted(part_ids)
    assert "http://example.org/ns#Widget" in part_ids
    assert "http://example.org/external#Thing" not in part_ids


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
