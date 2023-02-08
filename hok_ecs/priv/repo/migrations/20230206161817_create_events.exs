defmodule HokEcs.Repo.Migrations.CreateEvents do
  use Ecto.Migration

  def change do
    create table(:events, primary_key: false) do
      add :id, :binary_id, primary_key: true
      add :type, :string, null: false
      add :data, :map, null: false

      add :component_guid,
          references(:components, column: :component_guid, on_delete: :nothing, type: :binary_id)

      add :entity_guid,
          references(:entities, column: :entity_guid, on_delete: :nothing, type: :binary_id)

      timestamps()
    end

    create index(:events, [:component_guid])
    create index(:events, [:entity_guid])

    create constraint(:events, :valid_fkey,
             check: "(component_guid IS NULL) != (entity_guid IS NULL)"
           )
  end
end
