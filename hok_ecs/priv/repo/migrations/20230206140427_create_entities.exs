defmodule HokEcs.Repo.Migrations.CreateEntities do
  use Ecto.Migration

  def change do
    create table(:entities, primary_key: false) do
      add :entity_guid, :binary_id, primary_key: true
      add :classification, :text
      add :classification_reference, :text
      add :context, :text
      add :creation_date, :text

      timestamps()
    end
  end
end
