defmodule HokEcs.Graph.Edge do
  use TypedEctoSchema

  typed_embedded_schema do
    field :from_id, :binary_id
    field :to_id, :binary_id
  end
end
