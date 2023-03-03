defmodule HokEcs.ScenesFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `HokEcs.Scenes` context.
  """

  @doc """
  Generate a scene.
  """
  def scene_fixture(attrs \\ %{}) do
    {:ok, scene} =
      attrs
      |> Enum.into(%{
        active: true,
        context: "some context",
        date_created: "some date_created",
        scene_id: "some scene_id",
        scene_name: "some scene_name",
        version: 42
      })
      |> HokEcs.Scenes.create_scene()

    scene
  end
end
