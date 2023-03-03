defmodule HokEcsWeb.WebappController do
  use HokEcsWeb, :controller

  @cache :webapp_cache

  def index(conn, _params) do
    conn
    |> send_resp(200, render_react_app())
  end

  defp render_react_app() do
    case Cachex.get(@cache, "html") do
      {:ok, nil} ->
        html = read_html()
        Cachex.put(@cache, "html", html)

        html

      {:ok, html} ->
        html
    end
  end

  defp read_html() do
    Application.app_dir(:hok_ecs, "priv/static/webapp/index.html")
    |> File.read!()
  end
end
