defmodule HokEcs.Layers.LayerEntity do
  use Ecto.Schema
  import Ecto.Changeset

  alias HokEcs.Entities.Entity
  alias HokEcs.Layers.Layer

  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  schema "layer_entities" do
    # field :layer_guid, :binary_id
    # field :entity_guid, :binary_id

    belongs_to :layer, Layer,
      foreign_key: :layer_guid,
      references: :layer_guid

    belongs_to :entity, Entity,
      foreign_key: :entity_guid,
      references: :entity_guid

    timestamps()
  end

  @doc false
  def changeset(layer_entity, attrs) do
    layer_entity
    |> cast(attrs, [:layer_guid, :entity_guid])
    |> foreign_key_constraint(:layer_guid)
    |> foreign_key_constraint(:entity_guid)
    |> unique_constraint([:layer_guid, :entity_guid])
  end
end
