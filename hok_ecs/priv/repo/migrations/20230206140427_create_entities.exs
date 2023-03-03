defmodule HokEcs.Repo.Migrations.CreateEntities do
  use Ecto.Migration

  def change do
    create table(:entities, primary_key: false) do
      add :entity_guid, :binary_id, primary_key: true
      add :context, :text, null: false
      add :context_id, :text, null: false
      add :entity_classification, :text, null: false
      add :entity_classification_reference, :text
      add :creation_date, :text, null: false

      timestamps()
    end
  end
end
