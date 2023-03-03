defmodule HokEcs.EntitiesTest do
  use HokEcs.DataCase, async: true

  import HokEcs.ECSFixtures

  alias HokEcs.Entities
  alias HokEcs.Entities.Entity
  alias HokEcs.Events
  alias HokEcs.Events.Event

  describe "entities" do
    @invalid_attrs %{entity_classification_reference: 1234}

    test "list_entities/1 with no args returns all entities" do
      entity = entity_fixture()
      assert Entities.list_entities() == [entity]
    end

    test "list_entities/1 with classification returns all entities with the given classification" do
      matching_entity_1 = entity_fixture(%{entity_classification: "my classification"})
      matching_entity_1_guid = matching_entity_1.entity_guid

      matching_entity_2 = entity_fixture(%{entity_classification: "my classification"})
      matching_entity_2_guid = matching_entity_2.entity_guid

      _other_entity_1 = entity_fixture()
      _other_entity_2 = entity_fixture()

      result = Entities.list_entities(%{entity_classification: "my classification"})

      assert [
               %Entity{
                 entity_guid: ^matching_entity_1_guid
               },
               %Entity{
                 entity_guid: ^matching_entity_2_guid
               }
             ] = result
    end

    test "list_entities/1 with classification returns an empty list if no entities match the given classification" do
      entity_fixture(%{entity_classification: "one"})
      entity_fixture(%{entity_classification: "two"})
      entity_fixture(%{entity_classification: "three"})

      assert [] == Entities.list_entities(%{entity_classification: "four"})
    end

    test "get_entity!/1 returns the entity with given id" do
      entity = entity_fixture()
      assert Entities.get_entity!(entity.entity_guid) == entity
    end

    test "create_entity/1 with valid data creates an entity and entity_created event" do
      valid_attrs = %{
        entity_classification_reference: "some classification_reference",
        entity_classification: "some classification",
        context: "some context",
        context_id: "some context id",
        creation_date: DateTime.utc_now() |> to_string()
      }

      assert {:ok, %Entity{} = entity} = Entities.create_entity(valid_attrs)
      assert entity.entity_classification_reference == "some classification_reference"
      assert entity.entity_classification == "some classification"
      assert entity.context == "some context"

      event = Repo.get_by(Event, entity_guid: entity.entity_guid)

      assert %{
               type: "entity_created",
               data: %{
                 "entity_classification_reference" => "some classification_reference",
                 "entity_classification" => "some classification",
                 "context" => "some context"
               }
             } = event
    end

    test "create_entity/1 with invalid data returns error changeset and does not create an event" do
      assert {:error, %Ecto.Changeset{} = changeset} = Entities.create_entity(@invalid_attrs)

      assert %{
               errors: [
                 entity_classification: {"can't be blank", [validation: :required]},
                 context: {"can't be blank", [validation: :required]},
                 context_id: {"can't be blank", [validation: :required]},
                 creation_date: {"can't be blank", [validation: :required]},
                 entity_classification_reference:
                   {"is invalid", [type: :string, validation: :cast]}
               ]
             } = changeset

      assert [] = Events.list_events()
    end

    test "update_entity/2 with valid data updates the entity and creates an entity_updated event" do
      entity = entity_fixture()

      update_attrs = %{
        entity_classification_reference: "some updated classification_reference",
        entity_classification: "some updated classification",
        context: "some updated context"
      }

      assert {:ok, %Entity{} = entity} = Entities.update_entity(entity, update_attrs)
      assert entity.entity_classification_reference == "some updated classification_reference"
      assert entity.entity_classification == "some updated classification"
      assert entity.context == "some updated context"

      event = Repo.get_by(Event, entity_guid: entity.entity_guid, type: "entity_updated")

      event_data =
        update_attrs |> Enum.map(fn {key, value} -> {to_string(key), value} end) |> Enum.into(%{})

      assert %{
               type: "entity_updated",
               data: ^event_data
             } = event
    end

    test "update_entity/2 with invalid data returns error changeset and does not create an event" do
      entity = entity_fixture()
      assert {:error, %Ecto.Changeset{}} = Entities.update_entity(entity, @invalid_attrs)
      assert entity == Entities.get_entity!(entity.entity_guid)

      assert [] = Events.list_events()
    end

    test "change_entity/1 returns a entity changeset" do
      entity = entity_fixture()
      assert %Ecto.Changeset{} = Entities.change_entity(entity)
    end
  end
end
