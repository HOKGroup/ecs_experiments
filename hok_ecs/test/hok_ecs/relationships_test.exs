defmodule HokEcs.RelationshipsTest do
  use HokEcs.DataCase, async: true

  alias HokEcs.Relationships

  alias HokEcs.Relationships.{
    Relationship,
    RelationshipSourceEntity,
    RelationshipSourceComponent,
    RelationshipDestinationEntity,
    RelationshipDestinationComponent
  }

  import HokEcs.ECSFixtures

  describe "relationships" do
    @invalid_attrs %{
      relationship_name: 1234
    }

    test "list_relationships/0 returns all relationships" do
      relationship = relationship_fixture()
      assert Relationships.list_relationships() == [relationship]
    end

    test "get_relationship!/1 returns the relationship with given id" do
      relationship = relationship_fixture()
      assert Relationships.get_relationship!(relationship.relationship_guid) == relationship
    end

    test "create_relationship/1 with valid data creates a relationship" do
      valid_attrs = %{
        active: true,
        context: "some context",
        relationship_name: "some relationship_name",
        relationship_type: "some relationship_type",
        relationship_type_reference: "some relationship_type_reference",
        version: 42
      }

      assert {:ok, %Relationship{} = relationship} =
               Relationships.create_relationship(valid_attrs)

      assert relationship.active == true
      assert relationship.context == "some context"
      assert relationship.relationship_name == "some relationship_name"
      assert relationship.relationship_type == "some relationship_type"
      assert relationship.relationship_type_reference == "some relationship_type_reference"
      assert relationship.version == 42
    end

    test "create_relationship/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Relationships.create_relationship(@invalid_attrs)
    end

    test "update_relationship/2 with valid data updates the relationship" do
      relationship = relationship_fixture()

      update_attrs = %{
        active: false,
        context: "some updated context",
        relationship_name: "some updated relationship_name",
        relationship_type: "some updated relationship_type",
        relationship_type_reference: "some updated relationship_type_reference",
        version: 43
      }

      assert {:ok, %Relationship{} = relationship} =
               Relationships.update_relationship(relationship, update_attrs)

      assert relationship.active == false
      assert relationship.context == "some updated context"
      assert relationship.relationship_name == "some updated relationship_name"
      assert relationship.relationship_type == "some updated relationship_type"

      assert relationship.relationship_type_reference ==
               "some updated relationship_type_reference"

      assert relationship.version == 43
    end

    test "update_relationship/2 with invalid data returns error changeset" do
      relationship = relationship_fixture()

      assert {:error, %Ecto.Changeset{}} =
               Relationships.update_relationship(relationship, @invalid_attrs)

      assert relationship == Relationships.get_relationship!(relationship.relationship_guid)
    end

    test "delete_relationship/1 deletes the relationship" do
      relationship = relationship_fixture()
      assert {:ok, %Relationship{}} = Relationships.delete_relationship(relationship)

      assert_raise Ecto.NoResultsError, fn ->
        Relationships.get_relationship!(relationship.relationship_guid)
      end
    end

    test "change_relationship/1 returns a relationship changeset" do
      relationship = relationship_fixture()
      assert %Ecto.Changeset{} = Relationships.change_relationship(relationship)
    end

    test "create_relationship/5 creates a relationship between two entities" do
      source_entity = entity_fixture()
      destination_entity = entity_fixture()

      source_entity_guid = source_entity.entity_guid
      destination_entity_guid = destination_entity.entity_guid

      assert {:ok, %Relationship{} = relationship} =
               Relationships.create_relationship(
                 [source_entity.entity_guid],
                 nil,
                 [destination_entity.entity_guid],
                 nil
               )

      assert relationship.relationship_source_components == []
      assert relationship.relationship_destination_components == []

      relationship_guid = relationship.relationship_guid

      assert [
               %RelationshipSourceEntity{
                 relationship_guid: ^relationship_guid,
                 entity_guid: ^source_entity_guid
               }
             ] = relationship.relationship_source_entities

      assert [
               %RelationshipDestinationEntity{
                 relationship_guid: ^relationship_guid,
                 entity_guid: ^destination_entity_guid
               }
             ] = relationship.relationship_destination_entities
    end

    test "create_relationship/5 adds multiple components to the relationship" do
      entity_1 = entity_fixture()
      entity_2 = entity_fixture()

      source_component_1 = component_fixture(entity_1)
      source_component_1_guid = source_component_1.component_guid

      source_component_2 = component_fixture(entity_2)
      source_component_2_guid = source_component_2.component_guid

      assert {:ok, %Relationship{} = relationship} =
               Relationships.create_relationship(
                 nil,
                 [source_component_1_guid, source_component_2_guid],
                 nil,
                 nil
               )

      relationship_guid = relationship.relationship_guid
      relationship_source_components = relationship.relationship_source_components

      assert [
               %RelationshipSourceComponent{
                 relationship_guid: ^relationship_guid,
                 component_guid: ^source_component_1_guid
               },
               %RelationshipSourceComponent{
                 relationship_guid: ^relationship_guid,
                 component_guid: ^source_component_2_guid
               }
             ] = relationship_source_components
    end

    test "create_relationship/5 returns error changeset with invalid source entity id" do
      source_entity_1 = entity_fixture()
      source_entity_1_guid = source_entity_1.entity_guid

      source_entity_2_guid = Ecto.UUID.generate()

      assert {:error, %Ecto.Changeset{} = changeset} =
               Relationships.create_relationship(
                 [source_entity_1_guid, source_entity_2_guid],
                 nil,
                 nil,
                 nil
               )

      assert %{
               changes: %{
                 entity_guid: ^source_entity_2_guid
               },
               errors: [
                 entity_guid: {"does not exist", _}
               ]
             } = changeset

      assert [] = Relationships.list_relationships()
    end

    test "create_relationship/5 returns error changeset with invalid destination component id" do
      destination_component_guid = Ecto.UUID.generate()

      assert {:error, %Ecto.Changeset{} = changeset} =
               Relationships.create_relationship(
                 nil,
                 nil,
                 nil,
                 [destination_component_guid]
               )

      assert %{
               changes: %{
                 component_guid: ^destination_component_guid
               },
               errors: [
                 component_guid: {"does not exist", _}
               ]
             } = changeset

      assert [] = Relationships.list_relationships()
    end

    test "add_links_to_relationship/5 adds entities and components to an existing relationship" do
      relationship = relationship_fixture()
      relationship_guid = relationship.relationship_guid

      source_entity = entity_fixture()
      source_entity_guid = source_entity.entity_guid

      source_component = component_fixture(source_entity)
      source_component_guid = source_component.component_guid

      destination_entity = entity_fixture()
      destination_entity_guid = destination_entity.entity_guid

      destination_component = component_fixture(destination_entity)
      destination_component_guid = destination_component.component_guid

      assert {:ok, %Relationship{} = relationship} =
               Relationships.add_links_to_relationship(
                 relationship,
                 [source_entity_guid],
                 [source_component_guid],
                 [destination_entity_guid],
                 [destination_component_guid]
               )

      assert %Relationship{
               relationship_guid: ^relationship_guid,
               relationship_source_entities: [
                 %RelationshipSourceEntity{
                   relationship_guid: ^relationship_guid,
                   entity_guid: ^source_entity_guid
                 }
               ],
               relationship_source_components: [
                 %RelationshipSourceComponent{
                   relationship_guid: ^relationship_guid,
                   component_guid: ^source_component_guid
                 }
               ],
               relationship_destination_entities: [
                 %RelationshipDestinationEntity{
                   relationship_guid: ^relationship_guid,
                   entity_guid: ^destination_entity_guid
                 }
               ],
               relationship_destination_components: [
                 %RelationshipDestinationComponent{
                   relationship_guid: ^relationship_guid,
                   component_guid: ^destination_component_guid
                 }
               ]
             } = relationship
    end
  end
end
