defmodule HokEcs.Components.Component do
  use TypedEctoSchema

  import Ecto.Changeset

  alias HokEcs.Components.ComponentSchema

  @attrs [
    :context,
    :component_name,
    :component_id,
    :entity_classification,
    :component_type,
    :component_type_reference,
    :component_payload_type,
    :owner,
    :version,
    :status,
    :active,
    :creation_date,
    :authoring_application,
    :hash1,
    :schema,
    :payload,
    :component_schema_guid,
    :entity_guid
  ]

  @required [:entity_guid]

  @primary_key {:component_guid, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  @derive {Phoenix.Param, key: :component_guid}
  typed_schema "components" do
    field :active, :boolean
    field :creation_date, :string
    field :authoring_application, :string
    field :component_id, :string
    field :component_name, :string
    field :component_payload_type, :string
    field :component_type, :string
    field :component_type_reference, :string
    field :context, :string
    field :entity_classification, :string
    field :hash1, :string
    field :owner, :string
    field :payload, :map
    field :schema, :string
    field :status, :string
    field :version, :integer
    field :entity_guid, :binary_id

    belongs_to :component_schema, ComponentSchema,
      foreign_key: :component_schema_guid,
      references: :component_schema_guid

    timestamps()
  end

  @doc false
  def changeset(component, attrs) do
    component
    |> cast(attrs, @attrs)
    |> validate_required(@required)
    |> foreign_key_constraint(:entity_guid)
    |> foreign_key_constraint(:component_schema_guid)
    |> update_change(:payload, fn payload_change ->
      if is_nil(payload_change) do
        nil
      else
        component
        |> Map.get(:payload, %{})
        |> case do
          nil -> %{}
          payload -> payload
        end
        |> Map.merge(payload_change)
      end
    end)
    |> validate_payload()
  end

  def validate_payload(changeset) do
    component_schema_guid = fetch_field!(changeset, :component_schema_guid)

    if is_nil(component_schema_guid) do
      changeset
    else
      # TODO: cache resolved schemas
      component_schema =
        component_schema_guid
        |> HokEcs.Components.get_component_schema!()
        |> Map.get(:schema)
        |> ExJsonSchema.Schema.resolve()

      validate_change(changeset, :payload, fn :payload, payload ->
        component_schema
        |> ExJsonSchema.Validator.validate(payload)
        |> case do
          :ok ->
            []

          {:error, errors} ->
            errors
            |> Enum.map(fn {err, path} ->
              {:payload, {"#{err} Path: %{path}", [path: path]}}
            end)
        end
      end)
    end
  end
end
