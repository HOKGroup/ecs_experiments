defmodule HokEcs.Events.Event do
  use TypedEctoSchema

  import Ecto.Changeset

  alias HokEcs.Entities.Entity
  alias HokEcs.Components.Component

  @attrs [:type, :data, :component_guid, :entity_guid]
  @required [:type, :data]

  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  typed_schema "events" do
    field :data, :map
    field :type, :string

    belongs_to :entity, Entity,
      foreign_key: :entity_guid,
      references: :entity_guid

    belongs_to :component, Component,
      foreign_key: :component_guid,
      references: :component_guid

    timestamps()
  end

  @doc false
  def changeset(event, attrs) do
    event
    |> cast(attrs, @attrs)
    |> validate_required(@required)
    |> check_constraint(:entity_guid, name: :valid_fkey)
  end
end
