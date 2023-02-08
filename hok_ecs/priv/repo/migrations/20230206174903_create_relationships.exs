defmodule HokEcs.Repo.Migrations.CreateRelationships do
  use Ecto.Migration

  def change do
    create table(:relationships, primary_key: false) do
      add :relationship_guid, :binary_id, primary_key: true
      add :context, :text
      add :relationship_name, :text
      add :relationship_type, :text
      add :relationship_type_reference, :text
      add :active, :boolean
      add :version, :integer

      timestamps()
    end
  end
end
