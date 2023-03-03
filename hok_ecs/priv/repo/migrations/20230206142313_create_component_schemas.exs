defmodule HokEcs.Repo.Migrations.CreateComponentSchemas do
  use Ecto.Migration

  def change do
    create table(:component_schemas, primary_key: false) do
      add :component_schema_guid, :binary_id, primary_key: true
      add :name, :string, null: false
      add :schema, :map, null: false

      timestamps()
    end

    create unique_index(:component_schemas, [:name])
  end
end
