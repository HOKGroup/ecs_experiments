defmodule HokEcsWeb.AbsintheSchema do
  use Absinthe.Schema

  import AbsintheErrorPayload.Payload

  import_types(AbsintheErrorPayload.ValidationMessageTypes)

  alias HokEcs.Entities
  alias HokEcs.Components
  alias HokEcs.Relationships
  alias HokEcs.Helpers

  import __MODULE__.Helpers

  scalar :json do
    parse(fn input ->
      case Jason.decode(input.value) do
        {:ok, result} -> result
        _ -> :error
      end
    end)

    serialize(&Jason.encode!/1)
  end

  object :entity do
    field :entity_guid, non_null(:id)
    field :classification_reference, :string
    field :classification, :string
    field :context, :string
    field :creation_date, :string
  end

  object :component do
    field :component_guid, non_null(:id)
    field :entity_guid, non_null(:id)
    field :entity_classification, :string
    field :context, :string
    field :component_name, :string
    field :component_id, :string
    field :component_type, :string
    field :component_type_reference, :string
    field :component_payload_type, :string
    field :owner, :string
    field :version, :integer
    field :status, :boolean
    field :payload, :json
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
        query = ~S"""
        select c.component_guid as node_id, 'component' as type, c.component_type as label
        from components c
        union
        select e.entity_guid as node_id, 'entity' as type, e.entity_classification as label
        from entities e
        union
        select r.relationship_guid as node_id, 'relationship' as type, r.relationship_type as label
        from relationships r
        """

        %{rows: rows, columns: columns} = HokEcs.Repo.query!(query)

        rows
        |> Enum.map(&HokEcs.Repo.load(HokEcs.Graph.Node, {columns, &1}))
        |> Helpers.ok()
      end

    field :edges, non_null_list(:edge),
      resolve: fn _, _ ->
        query = ~S"""
        select rsc.relationship_guid as to_id, rsc.component_guid as from_id
        from relationship_source_components rsc
        union
        select rdc.component_guid as to_id, rdc.relationship_guid as from_id
        from relationship_destination_components rdc
        union
        select rse.relationship_guid as to_id, rse.entity_guid as from_id
        from relationship_source_entities rse
        union
        select rde.entity_guid as to_id, rde.relationship_guid as from_id
        from relationship_destination_entities rde
        union
        select components.entity_guid as to_id, components.component_guid as from_id
        from components
        """

        %{rows: rows, columns: columns} = HokEcs.Repo.query!(query)

        rows
        |> Enum.map(&HokEcs.Repo.load(HokEcs.Graph.Edge, {columns, &1}))
        |> IO.inspect(label: RESULT)
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
      resolve(fn _, _ -> {:ok, %{}} end)
    end

    field :entities, non_null_list(:entity) do
      arg(:entity_classification, :string)

      resolve(fn args, _ ->
        args
        |> Entities.list_entities()
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
