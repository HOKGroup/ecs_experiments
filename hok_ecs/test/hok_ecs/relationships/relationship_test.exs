defmodule HokEcs.RelationshipsTest.RelationshipTest do
  use HokEcs.DataCase, async: true

  import HokEcs.ECSFixtures

  alias HokEcs.Relationships.Relationship

  describe "relationship schema" do
    test "includes associated source/destination entity/component joins" do
      entity_1 = entity_fixture()
      entity_2 = entity_fixture()

      component_1 = component_fixture(entity_1)
      component_2 = component_fixture(entity_2)

      relationship = relationship_fixture()

      source_entity =
        relationship_source_entity_fixture(%{
          relationship_guid: relationship.relationship_guid,
          entity_guid: entity_1.entity_guid
        })

      source_component =
        relationship_source_component_fixture(%{
          relationship_guid: relationship.relationship_guid,
          component_guid: component_1.component_guid
        })

      destination_entity =
        relationship_destination_entity_fixture(%{
          relationship_guid: relationship.relationship_guid,
          entity_guid: entity_2.entity_guid
        })

      destination_component =
        relationship_destination_component_fixture(%{
          relationship_guid: relationship.relationship_guid,
          component_guid: component_2.component_guid
        })

      relationship_with_assocs =
        relationship
        |> Repo.preload([
          :relationship_source_entities,
          :relationship_source_components,
          :relationship_destination_entities,
          :relationship_destination_components
        ])

      relationship_guid = relationship.relationship_guid

      assert %Relationship{
               relationship_guid: ^relationship_guid,
               relationship_source_entities: [^source_entity],
               relationship_source_components: [^source_component],
               relationship_destination_entities: [^destination_entity],
               relationship_destination_components: [^destination_component]
             } = relationship_with_assocs
    end
  end
end
