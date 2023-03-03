defmodule HokEcs.Entities.Entity do
  use TypedEctoSchema

  import Ecto.Changeset

  @attrs [
    :context,
    :context_id,
    :entity_classification,
    :entity_classification_reference,
    :creation_date
  ]
  @required [:entity_classification, :context, :context_id, :creation_date]

  @primary_key {:entity_guid, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  @derive {Phoenix.Param, key: :entity_guid}
  typed_schema "entities" do
    field :context, :string
    field :context_id, :string
    field :entity_classification, :string
    field :entity_classification_reference, :string
    field :creation_date, :string

    timestamps()
  end

  @doc false
  def changeset(entity, attrs) do
    entity
    |> cast(attrs, @attrs)
    |> validate_required(@required)
  end
end
