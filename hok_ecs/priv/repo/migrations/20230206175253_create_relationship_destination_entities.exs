defmodule HokEcs.Repo.Migrations.CreateRelationshipDestinationEntities do
  use Ecto.Migration

  def change do
    create table(:relationship_destination_entities, primary_key: false) do
      add :id, :binary_id, primary_key: true

      add :relationship_guid,
          references(:relationships,
            column: :relationship_guid,
            on_delete: :nothing,
            type: :binary_id
          ),
          null: false

      add :entity_guid,
          references(:entities, column: :entity_guid, on_delete: :nothing, type: :binary_id),
          null: false

      timestamps()
    end

    create index(:relationship_destination_entities, [:relationship_guid])
    create index(:relationship_destination_entities, [:entity_guid])

    create unique_index(:relationship_destination_entities, [:relationship_guid, :entity_guid])
  end
end