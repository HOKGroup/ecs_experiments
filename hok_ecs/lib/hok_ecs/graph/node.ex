defmodule HokEcs.Graph.Node do
  use TypedEctoSchema

  typed_embedded_schema do
    field :node_id, :binary_id
    field :type, :string
    field :label, :string
  end
end
