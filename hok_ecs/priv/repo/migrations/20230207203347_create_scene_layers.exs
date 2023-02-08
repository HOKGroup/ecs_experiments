defmodule HokEcs.Repo.Migrations.CreateSceneLayers do
  use Ecto.Migration

  def change do
    create table(:scene_layers, primary_key: false) do
      add :id, :binary_id, primary_key: true

      add :scene_guid,
          references(:scenes,
            column: :scene_guid,
            on_delete: :nothing,
            type: :binary_id
          ),
          null: false

      add :layer_guid,
          references(:layers,
            column: :layer_guid,
            on_delete: :nothing,
            type: :binary_id
          ),
          null: false

      timestamps()
    end

    create index(:scene_layers, [:scene_guid])
    create index(:scene_layers, [:layer_guid])

    create unique_index(:scene_layers, [:scene_guid, :layer_guid])
  end
end
