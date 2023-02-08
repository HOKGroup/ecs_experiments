defmodule HokEcs.Layers do
  @moduledoc """
  The Layers context.
  """

  import Ecto.Query, warn: false

  alias HokEcs.Repo
  alias HokEcs.Layers.{Layer, LayerEntity, LayerComponent, LayerRelationship}

  @doc """
  Returns the list of layers.

  ## Examples

      iex> list_layers()
      [%Layer{}, ...]

  """
  def list_layers do
    Repo.all(Layer)
  end

  @doc """
  Gets a single layer.

  Raises `Ecto.NoResultsError` if the Layer does not exist.

  ## Examples

      iex> get_layer!(123)
      %Layer{}

      iex> get_layer!(456)
      ** (Ecto.NoResultsError)

  """
  def get_layer!(id), do: Repo.get!(Layer, id)

  @doc """
  Creates a layer.

  ## Examples

      iex> create_layer(%{field: value})
      {:ok, %Layer{}}

      iex> create_layer(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_layer(attrs \\ %{}) do
    %Layer{}
    |> Layer.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a layer.

  ## Examples

      iex> update_layer(layer, %{field: new_value})
      {:ok, %Layer{}}

      iex> update_layer(layer, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_layer(%Layer{} = layer, attrs) do
    layer
    |> Layer.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a layer.

  ## Examples

      iex> delete_layer(layer)
      {:ok, %Layer{}}

      iex> delete_layer(layer)
      {:error, %Ecto.Changeset{}}

  """
  def delete_layer(%Layer{} = layer) do
    Repo.delete(layer)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking layer changes.

  ## Examples

      iex> change_layer(layer)
      %Ecto.Changeset{data: %Layer{}}

  """
  def change_layer(%Layer{} = layer, attrs \\ %{}) do
    Layer.changeset(layer, attrs)
  end

  def add_entity_to_layer(entity_guid, %Layer{} = layer) do
    %LayerEntity{}
    |> LayerEntity.changeset(%{
      layer_guid: layer.layer_guid,
      entity_guid: entity_guid
    })
    |> Repo.insert()
  end

  def add_component_to_layer(component_guid, %Layer{} = layer) do
    %LayerComponent{}
    |> LayerComponent.changeset(%{
      layer_guid: layer.layer_guid,
      component_guid: component_guid
    })
    |> Repo.insert()
  end

  def add_relationship_to_layer(relationship_guid, %Layer{} = layer) do
    %LayerRelationship{}
    |> LayerRelationship.changeset(%{
      layer_guid: layer.layer_guid,
      relationship_guid: relationship_guid
    })
    |> Repo.insert()
  end

  @layer_data_preload [
    :entities,
    :relationships,
    components: [:component_schema]
  ]

  def get_layer_data(%Layer{} = layer) do
    layer
    |> Map.get(:layer_guid)
    |> get_layer_data()
  end

  def get_layer_data(layer_guid) do
    query =
      from l in Layer,
        where: l.layer_guid == ^layer_guid,
        preload: ^@layer_data_preload

    query |> Repo.one()
  end
end