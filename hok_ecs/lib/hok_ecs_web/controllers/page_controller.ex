defmodule HokEcsWeb.PageController do
  use HokEcsWeb, :controller

  def app_redirect(conn, _params) do
    redirect(conn, to: "/app")
  end
end
