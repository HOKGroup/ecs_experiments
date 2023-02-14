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

  query do
    field :entities, non_null_list(:entity) do
      arg(:classification, :string)

      resolve(fn args, _ ->
        args
        |> Entities.list_entities()
        |> Helpers.ok()
      end)
    end

    field :components, non_null_list(:component) do
      arg(:component_type, :string)
      arg(:entity_guid, :string)

      resolve(fn args, _ ->
        args
        |> Components.list_components()
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
