defmodule HokEcs.Relationships.RelationshipSourceComponent do
  use TypedEctoSchema

  import Ecto.Changeset

  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  typed_schema "relationship_source_components" do
    field :relationship_guid, :binary_id
    field :component_guid, :binary_id

    timestamps()
  end

  @doc false
  def changeset(relationship_source_component, attrs) do
    relationship_source_component
    |> cast(attrs, [:relationship_guid, :component_guid])
    |> validate_required([:relationship_guid, :component_guid])
    |> foreign_key_constraint(:relationship_guid)
    |> foreign_key_constraint(:component_guid)
  end
end
