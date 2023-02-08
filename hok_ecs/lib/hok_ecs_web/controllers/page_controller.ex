defmodule HokEcsWeb.PageController do
  use HokEcsWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
