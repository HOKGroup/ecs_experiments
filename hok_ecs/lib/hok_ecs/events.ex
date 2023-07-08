defmodule HokEcs.Events do
  alias HokEcs.Entities.Entity
  alias HokEcs.Components.Component
  alias HokEcs.Repo
  alias __MODULE__.Event

  @doc """
  Returns the list of events.

  ## Examples

      iex> list_events()
      [%Event{}, ...]

  """
  @spec list_events :: list(Event.t())
  def list_events do
    Repo.all(Event)
  end

  @doc """
  Gets a single event.

  Raises `Ecto.NoResultsError` if the Event does not exist.

  ## Examples

      iex> get_event!(123)
      %Event{}

      iex> get_event!(456)
      ** (Ecto.NoResultsError)

  """
  @spec get_event!(String.t()) :: Event.t()
  def get_event!(id), do: Repo.get!(Event, id)

  @spec create_entity_created_event(Entity.t(), map()) ::
          {:ok, Event.t()} | {:error, Ecto.Changeset.t()}
  def create_entity_created_event(%Entity{} = entity, attrs \\ %{}) do
    %Event{
      type: "entity_created",
      entity_guid: entity.entity_guid,
      data: attrs
    }
    |> Repo.insert()
  end

  @spec create_entity_updated_event(Entity.t(), map()) ::
          {:ok, Event.t()} | {:error, Ecto.Changeset.t()}
  def create_entity_updated_event(%Entity{} = entity, attrs \\ %{}) do
    %Event{
      type: "entity_updated",
      entity_guid: entity.entity_guid,
      data: attrs
    }
    |> Repo.insert()
  end

  @spec create_component_created_event(Component.t(), map()) ::
          {:ok, Event.t()} | {:error, Ecto.Changeset.t()}
  def create_component_created_event(%Component{} = component, attrs \\ %{}) do
    %Event{
      type: "component_created",
      component_guid: component.component_guid,
      data: attrs
    }
    |> Repo.insert()
  end

  @spec create_component_updated_event(Component.t(), map()) ::
          {:ok, Event.t()} | {:error, Ecto.Changeset.t()}
  def create_component_updated_event(%Component{} = component, attrs \\ %{}) do
    %Event{
      type: "component_updated",
      component_guid: component.component_guid,
      data: attrs
    }
    |> Repo.insert()
  end
end
