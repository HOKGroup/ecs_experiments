defmodule HokEcsWeb.WebappController do
  use HokEcsWeb, :controller

  def index(conn, _params) do
    conn
    |> send_resp(200, render_react_app())
  end

  defp render_react_app() do
    # TODO: Cache file contents
    Application.app_dir(:hok_ecs, "priv/static/webapp/index.html")
    |> File.read!()
  end
end
