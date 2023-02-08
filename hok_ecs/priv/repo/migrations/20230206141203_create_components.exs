defmodule HokEcs.Repo.Migrations.CreateComponents do
  use Ecto.Migration

  def change do
    create table(:components, primary_key: false) do
      add :component_guid, :binary_id, primary_key: true
      add :context, :text
      add :component_name, :text
      add :component_id, :text
      add :entity_classification, :text
      add :component_type, :text
      add :component_type_reference, :text
      add :component_payload_type, :text
      add :owner, :text
      add :version, :integer
      add :status, :text
      add :active, :boolean
      add :creation_date, :text
      add :authoring_application, :text
      add :hash1, :text
      add :schema, :text
      add :payload, :map

      add :entity_guid,
          references(:entities, column: :entity_guid, on_delete: :nothing, type: :binary_id)

      timestamps()
    end

    create index(:components, [:entity_guid])
  end
end
