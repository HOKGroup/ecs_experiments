defmodule HokEcs.EventsTest do
  use HokEcs.DataCase, async: true

  alias HokEcs.Events
  alias Events.Event

  import HokEcs.ECSFixtures

  describe "events" do
    test "list_events/0 returns all events" do
      entity = entity_fixture()
      event = event_fixture(%{entity_guid: entity.entity_guid})
      assert Events.list_events() == [event]
    end

    test "get_event!/1 returns the event with given id" do
      entity = entity_fixture()
      event = event_fixture(%{entity_guid: entity.entity_guid})
      assert Events.get_event!(event.id) == event
    end

    test "create_entity_created_event/1 creates an event" do
      entity = entity_fixture()

      valid_attrs = %{classification: "Person"}

      assert {:ok, %Event{} = event} = Events.create_entity_created_event(entity, valid_attrs)
      assert event.data == %{classification: "Person"}
      assert event.type == "entity_created"
      assert event.entity_guid == entity.entity_guid
    end

    test "create_component_created_event/1 creates an event" do
      entity = entity_fixture()
      component = component_fixture(entity)

      valid_attrs = %{context: "my_context"}

      assert {:ok, %Event{} = event} =
               Events.create_component_created_event(component, valid_attrs)

      assert event.data == %{context: "my_context"}
      assert event.type == "component_created"
      assert event.component_guid == component.component_guid
    end

    test "create_entity_updated_event/1 creates an event" do
      entity = entity_fixture()

      valid_attrs = %{classification: "Person"}

      assert {:ok, %Event{} = event} = Events.create_entity_updated_event(entity, valid_attrs)
      assert event.data == %{classification: "Person"}
      assert event.type == "entity_updated"
      assert event.entity_guid == entity.entity_guid
    end

    test "create_component_updated_event/1 creates an event" do
      entity = entity_fixture()
      component = component_fixture(entity)

      valid_attrs = %{context: "my_context"}

      assert {:ok, %Event{} = event} =
               Events.create_component_updated_event(component, valid_attrs)

      assert event.data == %{context: "my_context"}
      assert event.type == "component_updated"
      assert event.component_guid == component.component_guid
    end
  end
end
