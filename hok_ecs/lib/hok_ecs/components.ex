defmodule HokEcs.Components do
  alias HokEcs.Repo
  alias __MODULE__.Component
  alias HokEcs.Events
  alias HokEcs.Events.Event

  @doc """
  Returns the list of components.

  ## Examples

      iex> list_components()
      [%Component{}, ...]

  """
  def list_components do
    Repo.all(Component)
  end

  @doc """
  Gets a single component.

  Raises `Ecto.NoResultsError` if the Component does not exist.

  ## Examples

      iex> get_component!(123)
      %Component{}

      iex> get_component!(456)
      ** (Ecto.NoResultsError)

  """
  def get_component!(id), do: Repo.get!(Component, id)

  @doc """
  Creates a component.

  ## Examples

      iex> create_component(%{field: value})
      {:ok, %Component{}}

      iex> create_component(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
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
  def update_component(%Component{} = component, attrs) do
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
  def get_component_schema!(id), do: Repo.get!(ComponentSchema, id)

  @doc """
  Creates a component_schema.

  ## Examples

      iex> create_component_schema(%{field: value})
      {:ok, %ComponentSchema{}}

      iex> create_component_schema(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
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
  def delete_component_schema(%ComponentSchema{} = component_schema) do
    Repo.delete(component_schema)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking component_schema changes.

  ## Examples

      iex> change_component_schema(component_schema)
      %Ecto.Changeset{data: %ComponentSchema{}}

  """
  def change_component_schema(%ComponentSchema{} = component_schema, attrs \\ %{}) do
    ComponentSchema.changeset(component_schema, attrs)
  end
end
