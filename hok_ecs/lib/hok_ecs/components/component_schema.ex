defmodule HokEcs.Components.ComponentSchema do
  use TypedEctoSchema

  import Ecto.Changeset

  @attrs [:name, :schema]
  @required_attrs [:name, :schema]

  @primary_key {:component_schema_guid, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  typed_schema "component_schemas" do
    field :name, :string
    field :schema, :map

    timestamps()
  end

  @doc false
  def changeset(component_schema, attrs) do
    component_schema
    |> cast(attrs, @attrs)
    |> validate_required(@required_attrs)
    |> unique_constraint(:name)
  end
end
