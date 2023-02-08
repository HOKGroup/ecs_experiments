defmodule HokEcs.Layers.Layer do
  use Ecto.Schema
  import Ecto.Changeset

  alias HokEcs.Layers.{LayerEntity, LayerComponent, LayerRelationship}
  alias HokEcs.Entities.Entity
  alias HokEcs.Components.Component
  alias HokEcs.Relationships.Relationship

  @attrs [
    :context,
    :layer_name,
    :layer_id,
    :layer_owner,
    :layer_description,
    :layer_function,
    :layer_update_method,
    :active,
    :version
  ]

  @primary_key {:layer_guid, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  schema "layers" do
    field :active, :boolean
    field :context, :string
    field :layer_description, :string
    field :layer_function, :string
    field :layer_id, :string
    field :layer_name, :string
    field :layer_owner, :string
    field :layer_update_method, :string
    field :version, :integer

    has_many :layer_entities, LayerEntity,
      foreign_key: :layer_guid,
      references: :layer_guid

    has_many :layer_components, LayerComponent,
      foreign_key: :layer_guid,
      references: :layer_guid

    has_many :layer_relationships, LayerRelationship,
      foreign_key: :layer_guid,
      references: :layer_guid

    many_to_many :entities, Entity,
      join_through: LayerEntity,
      join_keys: [layer_guid: :layer_guid, entity_guid: :entity_guid]

    many_to_many :components, Component,
      join_through: LayerComponent,
      join_keys: [layer_guid: :layer_guid, component_guid: :component_guid]

    many_to_many :relationships, Relationship,
      join_through: LayerRelationship,
      join_keys: [layer_guid: :layer_guid, relationship_guid: :relationship_guid]

    timestamps()
  end

  @doc false
  def changeset(layer, attrs) do
    layer
    |> cast(attrs, @attrs)
  end
end
