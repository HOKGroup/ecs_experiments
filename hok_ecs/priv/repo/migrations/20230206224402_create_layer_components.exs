defmodule HokEcs.Repo.Migrations.CreateLayerComponents do
  use Ecto.Migration

  def change do
    create table(:layer_components, primary_key: false) do
      add :id, :binary_id, primary_key: true

      add :layer_guid,
          references(:layers,
            column: :layer_guid,
            on_delete: :nothing,
            type: :binary_id
          ),
          null: false

      add :component_guid,
          references(:components,
            column: :component_guid,
            on_delete: :nothing,
            type: :binary_id
          ),
          null: false

      timestamps()
    end

    create index(:layer_components, [:layer_guid])
    create index(:layer_components, [:component_guid])

    create unique_index(:layer_components, [:layer_guid, :component_guid])
  end
end
