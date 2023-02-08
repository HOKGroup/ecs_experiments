defmodule HokEcs.Repo do
  use Ecto.Repo,
    otp_app: :hok_ecs,
    adapter: Ecto.Adapters.Postgres
end
