defmodule HokEcs.Repo.Migrations.ModifyRelationshipsActiveDefault do
  use Ecto.Migration

  def up do
    alter table(:relationships) do
      modify :active, :boolean, default: true, null: false
    end
  end

  def down do
    alter table(:relationships) do
      modify :active, :boolean, default: nil, null: true
    end
  end
end
