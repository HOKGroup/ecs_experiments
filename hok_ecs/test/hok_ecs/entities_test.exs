defmodule HokEcs.EntitiesTest do
  use HokEcs.DataCase, async: true

  import HokEcs.ECSFixtures

  alias HokEcs.Entities
  alias HokEcs.Entities.Entity
  alias HokEcs.Events
  alias HokEcs.Events.Event

  describe "entities" do
    @invalid_attrs %{classification_reference: 1234}

    test "list_entities/0 returns all entities" do
      entity = entity_fixture()
      assert Entities.list_entities() == [entity]
    end

    test "get_entity!/1 returns the entity with given id" do
      entity = entity_fixture()
      assert Entities.get_entity!(entity.entity_guid) == entity
    end

    test "create_entity/1 with valid data creates an entity and entity_created event" do
      valid_attrs = %{
        classification_reference: "some classification_reference",
        classification: "some classification",
        context: "some context"
      }

      assert {:ok, %Entity{} = entity} = Entities.create_entity(valid_attrs)
      assert entity.classification_reference == "some classification_reference"
      assert entity.classification == "some classification"
      assert entity.context == "some context"

      event = Repo.get_by(Event, entity_guid: entity.entity_guid)

      assert %{
               type: "entity_created",
               data: %{
                 "classification_reference" => "some classification_reference",
                 "classification" => "some classification",
                 "context" => "some context"
               }
             } = event
    end

    test "create_entity/1 with invalid data returns error changeset and does not create an event" do
      assert {:error, %Ecto.Changeset{} = changeset} = Entities.create_entity(@invalid_attrs)

      assert %{
               errors: [
                 classification_reference: {"is invalid", [type: :string, validation: :cast]}
               ]
             } = changeset

      assert [] = Events.list_events()
    end

    test "update_entity/2 with valid data updates the entity and creates an entity_updated event" do
      entity = entity_fixture()

      update_attrs = %{
        classification_reference: "some updated classification_reference",
        classification: "some updated classification",
        context: "some updated context"
      }

      assert {:ok, %Entity{} = entity} = Entities.update_entity(entity, update_attrs)
      assert entity.classification_reference == "some updated classification_reference"
      assert entity.classification == "some updated classification"
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
