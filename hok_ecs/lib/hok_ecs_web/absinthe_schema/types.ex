defmodule HokEcsWeb.AbsintheSchema.Types do
  use Absinthe.Schema.Notation

  alias HokEcsWeb.AbsintheSchema

  alias HokEcs.Graph
  alias HokEcs.Helpers

  import AbsintheSchema.Helpers

  scalar :json do
    parse(fn input ->
      case Jason.decode(input.value) do
        {:ok, result} -> {:ok, result}
        _ -> :error
      end
    end)

    serialize(& &1)
  end

  object :entity do
    field :entity_guid, non_null(:id)
    field :classification_reference, :string
    field :entity_classification, non_null(:string)
    field :context, non_null(:string)
    field :context_id, non_null(:string)
    field :creation_date, non_null(:string)
  end

  object :component do
    field :component_guid, non_null(:id)
    field :entity_guid, non_null(:id)
    field :entity_classification, :string
    field :context, non_null(:string)
    field :component_name, :string
    field :component_id, :string
    field :component_type, non_null(:string)
    field :component_type_reference, non_null(:string)
    field :component_type_payload, non_null(:string)
    field :owner, non_null(:string)
    field :version, non_null(:string)
    field :status, :string
    field :payload, non_null(:json)
  end

  object :relationship do
    field :relationship_guid, non_null(:id)
    field :relationship_name, :string
    field :relationship_type, :string
  end

  enum :node_type do
    value(:entity, as: "entity")
    value(:component, as: "component")
    value(:relationship, as: "relationship")
  end

  object :graph do
    field :nodes, non_null_list(:node),
      resolve: fn _, _ ->
        Graph.get_nodes()
        |> Helpers.ok()
      end

    field :edges, non_null_list(:edge),
      resolve: fn _, _ ->
        Graph.get_edges()
        |> Helpers.ok()
      end
  end

  object :node do
    field :id, non_null(:id), resolve: fn %{node_id: node_id}, _, _ -> {:ok, node_id} end
    field :type, non_null(:node_type)
    field :label, non_null(:string)
  end

  object :edge do
    field :from, non_null(:id), resolve: fn %{from_id: from_id}, _, _ -> {:ok, from_id} end
    field :to, non_null(:id), resolve: fn %{to_id: to_id}, _, _ -> {:ok, to_id} end
  end
end
