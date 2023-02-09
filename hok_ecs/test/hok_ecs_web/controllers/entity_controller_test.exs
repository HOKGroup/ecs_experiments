defmodule HokEcsWeb.EntityControllerTest do
  use HokEcsWeb.ConnCase, async: true

  import HokEcs.ECSFixtures

  alias HokEcs.Entities.Entity

  @create_attrs %{
    context: "my context"
  }

  @update_attrs %{
    context: "new context"
  }

  @invalid_attrs %{context: 1234, classification: 5678}

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    setup [:create_entity]

    test "lists all entities", %{conn: conn, entity: entity} do
      conn = get(conn, Routes.entity_path(conn, :index))
      response = json_response(conn, 200)["data"]

      assert response == [
               %{
                 "entity_guid" => entity.entity_guid,
                 "classification" => entity.classification,
                 "classification_reference" => entity.classification_reference,
                 "context" => entity.context,
                 "creation_date" => entity.creation_date
               }
             ]
    end
  end

  describe "create entity" do
    test "renders entity when data is valid", %{conn: conn} do
      conn = post(conn, Routes.entity_path(conn, :create), entity: @create_attrs)

      assert %{"entity_guid" => entity_guid} = json_response(conn, 201)["data"]

      conn = get(conn, Routes.entity_path(conn, :show, entity_guid))

      assert %{
               "entity_guid" => ^entity_guid
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.entity_path(conn, :create), entity: @invalid_attrs)

      response = json_response(conn, 422)

      assert response == %{
               "errors" => %{
                 "classification" => ["is invalid"],
                 "context" => ["is invalid"]
               }
             }
    end
  end

  describe "show entity" do
    setup [:create_entity]

    test "renders entity for valid entity guid", %{conn: conn, entity: entity} do
      entity_guid = entity.entity_guid

      conn = get(conn, Routes.entity_path(conn, :show, entity_guid))

      assert %{"entity_guid" => ^entity_guid} = json_response(conn, 200)["data"]
    end
  end

  describe "update entity" do
    setup [:create_entity]

    test "renders entity when data is valid", %{
      conn: conn,
      entity: %Entity{entity_guid: entity_guid} = entity
    } do
      conn = put(conn, Routes.entity_path(conn, :update, entity), entity: @update_attrs)

      assert %{"entity_guid" => ^entity_guid} = json_response(conn, 200)["data"]

      conn = get(conn, Routes.entity_path(conn, :show, entity_guid))

      assert %{
               "entity_guid" => ^entity_guid
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, entity: entity} do
      conn = put(conn, Routes.entity_path(conn, :update, entity), entity: @invalid_attrs)

      response = json_response(conn, 422)

      assert response == %{
               "errors" => %{
                 "classification" => ["is invalid"],
                 "context" => ["is invalid"]
               }
             }
    end
  end

  defp create_entity(_) do
    entity = entity_fixture()
    %{entity: entity}
  end
end
