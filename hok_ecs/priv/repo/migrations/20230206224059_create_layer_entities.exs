defmodule HokEcs.Repo.Migrations.CreateLayerEntities do
  use Ecto.Migration

  def change do
    create table(:layer_entities, primary_key: false) do
      add :id, :binary_id, primary_key: true

      add :layer_guid,
          references(:layers,
            column: :layer_guid,
            on_delete: :nothing,
            type: :binary_id
          ),
          null: false

      add :entity_guid,
          references(:entities,
            column: :entity_guid,
            on_delete: :nothing,
            type: :binary_id
          ),
          null: false

      timestamps()
    end

    create index(:layer_entities, [:layer_guid])
    create index(:layer_entities, [:entity_guid])

    create unique_index(:layer_entities, [:layer_guid, :entity_guid])
  end
end
