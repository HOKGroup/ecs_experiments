defmodule HokEcs.Repo.Migrations.CreateRelationshipDestinationComponents do
  use Ecto.Migration

  def change do
    create table(:relationship_destination_components, primary_key: false) do
      add :id, :binary_id, primary_key: true

      add :relationship_guid,
          references(:relationships,
            column: :relationship_guid,
            on_delete: :nothing,
            type: :binary_id
          ),
          null: false

      add :component_guid,
          references(:components, column: :component_guid, on_delete: :nothing, type: :binary_id),
          null: false

      timestamps()
    end

    create index(:relationship_destination_components, [:relationship_guid])
    create index(:relationship_destination_components, [:component_guid])

    create unique_index(:relationship_destination_components, [
             :relationship_guid,
             :component_guid
           ])
  end
end
