defmodule HokEcs.ComponentsTest do
  use HokEcs.DataCase, async: true

  describe "components" do
    alias HokEcs.Components
    alias HokEcs.Components.Component
    alias HokEcs.Events
    alias HokEcs.Events.Event

    import HokEcs.ECSFixtures

    @invalid_attrs %{
      context: nil
    }

    test "list_components/0 returns all components" do
      entity = entity_fixture()
      component = component_fixture(entity)
      assert Components.list_components() == [component]
    end

    test "get_component!/1 returns the component with given id" do
      entity = entity_fixture()
      component = component_fixture(entity)
      assert Components.get_component!(component.component_guid) == component
    end

    test "create_component/1 with valid data creates a component and component_created event" do
      entity = entity_fixture()
      component_schema = component_schema_fixture()

      valid_attrs = %{
        entity_guid: entity.entity_guid,
        active: true,
        authoring_application: "some authoring_application",
        component_id: "some component_id",
        component_name: "some component_name",
        component_type_payload: "some component_type_payload",
        component_type: component_schema.name,
        component_type_reference: "some component_type_reference",
        context: "some context",
        context_id: "some context id",
        entity_classification: "some entity_classification",
        hash1: "some hash1",
        owner: "some owner",
        payload: %{},
        status: "some status",
        version: "42",
        creation_date: DateTime.utc_now() |> to_string()
      }

      assert {:ok, %Component{} = component} = Components.create_component(valid_attrs)
      assert component.active == true
      assert component.authoring_application == "some authoring_application"
      assert component.component_id == "some component_id"
      assert component.component_name == "some component_name"
      assert component.component_type_payload == "some component_type_payload"
      assert component.component_type == component_schema.name
      assert component.component_type_reference == "some component_type_reference"
      assert component.context == "some context"
      assert component.entity_classification == "some entity_classification"
      assert component.hash1 == "some hash1"
      assert component.owner == "some owner"
      assert component.payload == %{}
      assert component.status == "some status"
      assert component.version == "42"

      event = Repo.get_by(Event, component_guid: component.component_guid)

      event_data =
        valid_attrs |> Enum.map(fn {key, value} -> {to_string(key), value} end) |> Enum.into(%{})

      assert %{
               type: "component_created",
               data: ^event_data
             } = event
    end

    test "create_component/2 with valid payload creates the component and component_created event" do
      entity = entity_fixture()
      component_schema = component_schema_fixture()

      attrs = %{
        entity_guid: entity.entity_guid,
        context: "some context",
        context_id: "some context id",
        component_type: component_schema.name,
        component_type_reference: "some component type reference",
        component_type_payload: "json",
        payload: %{"FirstName" => "Bob"},
        owner: "some owner",
        version: "some version",
        creation_date: DateTime.utc_now() |> to_string()
      }

      assert {:ok, %Component{} = component} = Components.create_component(attrs)
      assert component.entity_guid == entity.entity_guid
      assert component.component_schema_guid == component_schema.component_schema_guid

      assert component.payload == %{
               "FirstName" => "Bob"
             }

      event_data = attrs |> Enum.map(fn {key, val} -> {to_string(key), val} end) |> Enum.into(%{})
      event = Repo.get_by(Event, component_guid: component.component_guid)

      assert %{
               type: "component_created",
               data: ^event_data
             } = event
    end

    test "create_component/2 with invalid payload returns error changeset and does not create an event" do
      entity = entity_fixture()
      component_schema = component_schema_fixture()

      attrs = %{
        entity_guid: entity.entity_guid,
        component_type: component_schema.name,
        payload: %{"FirstName" => 1234}
      }

      assert {:error, %Ecto.Changeset{} = changeset} = Components.create_component(attrs)

      assert %{
               payload: ["Type mismatch. Expected String but got Integer. Path: #/FirstName"]
             } = errors_on(changeset)

      assert [] = Events.list_events()
    end

    test "create_component/1 with invalid entity returns an error and does not create an event" do
      assert {:error, "Entity not found"} =
               Components.create_component(%{
                 entity_guid: Ecto.UUID.generate(),
                 component_type: "some_type"
               })

      assert [] = Events.list_events()
    end

    test "create_component/1 with valid entity but invalid component attrs returns an error changeset and does not create an event" do
      entity = entity_fixture()

      component_schema = component_schema_fixture()

      attrs =
        @invalid_attrs
        |> Map.put_new(:entity_guid, entity.entity_guid)
        |> Map.put_new(:component_type, component_schema.name)

      assert {:error, %Ecto.Changeset{}} = Components.create_component(attrs)
      assert [] = Events.list_events()
    end

    test "update_component/2 with valid data updates the component and creates a component_updated event" do
      entity = entity_fixture()
      component = component_fixture(entity)

      update_attrs = %{
        active: false,
        authoring_application: "some updated authoring_application",
        component_id: "some updated component_id",
        component_name: "some updated component_name",
        component_type_payload: "some updated component_type_payload",
        component_type_reference: "some updated component_type_reference",
        context: "some updated context",
        entity_classification: "some updated entity_classification",
        hash1: "some updated hash1",
        owner: "some updated owner",
        payload: %{},
        status: "some updated status",
        version: "43"
      }

      assert {:ok, %Component{} = component} =
               Components.update_component(component, update_attrs)

      assert component.active == false
      assert component.authoring_application == "some updated authoring_application"
      assert component.component_id == "some updated component_id"
      assert component.component_name == "some updated component_name"
      assert component.component_type_payload == "some updated component_type_payload"
      assert component.component_type_reference == "some updated component_type_reference"
      assert component.context == "some updated context"
      assert component.entity_classification == "some updated entity_classification"
      assert component.hash1 == "some updated hash1"
      assert component.owner == "some updated owner"
      assert component.payload == %{}
      assert component.status == "some updated status"
      assert component.version == "43"

      event = Repo.get_by(Event, component_guid: component.component_guid)

      event_data =
        update_attrs |> Enum.map(fn {key, value} -> {to_string(key), value} end) |> Enum.into(%{})

      assert %{
               type: "component_updated",
               data: ^event_data
             } = event
    end

    test "update_component/2 with invalid payload returns error changeset and does not create an event" do
      entity = entity_fixture()
      component_schema = component_schema_fixture()

      component =
        component_fixture(entity, %{
          component_schema_guid: component_schema.component_schema_guid,
          payload: %{"FirstName" => "Bob"}
        })

      assert {:error, %Ecto.Changeset{} = changeset} =
               Components.update_component(component, %{payload: %{"FirstName" => 1234}})

      assert %{
               payload: ["Type mismatch. Expected String but got Integer. Path: #/FirstName"]
             } = errors_on(changeset)

      assert [] = Events.list_events()
    end

    test "update_component/2 with valid payload updates the component and creates a component_updated event" do
      entity = entity_fixture()
      component_schema = component_schema_fixture()

      component =
        component_fixture(entity, %{
          component_schema_guid: component_schema.component_schema_guid,
          payload: %{"FirstName" => "Bob"}
        })

      assert {:ok, %Component{} = component} =
               Components.update_component(component, %{payload: %{"FirstName" => "Alice"}})

      assert %{"FirstName" => "Alice"} == component.payload

      event = Repo.get_by(Event, component_guid: component.component_guid)

      assert %{
               type: "component_updated",
               data: %{
                 "payload" => %{
                   "FirstName" => "Alice"
                 }
               }
             } = event
    end

    test "update_component/2 with invalid data returns error changeset and does not create an event" do
      entity = entity_fixture()
      component = component_fixture(entity)
      assert {:error, %Ecto.Changeset{}} = Components.update_component(component, @invalid_attrs)
      assert component == Components.get_component!(component.component_guid)

      assert [] = Events.list_events()
    end

    test "change_component/1 returns a component changeset" do
      entity = entity_fixture()
      component = component_fixture(entity)
      assert %Ecto.Changeset{} = Components.change_component(component)
    end
  end

  describe "component_schemas" do
    alias HokEcs.Components
    alias HokEcs.Components.ComponentSchema

    import HokEcs.ECSFixtures

    @invalid_attrs %{name: nil, schema: nil}

    test "list_component_schemas/0 returns all component_schemas" do
      component_schema = component_schema_fixture()
      assert Components.list_component_schemas() == [component_schema]
    end

    test "get_component_schema!/1 returns the component_schema with given id" do
      component_schema = component_schema_fixture()

      assert Components.get_component_schema!(component_schema.component_schema_guid) ==
               component_schema
    end

    test "create_component_schema/1 with valid data creates a component_schema" do
      valid_attrs = %{name: "some name", schema: %{}}

      assert {:ok, %ComponentSchema{} = component_schema} =
               Components.create_component_schema(valid_attrs)

      assert component_schema.name == "some name"
      assert component_schema.schema == %{}
    end

    test "create_component_schema/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Components.create_component_schema(@invalid_attrs)
    end

    test "update_component_schema/2 with valid data updates the component_schema" do
      component_schema = component_schema_fixture()
      update_attrs = %{name: "some updated name", schema: %{}}

      assert {:ok, %ComponentSchema{} = component_schema} =
               Components.update_component_schema(component_schema, update_attrs)

      assert component_schema.name == "some updated name"
      assert component_schema.schema == %{}
    end

    test "update_component_schema/2 with invalid data returns error changeset" do
      component_schema = component_schema_fixture()

      assert {:error, %Ecto.Changeset{}} =
               Components.update_component_schema(component_schema, @invalid_attrs)

      assert component_schema ==
               Components.get_component_schema!(component_schema.component_schema_guid)
    end

    test "delete_component_schema/1 deletes the component_schema" do
      component_schema = component_schema_fixture()
      assert {:ok, %ComponentSchema{}} = Components.delete_component_schema(component_schema)

      assert_raise Ecto.NoResultsError, fn ->
        Components.get_component_schema!(component_schema.component_schema_guid)
      end
    end

    test "change_component_schema/1 returns a component_schema changeset" do
      component_schema = component_schema_fixture()
      assert %Ecto.Changeset{} = Components.change_component_schema(component_schema)
    end
  end
end
