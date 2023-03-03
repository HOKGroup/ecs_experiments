defmodule HokEcs.Scenes.Scene do
  use TypedEctoSchema

  import Ecto.Changeset

  alias HokEcs.Layers.Layer
  alias HokEcs.Scenes.SceneLayer

  @primary_key {:scene_guid, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  typed_schema "scenes" do
    field :active, :boolean, default: false
    field :context, :string
    field :date_created, :string
    field :scene_id, :string
    field :scene_name, :string
    field :version, :integer

    many_to_many :layers, Layer,
      join_through: SceneLayer,
      join_keys: [scene_guid: :scene_guid, layer_guid: :layer_guid]

    timestamps()
  end

  @doc false
  def changeset(scene, attrs) do
    scene
    |> cast(attrs, [:context, :scene_name, :scene_id, :active, :version, :date_created])
  end
end
