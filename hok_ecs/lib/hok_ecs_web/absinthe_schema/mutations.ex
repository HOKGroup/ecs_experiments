defmodule HokEcsWeb.AbsintheSchema.Mutations do
  use Absinthe.Schema.Notation

  alias HokEcs.Relationships

  import AbsintheErrorPayload.Payload

  import_types(AbsintheErrorPayload.ValidationMessageTypes)

  payload_object(:relationship_payload, :relationship)

  object :relationship_mutations do
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
