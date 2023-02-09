defmodule HokEcsWeb.Router do
  use HokEcsWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_live_flash
    plug :put_root_layout, {HokEcsWeb.LayoutView, :root}
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", HokEcsWeb do
    pipe_through :browser

    get "/", PageController, :index
  end

  forward "/api/graphql", Absinthe.Plug, schema: HokEcsWeb.AbsintheSchema

  forward "/api/graphiql",
          Absinthe.Plug.GraphiQL,
          schema: HokEcsWeb.AbsintheSchema

  scope "/app", HokEcsWeb do
    get "/", WebappController, :index
    get "/*path", WebappController, :index
  end

  # Enables LiveDashboard only for development
  #
  # If you want to use the LiveDashboard in production, you should put
  # it behind authentication and allow only admins to access it.
  # If your application does not have an admins-only section yet,
  # you can use Plug.BasicAuth to set up some basic authentication
  # as long as you are also using SSL (which you should anyway).
  if Mix.env() in [:dev, :test] do
    import Phoenix.LiveDashboard.Router

    scope "/" do
      pipe_through :browser

      live_dashboard "/dashboard", metrics: HokEcsWeb.Telemetry
    end
  end
end
