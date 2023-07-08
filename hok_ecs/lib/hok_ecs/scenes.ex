defmodule HokEcs.Scenes do
  @moduledoc """
  The Scenes context.
  """

  import Ecto.Query, warn: false
  alias HokEcs.Scenes.SceneLayer
  alias HokEcs.Repo

  alias HokEcs.Scenes.Scene

  @doc """
  Returns the list of scenes.

  ## Examples

      iex> list_scenes()
      [%Scene{}, ...]

  """
  def list_scenes do
    Repo.all(Scene)
  end

  @doc """
  Gets a single scene.

  Raises `Ecto.NoResultsError` if the Scene does not exist.

  ## Examples

      iex> get_scene!(123)
      %Scene{}

      iex> get_scene!(456)
      ** (Ecto.NoResultsError)

  """
  def get_scene!(id), do: Repo.get!(Scene, id)

  @doc """
  Creates a scene.

  ## Examples

      iex> create_scene(%{field: value})
      {:ok, %Scene{}}

      iex> create_scene(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_scene(attrs \\ %{}) do
    %Scene{}
    |> Scene.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a scene.

  ## Examples

      iex> update_scene(scene, %{field: new_value})
      {:ok, %Scene{}}

      iex> update_scene(scene, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_scene(%Scene{} = scene, attrs) do
    scene
    |> Scene.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a scene.

  ## Examples

      iex> delete_scene(scene)
      {:ok, %Scene{}}

      iex> delete_scene(scene)
      {:error, %Ecto.Changeset{}}

  """
  def delete_scene(%Scene{} = scene) do
    Repo.delete(scene)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking scene changes.

  ## Examples

      iex> change_scene(scene)
      %Ecto.Changeset{data: %Scene{}}

  """
  def change_scene(%Scene{} = scene, attrs \\ %{}) do
    Scene.changeset(scene, attrs)
  end

  def add_layer_to_scene(layer_guid, %Scene{} = scene) do
    %SceneLayer{}
    |> SceneLayer.changeset(%{
      scene_guid: scene.scene_guid,
      layer_guid: layer_guid
    })
    |> Repo.insert()
  end

  def get_scene_data(%Scene{} = scene) do
    scene
    |> Map.get(:scene_guid)
    |> get_scene_data()
  end

  def get_scene_data(scene_guid) do
    query =
      from s in Scene,
        where: s.scene_guid == ^scene_guid,
        join: l in assoc(s, :layers),
        left_join: e in assoc(l, :entities),
        left_join: c in assoc(l, :components),
        left_join: cs in assoc(c, :component_schema),
        left_join: r in assoc(l, :relationships),
        preload: [
          layers: {l, entities: e, relationships: r, components: {c, component_schema: cs}}
        ]

    query |> Repo.one()
  end
end
