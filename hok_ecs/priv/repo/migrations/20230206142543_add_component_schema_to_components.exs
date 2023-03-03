defmodule HokEcs.Repo.Migrations.AddComponentSchemaToComponents do
  use Ecto.Migration

  def change do
    alter table(:components) do
      add :component_schema_guid,
          references(:component_schemas,
            column: :component_schema_guid,
            on_delete: :nothing,
            type: :binary_id
          )
    end

    create index(:components, [:component_schema_guid])
  end
end
