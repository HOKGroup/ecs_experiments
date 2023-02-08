defmodule HokEcs.Relationships.Relationship do
  use Ecto.Schema
  import Ecto.Changeset

  alias HokEcs.Relationships.{
    RelationshipDestinationComponent,
    RelationshipDestinationEntity,
    RelationshipSourceComponent,
    RelationshipSourceEntity
  }

  @attrs [
    :context,
    :relationship_name,
    :relationship_type,
    :relationship_type_reference,
    :active,
    :version
  ]

  @primary_key {:relationship_guid, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  schema "relationships" do
    field :active, :boolean, default: false
    field :context, :string
    field :relationship_name, :string
    field :relationship_type, :string
    field :relationship_type_reference, :string
    field :version, :integer

    has_many :relationship_source_entities, RelationshipSourceEntity,
      foreign_key: :relationship_guid,
      references: :relationship_guid

    has_many :relationship_source_components, RelationshipSourceComponent,
      foreign_key: :relationship_guid,
      references: :relationship_guid

    has_many :relationship_destination_entities, RelationshipDestinationEntity,
      foreign_key: :relationship_guid,
      references: :relationship_guid

    has_many :relationship_destination_components, RelationshipDestinationComponent,
      foreign_key: :relationship_guid,
      references: :relationship_guid

    # many_to_many :source_entities, HokEcs.ECS.Entity,
    # join_through: HokEcs.ECS.RelationshipSourceEntity,
    # join_keys: [relationship_guid: :relationship_guid, entity_guid: :entity_guid]

    # many_to_many :source_components, HokEcs.ECS.Component,
    # join_through: HokEcs.ECS.RelationshipSourceComponent,
    # join_keys: [relationship_guid: :relationship_guid, component_guid: :component_guid]

    # many_to_many :destination_entities, HokEcs.ECS.Entity,
    # join_through: HokEcs.ECS.RelationshipDestinationEntity,
    # join_keys: [relationship_guid: :relationship_guid, entity_guid: :entity_guid]

    # many_to_many :destination_components, HokEcs.ECS.Component,
    # join_through: HokEcs.ECS.RelationshipDestinationComponent,
    # join_keys: [relationship_guid: :relationship_guid, component_guid: :component_guid]

    timestamps()
  end

  @doc false
  def changeset(relationship, attrs) do
    relationship
    |> cast(attrs, @attrs)
  end
end
