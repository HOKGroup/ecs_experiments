defmodule HokEcs.LayersTest do
  use HokEcs.DataCase, async: true

  alias HokEcs.Layers
  alias HokEcs.Layers.{LayerEntity, LayerComponent, LayerRelationship}

  describe "layer" do
    alias HokEcs.Layers.Layer

    import HokEcs.ECSFixtures
    import HokEcs.LayersFixtures

    @invalid_attrs %{context: 1234}

    test "list_layers/0 returns all layers" do
      layer = layer_fixture()
      assert Layers.list_layers() == [layer]
    end

    test "get_layer!/1 returns the layer with given id" do
      layer = layer_fixture()
      assert Layers.get_layer!(layer.layer_guid) == layer
    end

    test "create_layer/1 with valid data creates a layer" do
      valid_attrs = %{
        active: true,
        context: "some context",
        layer_description: "some layer_description",
        layer_function: "some layer_function",
        layer_id: "some layer_id",
        layer_name: "some layer_name",
        layer_owner: "some layer_owner",
        layer_update_method: "some layer_update_method",
        version: 42
      }

      assert {:ok, %Layer{} = layer} = Layers.create_layer(valid_attrs)
      assert layer.active == true
      assert layer.context == "some context"
      assert layer.layer_description == "some layer_description"
      assert layer.layer_function == "some layer_function"
      assert layer.layer_id == "some layer_id"
      assert layer.layer_name == "some layer_name"
      assert layer.layer_owner == "some layer_owner"
      assert layer.layer_update_method == "some layer_update_method"
      assert layer.version == 42
    end

    test "create_layer/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Layers.create_layer(@invalid_attrs)
    end

    test "update_layer/2 with valid data updates the layer" do
      layer = layer_fixture()

      update_attrs = %{
        active: false,
        context: "some updated context",
        layer_description: "some updated layer_description",
        layer_function: "some updated layer_function",
        layer_id: "some updated layer_id",
        layer_name: "some updated layer_name",
        layer_owner: "some updated layer_owner",
        layer_update_method: "some updated layer_update_method",
        version: 43
      }

      assert {:ok, %Layer{} = layer} = Layers.update_layer(layer, update_attrs)
      assert layer.active == false
      assert layer.context == "some updated context"
      assert layer.layer_description == "some updated layer_description"
      assert layer.layer_function == "some updated layer_function"
      assert layer.layer_id == "some updated layer_id"
      assert layer.layer_name == "some updated layer_name"
      assert layer.layer_owner == "some updated layer_owner"
      assert layer.layer_update_method == "some updated layer_update_method"
      assert layer.version == 43
    end

    test "update_layer/2 with invalid data returns error changeset" do
      layer = layer_fixture()
      assert {:error, %Ecto.Changeset{}} = Layers.update_layer(layer, @invalid_attrs)
      assert layer == Layers.get_layer!(layer.layer_guid)
    end

    test "delete_layer/1 deletes the layer" do
      layer = layer_fixture()
      assert {:ok, %Layer{}} = Layers.delete_layer(layer)
      assert_raise Ecto.NoResultsError, fn -> Layers.get_layer!(layer.layer_guid) end
    end

    test "change_layer/1 returns a layer changeset" do
      layer = layer_fixture()
      assert %Ecto.Changeset{} = Layers.change_layer(layer)
    end

    test "add_entity_to_layer/2 adds an entity to a layer" do
      layer = layer_fixture()
      entity = entity_fixture()

      assert {:ok, %LayerEntity{} = layer_entity} =
               Layers.add_entity_to_layer(entity.entity_guid, layer)

      assert layer_entity.layer_guid == layer.layer_guid
      assert layer_entity.entity_guid == entity.entity_guid
    end

    test "add_entity_to_layer/2 returns an error changeset when adding an entity already associated with a layer" do
      layer = layer_fixture()
      layer_guid = layer.layer_guid

      entity = entity_fixture()
      entity_guid = entity.entity_guid

      {:ok, %LayerEntity{}} = Layers.add_entity_to_layer(entity_guid, layer)

      assert {:error, %Ecto.Changeset{} = changeset} =
               Layers.add_entity_to_layer(entity_guid, layer)

      assert %{
               changes: %{
                 entity_guid: ^entity_guid,
                 layer_guid: ^layer_guid
               },
               errors: [
                 layer_guid: {"has already been taken", _}
               ]
             } = changeset
    end

    test "add_component_to_layer/2 adds a component to a layer" do
      layer = layer_fixture()
      entity = entity_fixture()
      component = component_fixture(entity)

      assert {:ok, %LayerComponent{} = layer_component} =
               Layers.add_component_to_layer(component.component_guid, layer)

      assert layer_component.layer_guid == layer.layer_guid
      assert layer_component.component_guid == component.component_guid
    end

    test "add_relationship_to_layer/2 adds a relationship to a layer" do
      layer = layer_fixture()
      relationship = relationship_fixture()

      assert {:ok, %LayerRelationship{} = layer_relationship} =
               Layers.add_relationship_to_layer(relationship.relationship_guid, layer)

      assert layer_relationship.layer_guid == layer.layer_guid
      assert layer_relationship.relationship_guid == relationship.relationship_guid
    end

    test "get_layer_data/1 gets components (with schema), entities, and relationships for a layer" do
      layer = layer_fixture()
      entity = entity_fixture()
      component_schema = component_schema_fixture()

      component =
        component_fixture(entity, %{
          component_schema_guid: component_schema.component_schema_guid
        })

      relationship = relationship_fixture()

      {:ok, %LayerEntity{}} = Layers.add_entity_to_layer(entity.entity_guid, layer)
      {:ok, %LayerComponent{}} = Layers.add_component_to_layer(component.component_guid, layer)

      {:ok, %LayerRelationship{}} =
        Layers.add_relationship_to_layer(relationship.relationship_guid, layer)

      layer_data = Layers.get_layer_data(layer)

      layer_guid = layer.layer_guid

      component = Repo.preload(component, :component_schema)

      assert %Layer{
               layer_guid: ^layer_guid,
               entities: [^entity],
               components: [^component],
               relationships: [^relationship]
             } = layer_data
    end

    test "get_layer_data/1 gets components (with schema), entities, and relationships for a layer by layer guid" do
      layer = layer_fixture()
      entity = entity_fixture()
      component_schema = component_schema_fixture()

      component =
        component_fixture(entity, %{
          component_schema_guid: component_schema.component_schema_guid
        })

      relationship = relationship_fixture()

      {:ok, %LayerEntity{}} = Layers.add_entity_to_layer(entity.entity_guid, layer)
      {:ok, %LayerComponent{}} = Layers.add_component_to_layer(component.component_guid, layer)

      {:ok, %LayerRelationship{}} =
        Layers.add_relationship_to_layer(relationship.relationship_guid, layer)

      layer_guid = layer.layer_guid
      layer_data = Layers.get_layer_data(layer_guid)

      component = Repo.preload(component, :component_schema)

      assert %Layer{
               layer_guid: ^layer_guid,
               entities: [^entity],
               components: [^component],
               relationships: [^relationship]
             } = layer_data
    end
  end
end
