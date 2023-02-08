defmodule HokEcs.Entities do
  @moduledoc """
  The ECS context.
  """

  import Ecto.Query, warn: false
  alias HokEcs.Events.Event
  alias HokEcs.Repo

  alias HokEcs.Entities.Entity
  alias HokEcs.Events
  alias Events.Event

  @doc """
  Returns the list of entities.

  ## Examples

      iex> list_entities()
      [%Entity{}, ...]

  """
  def list_entities do
    Repo.all(Entity)
  end

  @doc """
  Gets a single entity.

  Raises `Ecto.NoResultsError` if the Entity does not exist.

  ## Examples

      iex> get_entity!(123)
      %Entity{}

      iex> get_entity!(456)
      ** (Ecto.NoResultsError)

  """
  def get_entity!(id), do: Repo.get!(Entity, id)

  @doc """
  Creates a entity.

  ## Examples

      iex> create_entity(%{field: value})
      {:ok, %Entity{}}

      iex> create_entity(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_entity(attrs \\ %{}) do
    Ecto.Multi.new()
    |> Ecto.Multi.insert(:entity, Entity.changeset(%Entity{}, attrs))
    |> Ecto.Multi.run(:event, fn _repo, %{entity: entity} ->
      {:ok, %Event{}} = Events.create_entity_created_event(entity, attrs)
    end)
    |> Repo.transaction()
    |> case do
      {:ok, %{entity: %Entity{} = entity}} -> {:ok, entity}
      {:error, :entity, %Ecto.Changeset{} = changeset, _} -> {:error, changeset}
    end
  end

  @doc """
  Updates a entity.

  ## Examples

      iex> update_entity(entity, %{field: new_value})
      {:ok, %Entity{}}

      iex> update_entity(entity, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_entity(%Entity{} = entity, attrs) do
    Ecto.Multi.new()
    |> Ecto.Multi.update(:entity, Entity.changeset(entity, attrs))
    |> Ecto.Multi.run(:event, fn _repo, %{entity: entity} ->
      {:ok, %Event{}} = Events.create_entity_updated_event(entity, attrs)
    end)
    |> Repo.transaction()
    |> case do
      {:ok, %{entity: %Entity{} = entity}} -> {:ok, entity}
      {:error, :entity, %Ecto.Changeset{} = changeset, _} -> {:error, changeset}
    end
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking entity changes.

  ## Examples

      iex> change_entity(entity)
      %Ecto.Changeset{data: %Entity{}}

  """
  def change_entity(%Entity{} = entity, attrs \\ %{}) do
    Entity.changeset(entity, attrs)
  end
end