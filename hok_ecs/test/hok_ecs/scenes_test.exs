defmodule HokEcs.ScenesTest do
  use HokEcs.DataCase, async: true

  alias HokEcs.Scenes
  alias HokEcs.Scenes.{Scene, SceneLayer}
  alias HokEcs.Layers
  alias HokEcs.Layers.Layer
  alias HokEcs.Relationships.Relationship
  alias HokEcs.Entities.Entity
  alias HokEcs.Components.{Component, ComponentSchema}

  import HokEcs.ScenesFixtures
  import HokEcs.LayersFixtures
  import HokEcs.ECSFixtures

  describe "scenes" do
    @invalid_attrs %{
      context: 1234
    }

    test "list_scenes/0 returns all scenes" do
      scene = scene_fixture()
      assert Scenes.list_scenes() == [scene]
    end

    test "get_scene!/1 returns the scene with given id" do
      scene = scene_fixture()
      assert Scenes.get_scene!(scene.scene_guid) == scene
    end

    test "create_scene/1 with valid data creates a scene" do
      valid_attrs = %{
        active: true,
        context: "some context",
        date_created: "some date_created",
        scene_id: "some scene_id",
        scene_name: "some scene_name",
        version: 42
      }

      assert {:ok, %Scene{} = scene} = Scenes.create_scene(valid_attrs)
      assert scene.active == true
      assert scene.context == "some context"
      assert scene.date_created == "some date_created"
      assert scene.scene_id == "some scene_id"
      assert scene.scene_name == "some scene_name"
      assert scene.version == 42
    end

    test "create_scene/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Scenes.create_scene(@invalid_attrs)
    end

    test "update_scene/2 with valid data updates the scene" do
      scene = scene_fixture()

      update_attrs = %{
        active: false,
        context: "some updated context",
        date_created: "some updated date_created",
        scene_id: "some updated scene_id",
        scene_name: "some updated scene_name",
        version: 43
      }

      assert {:ok, %Scene{} = scene} = Scenes.update_scene(scene, update_attrs)
      assert scene.active == false
      assert scene.context == "some updated context"
      assert scene.date_created == "some updated date_created"
      assert scene.scene_id == "some updated scene_id"
      assert scene.scene_name == "some updated scene_name"
      assert scene.version == 43
    end

    test "update_scene/2 with invalid data returns error changeset" do
      scene = scene_fixture()
      assert {:error, %Ecto.Changeset{}} = Scenes.update_scene(scene, @invalid_attrs)
      assert scene == Scenes.get_scene!(scene.scene_guid)
    end

    test "delete_scene/1 deletes the scene" do
      scene = scene_fixture()
      assert {:ok, %Scene{}} = Scenes.delete_scene(scene)
      assert_raise Ecto.NoResultsError, fn -> Scenes.get_scene!(scene.scene_guid) end
    end

    test "change_scene/1 returns a scene changeset" do
      scene = scene_fixture()
      assert %Ecto.Changeset{} = Scenes.change_scene(scene)
    end

    test "add_layer_to_scene/2 adds a layer by guid to an existing scene" do
      scene = scene_fixture()
      layer = layer_fixture()

      assert {:ok, %SceneLayer{} = scene_layer} =
               Scenes.add_layer_to_scene(layer.layer_guid, scene)

      assert scene_layer.scene_guid == scene.scene_guid
      assert scene_layer.layer_guid == layer.layer_guid
    end

    test "get_scene_data/1 gets all entities, relationships, and components for a scene" do
      scene = scene_fixture()
      scene_guid = scene.scene_guid

      layer = layer_fixture()
      layer_guid = layer.layer_guid

      entity = entity_fixture()
      entity_guid = entity.entity_guid

      component_schema = component_schema_fixture()
      component_schema_guid = component_schema.component_schema_guid

      component = component_fixture(entity, %{component_schema_guid: component_schema_guid})
      component_guid = component.component_guid

      relationship = relationship_fixture()
      relationship_guid = relationship.relationship_guid

      {:ok, _} = Scenes.add_layer_to_scene(layer_guid, scene)
      {:ok, _} = Layers.add_entity_to_layer(entity_guid, layer)
      {:ok, _} = Layers.add_component_to_layer(component_guid, layer)
      {:ok, _} = Layers.add_relationship_to_layer(relationship_guid, layer)

      scene = Scenes.get_scene_data(scene)

      assert %Scene{
               scene_guid: ^scene_guid,
               layers: [
                 %Layer{
                   layer_guid: ^layer_guid,
                   entities: [
                     %Entity{
                       entity_guid: ^entity_guid
                     }
                   ],
                   components: [
                     %Component{
                       component_guid: ^component_guid,
                       component_schema: %ComponentSchema{
                         component_schema_guid: ^component_schema_guid
                       }
                     }
                   ],
                   relationships: [
                     %Relationship{
                       relationship_guid: ^relationship_guid
                     }
                   ]
                 }
               ]
             } = scene
    end
  end
end
