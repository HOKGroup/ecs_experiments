defmodule HokEcsWeb.EntityController do
  use HokEcsWeb, :controller

  alias HokEcs.Entities
  alias HokEcs.Entities.Entity

  action_fallback HokEcsWeb.FallbackController

  def index(conn, _params) do
    entities = Entities.list_entities()
    render(conn, "index.json", entities: entities)
  end

  def create(conn, %{"entity" => entity_params}) do
    with {:ok, %Entity{} = entity} <- Entities.create_entity(entity_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", Routes.entity_path(conn, :show, entity))
      |> render("show.json", entity: entity)
    end
  end

  def show(conn, %{"id" => id}) do
    entity = Entities.get_entity!(id)
    render(conn, "show.json", entity: entity)
  end

  def update(conn, %{"id" => id, "entity" => entity_params}) do
    entity = Entities.get_entity!(id)

    with {:ok, %Entity{} = entity} <- Entities.update_entity(entity, entity_params) do
      render(conn, "show.json", entity: entity)
    end
  end
end
