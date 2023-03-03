defmodule HokEcs.Components do
  import Ecto.Query, warn: false
  alias HokEcs.Repo
  alias __MODULE__.Component
  alias HokEcs.Events
  alias HokEcs.Events.Event

  def get_entity_component_types(entity_guid) do
    query =
      from c in Component,
        where: c.entity_guid == ^entity_guid,
        distinct: c.component_type,
        order_by: [asc: c.component_type],
        select: c.component_type

    Repo.all(query)
  end

  @doc """
  Returns the list of components.

  ## Examples

      iex> list_components()
      [%Component{}, ...]

  """
  @spec list_components(map()) :: list(Component.t())
  def list_components(args \\ %{}) do
    args
    |> Enum.reduce(from(Component), fn
      {:entity_guid, entity_guid}, query ->
        where(query, entity_guid: ^entity_guid)

      {:component_type, component_type}, query ->
        where(query, component_type: ^component_type)

      {:entity_classification, entity_classification}, query ->
        where(query, entity_classification: ^entity_classification)
    end)
    |> Repo.all()
  end

  @doc """
  Gets a single component.

  Returns `nil` if the Component does not exist.
  """
  @spec get_component(String.t()) :: Component.t() | nil
  def get_component(component_guid), do: Repo.get(Component, component_guid)

  @doc """
  Gets a single component.

  Raises `Ecto.NoResultsError` if the Component does not exist.

  ## Examples

      iex> get_component!(123)
      %Component{}

      iex> get_component!(456)
      ** (Ecto.NoResultsError)

  """
  @spec get_component!(String.t()) :: Component.t()
  def get_component!(id), do: Repo.get!(Component, id)

  @doc """
  Creates a component.

  ## Examples

      iex> create_component(%{field: value})
      {:ok, %Component{}}

      iex> create_component(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  @spec create_component(map()) :: {:ok, Component.t()} | {:error, Ecto.Changeset.t()}
  def create_component(attrs \\ %{}) do
    Ecto.Multi.new()
    |> Ecto.Multi.insert(:component, Component.changeset(%Component{}, attrs))
    |> Ecto.Multi.run(:event, fn _repo, %{component: component} ->
      {:ok, %Event{}} = Events.create_component_created_event(component, attrs)
    end)
    |> Repo.transaction()
    |> case do
      {:ok, %{component: %Component{} = component}} -> {:ok, component}
      {:error, :component, %Ecto.Changeset{} = changeset, _} -> {:error, changeset}
    end
  end

  @doc """
  Updates a component.

  ## Examples

      iex> update_component(component, %{field: new_value})
      {:ok, %Component{}}

      iex> update_component(component, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  @spec update_component(Component.t(), map()) ::
          {:ok, Component.t()} | {:error, Ecto.Changeset.t()}
  def(update_component(%Component{} = component, attrs)) do
    Ecto.Multi.new()
    |> Ecto.Multi.update(:component, Component.changeset(component, attrs))
    |> Ecto.Multi.run(:event, fn _repo, %{component: component} ->
      {:ok, %Event{}} = Events.create_component_updated_event(component, attrs)
    end)
    |> Repo.transaction()
    |> case do
      {:ok, %{component: %Component{} = component}} -> {:ok, component}
      {:error, :component, %Ecto.Changeset{} = changeset, _} -> {:error, changeset}
    end
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking component changes.

  ## Examples

      iex> change_component(component)
      %Ecto.Changeset{data: %Component{}}

  """
  def change_component(%Component{} = component, attrs \\ %{}) do
    Component.changeset(component, attrs)
  end

  alias HokEcs.Components.ComponentSchema

  @doc """
  Returns the list of component_schemas.

  ## Examples

      iex> list_component_schemas()
      [%ComponentSchema{}, ...]

  """
  @spec list_component_schemas :: list(ComponentSchema.t())
  def list_component_schemas do
    Repo.all(ComponentSchema)
  end

  @doc """
  Gets a single component_schema.

  Raises `Ecto.NoResultsError` if the Component schema does not exist.

  ## Examples

      iex> get_component_schema!(123)
      %ComponentSchema{}

      iex> get_component_schema!(456)
      ** (Ecto.NoResultsError)

  """
  @spec get_component_schema!(String.t()) :: ComponentSchema.t()
  def get_component_schema!(id), do: Repo.get!(ComponentSchema, id)

  @doc """
  Creates a component_schema.

  ## Examples

      iex> create_component_schema(%{field: value})
      {:ok, %ComponentSchema{}}

      iex> create_component_schema(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  @spec create_component_schema(map()) ::
          {:ok, ComponentSchema.t()} | {:error, Ecto.Changeset.t()}
  def create_component_schema(attrs \\ %{}) do
    %ComponentSchema{}
    |> ComponentSchema.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a component_schema.

  ## Examples

      iex> update_component_schema(component_schema, %{field: new_value})
      {:ok, %ComponentSchema{}}

      iex> update_component_schema(component_schema, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  @spec update_component_schema(ComponentSchema.t(), map()) ::
          {:ok, ComponentSchema.t()} | {:error, Ecto.Changeset.t()}
  def update_component_schema(%ComponentSchema{} = component_schema, attrs) do
    component_schema
    |> ComponentSchema.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a component_schema.

  ## Examples

      iex> delete_component_schema(component_schema)
      {:ok, %ComponentSchema{}}

      iex> delete_component_schema(component_schema)
      {:error, %Ecto.Changeset{}}

  """
  @spec delete_component_schema(ComponentSchema.t()) ::
          {:ok, ComponentSchema.t()} | {:error, Ecto.Changeset.t()}
  def delete_component_schema(%ComponentSchema{} = component_schema) do
    Repo.delete(component_schema)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking component_schema changes.

  ## Examples

      iex> change_component_schema(component_schema)
      %Ecto.Changeset{data: %ComponentSchema{}}

  """
  @spec change_component_schema(ComponentSchema.t(), map()) :: Ecto.Changeset.t()
  def change_component_schema(%ComponentSchema{} = component_schema, attrs \\ %{}) do
    ComponentSchema.changeset(component_schema, attrs)
  end
end
