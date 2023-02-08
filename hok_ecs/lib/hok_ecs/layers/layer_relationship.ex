defmodule HokEcs.Layers.LayerRelationship do
  use Ecto.Schema
  import Ecto.Changeset

  alias HokEcs.Layers.Layer
  alias HokEcs.Relationships.Relationship

  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  schema "layer_relationships" do
    # field :layer_guid, :binary_id
    # field :relationship_guid, :binary_id

    belongs_to :layer, Layer,
      foreign_key: :layer_guid,
      references: :layer_guid

    belongs_to :relationship, Relationship,
      foreign_key: :relationship_guid,
      references: :relationship_guid

    timestamps()
  end

  @doc false
  def changeset(layer_relationship, attrs) do
    layer_relationship
    |> cast(attrs, [:layer_guid, :relationship_guid])
    |> foreign_key_constraint(:layer_guid)
    |> foreign_key_constraint(:relationship_guid)
    |> unique_constraint([:layer_guid, :relationship_guid])
  end
end
