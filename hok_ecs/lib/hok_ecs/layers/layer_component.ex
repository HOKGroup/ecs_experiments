defmodule HokEcs.Layers.LayerComponent do
  use Ecto.Schema
  import Ecto.Changeset

  alias HokEcs.Components.Component
  alias HokEcs.Layers.Layer

  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  schema "layer_components" do
    # field :layer_guid, :binary_id
    # field :component_guid, :binary_id

    belongs_to :layer, Layer,
      foreign_key: :layer_guid,
      references: :layer_guid

    belongs_to :component, Component,
      foreign_key: :component_guid,
      references: :component_guid

    timestamps()
  end

  def changeset(layer_component, attrs) do
    layer_component
    |> cast(attrs, [:layer_guid, :component_guid])
    |> foreign_key_constraint(:layer_guid)
    |> foreign_key_constraint(:component_guid)
    |> unique_constraint([:layer_guid, :component_guid])
  end
end
