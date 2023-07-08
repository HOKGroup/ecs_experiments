defmodule HokEcs.Relationships do
  alias HokEcs.Helpers
  alias HokEcs.Repo

  alias HokEcs.Relationships.{
    Operations,
    Relationship,
    RelationshipSourceEntity,
    RelationshipSourceComponent,
    RelationshipDestinationEntity,
    RelationshipDestinationComponent
  }

  import Ecto.Query, only: [from: 1, from: 2]

  @spec get_relationships_by_member_ids(
          list(String.t()),
          list(String.t()),
          list(String.t()),
          list(String.t())
        ) :: list(Relationship.t())
  def get_relationships_by_member_ids(
        source_entity_guids,
        source_component_guids,
        destination_entity_guids,
        destination_component_guids
      ) do
    query = from(r in Relationship)

    query
    |> get_relationships_by_member_ids_source_entities_join(source_entity_guids)
    |> get_relationships_by_member_ids_source_components_join(source_component_guids)
    |> get_relationships_by_member_ids_destination_entities_join(destination_entity_guids)
    |> get_relationships_by_member_ids_destination_components_join(destination_component_guids)
    |> Repo.all()
  end

  @spec get_relationships_by_member_ids_source_entities_join(Ecto.Query.t(), list(String.t())) ::
          Ecto.Query.t()
  defp get_relationships_by_member_ids_source_entities_join(query, []), do: query

  defp get_relationships_by_member_ids_source_entities_join(query, source_entity_guids) do
    from r in query,
      join: rse in RelationshipSourceEntity,
      on:
        rse.relationship_guid == r.relationship_guid and
          rse.entity_guid in ^source_entity_guids
  end

  @spec get_relationships_by_member_ids_source_components_join(Ecto.Query.t(), list(String.t())) ::
          Ecto.Query.t()
  defp get_relationships_by_member_ids_source_components_join(query, []), do: query

  defp get_relationships_by_member_ids_source_components_join(query, source_component_guids) do
    from r in query,
      join: rsc in RelationshipSourceComponent,
      on:
        rsc.relationship_guid == r.relationship_guid and
          rsc.component_guid in ^source_component_guids
  end

  @spec get_relationships_by_member_ids_destination_entities_join(
          Ecto.Query.t(),
          list(String.t())
        ) :: Ecto.Query.t()
  defp get_relationships_by_member_ids_destination_entities_join(query, []), do: query

  defp get_relationships_by_member_ids_destination_entities_join(query, destination_entity_guids) do
    from r in query,
      join: rde in RelationshipDestinationEntity,
      on:
        rde.relationship_guid == r.relationship_guid and
          rde.entity_guid in ^destination_entity_guids
  end

  @spec get_relationships_by_member_ids_destination_components_join(
          Ecto.Query.t(),
          list(String.t())
        ) :: Ecto.Query.t()
  defp get_relationships_by_member_ids_destination_components_join(query, []), do: query

  defp get_relationships_by_member_ids_destination_components_join(
         query,
         destination_component_guids
       ) do
    from r in query,
      join: rse in RelationshipDestinationComponent,
      on:
        rse.relationship_guid == r.relationship_guid and
          rse.component_guid in ^destination_component_guids
  end

  @doc """
  Returns the list of relationships.

  ## Examples

      iex> list_relationships()
      [%Relationship{}, ...]

  """
  @spec list_relationships :: list(Relationship.t())
  def list_relationships do
    Repo.all(Relationship)
  end

  @spec get_relationship(String.t()) :: Relationship.t() | nil
  def get_relationship(relationship_guid), do: Repo.get(Relationship, relationship_guid)

  @doc """
  Gets a single relationship.

  Raises `Ecto.NoResultsError` if the Relationship does not exist.

  ## Examples

      iex> get_relationship!(123)
      %Relationship{}

      iex> get_relationship!(456)
      ** (Ecto.NoResultsError)

  """
  @spec get_relationship!(String.t()) :: Relationship.t()
  def get_relationship!(id), do: Repo.get!(Relationship, id)

  @doc """
  Creates a relationship.

  ## Examples

      iex> create_relationship(%{field: value})
      {:ok, %Relationship{}}

      iex> create_relationship(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  @spec create_relationship(map()) :: {:ok, Relationship.t()} | {:error, Ecto.Changeset.t()}
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
  @spec update_relationship(Relationship.t(), map()) ::
          {:ok, Relationship.t()} | {:error, Ecto.Changeset.t()}
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
  @spec delete_relationship(Relationship.t()) ::
          {:ok, Relationship.t()} | {:error, Ecto.Changeset.t()}
  def delete_relationship(%Relationship{} = relationship) do
    Repo.delete(relationship)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking relationship changes.

  ## Examples

      iex> change_relationship(relationship)
      %Ecto.Changeset{data: %Relationship{}}

  """
  @spec change_relationship(Relationship.t(), map()) :: Ecto.Changeset.t()
  def change_relationship(%Relationship{} = relationship, attrs \\ %{}) do
    Relationship.changeset(relationship, attrs)
  end

  @spec create_relationship(
          map(),
          list(String.t()),
          list(String.t()),
          list(String.t()),
          list(String.t())
        ) :: {:ok, Relationship.t()} | {:error, Ecto.Changeset.t()}
  def create_relationship(
        attrs \\ %{},
        source_entity_guids,
        source_component_guids,
        destination_entity_guids,
        destination_component_guids
      ) do
    case Ecto.Multi.new()
         |> Ecto.Multi.insert(:relationship, Relationship.changeset(%Relationship{}, attrs))
         |> Operations.create_relationship_joins_in_multi(
           source_entity_guids,
           source_component_guids,
           destination_entity_guids,
           destination_component_guids
         )
         |> Repo.transaction() do
      {:ok, result} ->
        result
        |> Map.get(:relationship)
        |> Operations.relationship_with_links()
        |> Helpers.ok()

      {:error, _, %Ecto.Changeset{} = changeset, _} ->
        {:error, changeset}
    end
  end

  @spec add_links_to_relationship(
          Relationship.t(),
          list(String.t()),
          list(String.t()),
          list(String.t()),
          list(String.t())
        ) :: {:ok, Relationship.t()} | {:error, Ecto.Changeset.t()}
  def add_links_to_relationship(
        %Relationship{} = relationship,
        source_entity_guids,
        source_component_guids,
        destination_entity_guids,
        destination_component_guids
      ) do
    case Ecto.Multi.new()
         |> Ecto.Multi.put(:relationship, relationship)
         |> Operations.create_relationship_joins_in_multi(
           source_entity_guids,
           source_component_guids,
           destination_entity_guids,
           destination_component_guids
         )
         |> Repo.transaction() do
      {:ok, result} ->
        result
        |> Map.get(:relationship)
        |> Operations.relationship_with_links()
        |> Helpers.ok()

      {:error, _, %Ecto.Changeset{} = changeset, _} ->
        {:error, changeset}
    end
  end
end
