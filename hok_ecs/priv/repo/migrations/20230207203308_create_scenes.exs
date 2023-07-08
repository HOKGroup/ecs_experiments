defmodule HokEcs.Repo.Migrations.CreateScenes do
  use Ecto.Migration

  def change do
    create table(:scenes, primary_key: false) do
      add :scene_guid, :binary_id, primary_key: true
      add :context, :text
      add :scene_name, :text
      add :scene_id, :text
      add :active, :boolean
      add :version, :integer
      add :date_created, :text

      timestamps()
    end
  end
end
