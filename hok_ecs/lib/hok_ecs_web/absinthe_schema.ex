defmodule HokEcsWeb.AbsintheSchema do
  use Absinthe.Schema

  alias HokEcs.Entities
  alias HokEcs.Components
  alias HokEcs.Helpers

  import __MODULE__.Helpers

  scalar :json do
    parse fn input ->
      case Jason.decode(input.value) do
        {:ok, result} -> result
        _ -> :error
      end
    end

    serialize &Jason.encode!/1
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

  query do
    field :entities_by_classification, non_null_list(:entity) do
      arg(:classification, non_null(:string))

      resolve(fn %{classification: classification}, _ ->
        classification
        |> Entities.list_entities_by_classification()
        |> Helpers.ok()
      end)
    end

    field :components_by_component_type, non_null_list(:component) do
      arg(:component_type, non_null(:string))

      resolve(fn %{component_type: component_type}, _ ->
        component_type
        |> Components.list_components_by_component_type()
        |> Helpers.ok()
      end)
    end
  end
end
