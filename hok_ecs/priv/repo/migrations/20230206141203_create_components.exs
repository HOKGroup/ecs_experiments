defmodule HokEcs.Repo.Migrations.CreateComponents do
  use Ecto.Migration

  def change do
    create table(:components, primary_key: false) do
      add :component_guid, :binary_id, primary_key: true
      add :component_sequence_name, :text
      add :component_sequence_value, :text
      add :context, :text, null: false
      add :context_id, :text, null: false
      add :component_name, :text
      add :component_id, :text
      add :entity_classification, :text
      add :component_type, :text, null: false
      add :component_type_reference, :text, null: false
      add :component_type_payload, :text, null: false
      add :owner, :text, null: false
      add :version, :string, null: false
      add :status, :text
      add :active, :boolean, null: false, default: true
      add :creation_date, :text, null: false
      add :authoring_application, :text
      add :hash1, :text
      add :payload, :map, null: false, default: %{}

      add :entity_guid,
          references(:entities, column: :entity_guid, on_delete: :nothing, type: :binary_id),
          null: false

      timestamps()
    end

    create index(:components, [:entity_guid])
  end
end
