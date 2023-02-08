defmodule HokEcs.Relationships do
  alias HokEcs.Helpers
  alias HokEcs.Repo

  alias HokEcs.Relationships.{
    Operations,
    Relationship
  }

  @doc """
  Returns the list of relationships.

  ## Examples

      iex> list_relationships()
      [%Relationship{}, ...]

  """
  def list_relationships do
    Repo.all(Relationship)
  end

  @doc """
  Gets a single relationship.

  Raises `Ecto.NoResultsError` if the Relationship does not exist.

  ## Examples

      iex> get_relationship!(123)
      %Relationship{}

      iex> get_relationship!(456)
      ** (Ecto.NoResultsError)

  """
  def get_relationship!(id), do: Repo.get!(Relationship, id)

  @doc """
  Creates a relationship.

  ## Examples

      iex> create_relationship(%{field: value})
      {:ok, %Relationship{}}

      iex> create_relationship(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_relationship(attrs \\ %{}) do
    %Relationship{}
    |> Relationship.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a relationship.

  ## Examples

      iex> update_relationship(relationship, %{field: new_value})
      {:ok, %Relationship{}}

      iex> update_relationship(relationship, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_relationship(%Relationship{} = relationship, attrs) do
    relationship
    |> Relationship.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a relationship.

  ## Examples

      iex> delete_relationship(relationship)
      {:ok, %Relationship{}}

      iex> delete_relationship(relationship)
      {:error, %Ecto.Changeset{}}

  """
  def delete_relationship(%Relationship{} = relationship) do
    Repo.delete(relationship)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking relationship changes.

  ## Examples

      iex> change_relationship(relationship)
      %Ecto.Changeset{data: %Relationship{}}

  """
  def change_relationship(%Relationship{} = relationship, attrs \\ %{}) do
    Relationship.changeset(relationship, attrs)
  end

  def create_relationship(
        attrs \\ %{},
        source_entity_guids,
        source_component_guids,
        destination_entity_guids,
        destination_component_guids
      ) do
    with {:ok, result} <-
           Ecto.Multi.new()
           |> Ecto.Multi.insert(:relationship, Relationship.changeset(%Relationship{}, attrs))
           |> Operations.create_relationship_joins_in_multi(
             source_entity_guids,
             source_component_guids,
             destination_entity_guids,
             destination_component_guids
           )
           |> Repo.transaction() do
      result
      |> Map.get(:relationship)
      |> Operations.relationship_with_links()
      |> Helpers.ok()
    else
      {:error, _, %Ecto.Changeset{} = changeset, _} -> {:error, changeset}
    end
  end

  def add_links_to_relationship(
        %Relationship{} = relationship,
        source_entity_guids,
        source_component_guids,
        destination_entity_guids,
        destination_component_guids
      ) do
    with {:ok, result} <-
           Ecto.Multi.new()
           |> Ecto.Multi.put(:relationship, relationship)
           |> Operations.create_relationship_joins_in_multi(
             source_entity_guids,
             source_component_guids,
             destination_entity_guids,
             destination_component_guids
           )
           |> Repo.transaction() do
      result
      |> Map.get(:relationship)
      |> Operations.relationship_with_links()
      |> Helpers.ok()
    else
      {:error, _, %Ecto.Changeset{} = changeset, _} -> {:error, changeset}
    end
  end
end
