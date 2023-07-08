defmodule HokEcsWeb.AbsintheSchema.Mutations do
  use Absinthe.Schema.Notation

  alias HokEcs.{Components, Entities, Relationships}

  import AbsintheErrorPayload.Payload

  import_types(AbsintheErrorPayload.ValidationMessageTypes)

  payload_object(:entity_payload, :entity)
  payload_object(:component_payload, :component)
  payload_object(:relationship_payload, :relationship)

  input_object :create_entity_input do
    field(:classification_reference, :string)
    field(:entity_classification, non_null(:string))
    field(:context, non_null(:string))
    field(:context_id, non_null(:string))
  end

  object :entity_mutations do
    field :create_entity, non_null(:entity_payload) do
      arg(:input, non_null(:create_entity_input))

      resolve(fn %{input: input}, _ ->
        input
        |> Map.put_new(:creation_date, DateTime.utc_now() |> to_string())
        |> Entities.create_entity()
      end)

      middleware(&build_payload/2)
    end
  end

  input_object :create_component_input do
    field(:entity_guid, non_null(:id))
    field(:context, non_null(:string))
    field(:context_id, non_null(:string))
    field(:component_name, :string)
    field(:component_id, :string)
    field(:component_type, non_null(:string))
    field(:component_type_reference, non_null(:string))
    field(:component_type_payload, non_null(:string))
    field(:owner, non_null(:string))
    field(:version, non_null(:string))
    field(:status, :string)
    field(:payload, non_null(:json))
  end

  object :component_mutations do
    field :create_component, non_null(:component_payload) do
      arg(:input, non_null(:create_component_input))

      resolve(fn %{input: input}, _ ->
        input
        |> Map.put_new(:creation_date, DateTime.utc_now() |> to_string())
        |> Components.create_component()
      end)

      middleware(&build_payload/2)
    end
  end

  input_object :create_relationship_input do
    field(:relationship_type, :string)

    field(:source_entity_guids, list_of(non_null(:id)))
    field(:source_component_guids, list_of(non_null(:id)))

    field(:destination_entity_guids, list_of(non_null(:id)))
    field(:destination_component_guids, list_of(non_null(:id)))
  end

  object :relationship_mutations do
    field :create_relationship, non_null(:relationship_payload) do
      arg(:input, non_null(:create_relationship_input))

      resolve(fn %{input: input}, _ ->
        source_entity_guids = Map.get(input, :source_entity_guids, [])
        source_component_guids = Map.get(input, :source_component_guids, [])

        destination_entity_guids = Map.get(input, :destination_entity_guids, [])
        destination_component_guids = Map.get(input, :destination_component_guids, [])

        input =
          Map.drop(input, [
            :source_entity_guids,
            :source_component_guids,
            :destination_entity_guids,
            :destination_component_guids
          ])

        Relationships.create_relationship(
          input,
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
