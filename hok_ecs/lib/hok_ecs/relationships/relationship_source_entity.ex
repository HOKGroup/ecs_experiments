defmodule HokEcs.Relationships.RelationshipSourceEntity do
  use TypedEctoSchema

  import Ecto.Changeset

  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  typed_schema "relationship_source_entities" do
    field :relationship_guid, :binary_id
    field :entity_guid, :binary_id

    timestamps()
  end

  @doc false
  def changeset(relationship_source_entity, attrs) do
    relationship_source_entity
    |> cast(attrs, [:relationship_guid, :entity_guid])
    |> validate_required([:relationship_guid, :entity_guid])
    |> foreign_key_constraint(:relationship_guid)
    |> foreign_key_constraint(:entity_guid)
  end
end
