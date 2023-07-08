defmodule HokEcs.LayersFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `HokEcs.Layers` context.
  """

  @doc """
  Generate a layer.
  """
  def layer_fixture(attrs \\ %{}) do
    {:ok, layer} =
      attrs
      |> Enum.into(%{
        active: true,
        context: "some context",
        layer_description: "some layer_description",
        layer_function: "some layer_function",
        layer_id: "some layer_id",
        layer_name: "some layer_name",
        layer_owner: "some layer_owner",
        layer_update_method: "some layer_update_method",
        version: 42
      })
      |> HokEcs.Layers.create_layer()

    layer
  end
end
