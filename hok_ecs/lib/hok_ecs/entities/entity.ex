defmodule HokEcs.Entities.Entity do
  use Ecto.Schema
  import Ecto.Changeset

  @attrs [:classification, :classification_reference, :context, :creation_date]

  @primary_key {:entity_guid, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  @derive {Phoenix.Param, key: :entity_guid}
  schema "entities" do
    field :classification_reference, :string
    field :classification, :string
    field :context, :string
    field :creation_date, :string

    timestamps()
  end

  @doc false
  def changeset(entity, attrs) do
    entity
    |> cast(attrs, @attrs)
  end
end
