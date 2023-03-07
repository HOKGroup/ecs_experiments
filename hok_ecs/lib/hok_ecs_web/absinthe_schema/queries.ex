defmodule HokEcsWeb.AbsintheSchema.Queries do
  use Absinthe.Schema.Notation

  alias HokEcs.Entities
  alias HokEcs.Components
  alias HokEcs.Relationships
  alias HokEcs.Helpers

  import HokEcsWeb.AbsintheSchema.Helpers

  object :entity_queries do
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

    field :entity_component_types, non_null_list(:string) do
      arg(:entity_guid, non_null(:id))

      resolve(fn %{entity_guid: entity_guid}, _ ->
        entity_guid
        |> Components.get_entity_component_types()
        |> Helpers.ok()
      end)
    end
  end

  object :component_queries do
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
  end

  object :relationship_queries do
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

  object :graph_queries do
    field :graph, non_null(:graph) do
      resolve_constant(%{})
    end
  end
end
