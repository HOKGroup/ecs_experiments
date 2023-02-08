defmodule HokEcs.Repo.Migrations.CreateLayerRelationships do
  use Ecto.Migration

  def change do
    create table(:layer_relationships, primary_key: false) do
      add :id, :binary_id, primary_key: true

      add :layer_guid,
          references(:layers,
            column: :layer_guid,
            on_delete: :nothing,
            type: :binary_id
          ),
          null: false

      add :relationship_guid,
          references(:relationships,
            column: :relationship_guid,
            on_delete: :nothing,
            type: :binary_id
          ),
          null: false

      timestamps()
    end

    create index(:layer_relationships, [:layer_guid])
    create index(:layer_relationships, [:relationship_guid])

    create unique_index(:layer_relationships, [:layer_guid, :relationship_guid])
  end
end
