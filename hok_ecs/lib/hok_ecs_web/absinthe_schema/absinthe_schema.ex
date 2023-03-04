defmodule HokEcsWeb.AbsintheSchema do
  use Absinthe.Schema

  import AbsintheErrorPayload.Payload

  import_types(AbsintheErrorPayload.ValidationMessageTypes)

  alias HokEcs.Entities
  alias HokEcs.Components
  alias HokEcs.Relationships
  alias HokEcs.Graph
  alias HokEcs.Helpers

  import __MODULE__.Helpers

  scalar :json do
    parse(fn input ->
      case Jason.decode(input.value) do
        {:ok, result} -> result
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

  payload_object(:relationship_payload, :relationship)

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

  query do
    field :graph, non_null(:graph) do
      resolve_constant(%{})
    end

    field :entity, :entity do
      arg(:entity_guid, non_null(:id))

      resolve(fn %{entity_guid: entity_guid}, _ ->
        entity_guid
        |> Entities.get_entity()
        |> Helpers.ok()
      end)
    end

    field :entities, non_null_list(:entity) do
      arg(:entity_classification, :string)

      resolve(fn args, _ ->
        args
        |> Entities.list_entities()
        |> Helpers.ok()
      end)
    end

    field :component, :component do
      arg(:component_guid, non_null(:id))

      resolve(fn %{component_guid: component_guid}, _ ->
        component_guid
        |> Components.get_component()
        |> Helpers.ok()
      end)
    end

    field :components, non_null_list(:component) do
      arg(:component_type, :string)
      arg(:entity_classification, :string)
      arg(:entity_guid, :id)

      resolve(fn args, _ ->
        args
        |> Components.list_components()
        |> Helpers.ok()
      end)
    end

    field :entity_component_types, non_null_list(:string) do
      arg(:entity_guid, non_null(:id))

      resolve(fn %{entity_guid: entity_guid}, _ ->
        entity_guid
        |> Components.get_entity_component_types()
        |> Helpers.ok()
      end)
    end

    field :relationship, :relationship do
      arg(:relationship_guid, non_null(:id))

      resolve(fn %{relationship_guid: relationship_guid}, _ ->
        relationship_guid
        |> Relationships.get_relationship()
        |> Helpers.ok()
      end)
    end

    field :relationships, non_null_list(:relationship) do
      arg(:source_entity_guids, list_of(non_null(:id)))
      arg(:source_component_guids, list_of(non_null(:id)))
      arg(:destination_entity_guids, list_of(non_null(:id)))
      arg(:destination_component_guids, list_of(non_null(:id)))

      resolve(fn args, _ ->
        source_entity_guids = Map.get(args, :source_entity_guids, [])
        source_component_guids = Map.get(args, :source_component_guids, [])
        destination_entity_guids = Map.get(args, :destination_entity_guids, [])
        destination_component_guids = Map.get(args, :destination_component_guids, [])

        Relationships.get_relationships_by_member_ids(
          source_entity_guids,
          source_component_guids,
          destination_entity_guids,
          destination_component_guids
        )
        |> Helpers.ok()
      end)
    end
  end

  mutation do
    field :create_relationship, non_null(:relationship_payload) do
      arg(:relationship_type, :string)

      arg(:source_entity_guids, list_of(non_null(:id)))
      arg(:source_component_guids, list_of(non_null(:id)))

      arg(:destination_entity_guids, list_of(non_null(:id)))
      arg(:destination_component_guids, list_of(non_null(:id)))

      resolve(fn args, _ ->
        source_entity_guids = Map.get(args, :source_entity_guids, [])
        source_component_guids = Map.get(args, :source_component_guids, [])

        destination_entity_guids = Map.get(args, :destination_entity_guids, [])
        destination_component_guids = Map.get(args, :destination_component_guids, [])

        args =
          Map.drop(args, [
            :source_entity_guids,
            :source_component_guids,
            :destination_entity_guids,
            :destination_component_guids
          ])

        Relationships.create_relationship(
          args,
          source_entity_guids,
          source_component_guids,
          destination_entity_guids,
          destination_component_guids
        )
      end)

      middleware(&build_payload/2)
    end
  end
end
