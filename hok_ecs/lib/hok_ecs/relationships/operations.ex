defmodule HokEcs.Relationships.Operations do
  alias HokEcs.Repo

  alias HokEcs.Relationships.{
    Relationship,
    RelationshipSourceEntity,
    RelationshipSourceComponent,
    RelationshipDestinationEntity,
    RelationshipDestinationComponent
  }

  @spec relationship_with_links(Relationship.t()) :: Relationship.t()
  def relationship_with_links(%Relationship{} = relationship) do
    relationship
    |> Repo.preload([
      :relationship_source_entities,
      :relationship_destination_entities,
      :relationship_source_components,
      :relationship_destination_components
    ])
  end

  @spec create_relationship_joins_in_multi(
          Ecto.Multi.t(),
          list(String.t()),
          list(String.t()),
          list(String.t()),
          list(String.t())
        ) ::
          Ecto.Multi.t()
  def create_relationship_joins_in_multi(
        %Ecto.Multi{} = multi,
        source_entity_guids,
        source_component_guids,
        destination_entity_guids,
        destination_component_guids
      ) do
    multi
    |> Ecto.Multi.run(:source_entities, fn _repo, %{relationship: relationship} ->
      create_relationship_source_entities(source_entity_guids, relationship)
    end)
    |> Ecto.Multi.run(:source_components, fn _repo, %{relationship: relationship} ->
      create_relationship_source_components(
        source_component_guids,
        relationship
      )
    end)
    |> Ecto.Multi.run(:destination_entitys, fn _repo, %{relationship: relationship} ->
      create_relationship_destination_entities(
        destination_entity_guids,
        relationship
      )
    end)
    |> Ecto.Multi.run(:destination_components, fn _repo, %{relationship: relationship} ->
      create_relationship_destination_components(
        destination_component_guids,
        relationship
      )
    end)
  end

  def create_relationship_source_entities(source_entity_guids, %Relationship{} = relationship) do
    create_relationship_joins(
      source_entity_guids,
      RelationshipSourceEntity,
      :entity_guid,
      relationship
    )
  end

  def create_relationship_source_components(
        source_component_guids,
        %Relationship{} = relationship
      ) do
    create_relationship_joins(
      source_component_guids,
      RelationshipSourceComponent,
      :component_guid,
      relationship
    )
  end

  def create_relationship_destination_entities(
        destination_entity_guids,
        %Relationship{} = relationship
      ) do
    create_relationship_joins(
      destination_entity_guids,
      RelationshipDestinationEntity,
      :entity_guid,
      relationship
    )
  end

  def create_relationship_destination_components(
        destination_component_guids,
        %Relationship{} = relationship
      ) do
    create_relationship_joins(
      destination_component_guids,
      RelationshipDestinationComponent,
      :component_guid,
      relationship
    )
  end

  defp create_relationship_joins(nil, _, _, _), do: {:ok, nil}
  defp create_relationship_joins([], _, _, _), do: {:ok, []}

  defp create_relationship_joins(guids, schema, join_key, %Relationship{} = relationship) do
    guids
    |> Enum.reduce_while({:ok, []}, fn guid, {:ok, acc} ->
      attrs =
        %{
          relationship_guid: relationship.relationship_guid
        }
        |> Map.put(join_key, guid)

      struct(schema)
      |> schema.changeset(attrs)
      |> Repo.insert()
      |> case do
        {:ok, result} -> {:cont, {:ok, [result | acc]}}
        {:error, err} -> {:halt, {:error, err}}
      end
    end)
  end
end
