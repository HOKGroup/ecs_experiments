defmodule HokEcsWeb.PageControllerTest do
  use HokEcsWeb.ConnCase, async: true

  test "GET /", %{conn: conn} do
    conn = get(conn, "/")
    assert redirected_to(conn) =~ "/app"
  end
end
