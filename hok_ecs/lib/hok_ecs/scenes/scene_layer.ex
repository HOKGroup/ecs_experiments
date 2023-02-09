defmodule HokEcs.Scenes.SceneLayer do
  use TypedEctoSchema

  import Ecto.Changeset

  alias HokEcs.Layers.Layer
  alias HokEcs.Scenes.Scene

  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  typed_schema "scene_layers" do
    belongs_to :scene, Scene,
      foreign_key: :scene_guid,
      references: :scene_guid

    belongs_to :layer, Layer,
      foreign_key: :layer_guid,
      references: :layer_guid

    timestamps()
  end

  @doc false
  def changeset(scene_layer, attrs) do
    scene_layer
    |> cast(attrs, [:scene_guid, :layer_guid])
    |> foreign_key_constraint(:scene_guid)
    |> foreign_key_constraint(:layer_guid)
    |> unique_constraint([:scene_guid, :layer_guid])
  end
end
