defmodule HokEcs.Repo.Migrations.CreateLayer do
  use Ecto.Migration

  def change do
    create table(:layers, primary_key: false) do
      add :layer_guid, :binary_id, primary_key: true
      add :context, :text
      add :layer_name, :text
      add :layer_id, :text
      add :layer_owner, :text
      add :layer_description, :text
      add :layer_function, :text
      add :layer_update_method, :text
      add :active, :boolean
      add :version, :integer

      timestamps()
    end
  end
end
