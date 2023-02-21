# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     HokEcs.Repo.insert!(%HokEcs.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

defmodule HokEcs.DatabaseSeeder do
  alias HokEcs.Components.{Component, ComponentSchema}
  alias HokEcs.Entities.Entity
  # alias HokEcs.Relationships.Relationship

  alias HokEcs.Repo

  @component_schemas_path "../json_schema/Entity and Component Definitions/jsonschema"
  @sample_data_path "../json_schema/Entity and Component Definitions/Sample Data"

  def run do
    # used to cache inserted component schema guids
    {:ok, agent} = Agent.start_link(fn -> %{} end)

    create_component_schemas(agent)
    create_sample_data(agent)
  end

  def create_component_schemas(agent) do
    @component_schemas_path
    |> File.ls!()
    |> Enum.each(&create_component_schema(&1, agent))
  end

  def create_component_schema(filename, agent) do
    schema =
      @component_schemas_path
      |> Path.join(filename)
      |> File.read!()
      |> Jason.decode!()

    name = Map.fetch!(schema, "title")

    case name do
      "entity" ->
        :ok

      "component" ->
        :ok

      name ->
        schema =
          %ComponentSchema{
            name: name,
            schema: schema
          }
          |> Repo.insert!()

        Agent.update(agent, &Map.put_new(&1, name, schema.component_schema_guid))
    end
  end

  def create_sample_data(agent) do
    File.ls!(@sample_data_path)
    |> Enum.each(&process_sample_data_dir(&1, agent))
  end

  def process_sample_data_dir(dir_name, agent) do
    create_entities(dir_name)
    create_components(dir_name, agent)
  end

  def create_entities(dir_name) do
    [@sample_data_path, dir_name, "*.json"]
    |> Path.join()
    |> Path.wildcard()
    |> Enum.each(&create_entity/1)
  end

  def create_entity(json_file_path) do
    json_file_path
    |> File.read!()
    |> Jason.decode!()
    |> create_entity_from_decoded_json()
  end

  def create_entity_from_decoded_json(entity) do
    entity_guid = Map.fetch!(entity, "entity_guid")
    context = Map.fetch!(entity, "context")
    context_id = Map.fetch!(entity, "context")
    entity_classification = Map.fetch!(entity, "entity_classification")
    entity_classification_reference = Map.fetch!(entity, "entity_classification_reference")
    creation_date = Map.fetch!(entity, "creation_date")

    %Entity{
      entity_guid: entity_guid,
      context: context,
      context_id: context_id,
      entity_classification: entity_classification,
      entity_classification_reference: entity_classification_reference,
      creation_date: creation_date
    }
    |> Repo.insert!()
  end

  def get_component_suffix(filename) do
    filename
    |> String.slice(-13, 13)
    |> String.slice(0, 8)
  end

  def create_components(dir_name, agent) do
    [@sample_data_path, dir_name, "components"]
    |> Path.join()
    |> File.ls!()
    |> Enum.group_by(&get_component_suffix/1)
    |> Map.values()
    |> Enum.map(&Enum.sort/1)
    |> Enum.each(&create_component(&1, dir_name, agent))
  end

  def create_component(filenames, dir_name, agent) do
    components_dir =
      [@sample_data_path, dir_name, "components"]
      |> Path.join()

    [component | rest] =
      filenames
      |> Enum.map(fn filename ->
        components_dir
        |> Path.join(filename)
        |> File.read!()
        |> Jason.decode!()
      end)

    payload = List.first(rest)

    create_component_from_decoded_json(component, agent, payload)
  end

  def create_component_from_decoded_json(component, agent, payload \\ %{}) do
    # required
    entity_guid = Map.fetch!(component, "entity_guid")
    component_type = Map.fetch!(component, "component_type")
    component_type_payload = Map.fetch!(component, "component_type_payload")
    owner = Map.fetch!(component, "owner")
    version = Map.fetch!(component, "version")
    creation_date = Map.fetch!(component, "creation_date")
    active = Map.fetch!(component, "active")

    # FIXME: these should be required but are missing in the sample data
    context = Map.get(component, "context", "")
    context_id = Map.get(component, "context_id", "")
    component_type_reference = Map.get(component, "component_type_reference", "")

    # optional
    component_sequence_name = Map.get(component, "component_sequence_name")
    component_sequence_value = Map.get(component, "component_sequence_value")
    authoring_application = Map.get(component, "authoring_application")
    component_id = Map.get(component, "component_id")
    component_name = Map.get(component, "component_name")
    hash1 = Map.get(component, "hash1")
    status = Map.get(component, "status")

    # FIXME: this is missing in the sample data
    entity_classification = component_type |> String.split(".") |> List.first()

    # schema fkey
    component_schema_name = component_type
    component_schema_guid = Agent.get(agent, &Map.fetch!(&1, component_schema_name))

    %Component{
      entity_guid: entity_guid,
      context: context,
      context_id: context_id,
      component_type: component_type,
      component_type_reference: component_type_reference,
      component_type_payload: component_type_payload,
      owner: owner,
      version: version,
      active: active,
      creation_date: creation_date,
      component_sequence_name: component_sequence_name,
      component_sequence_value: component_sequence_value,
      authoring_application: authoring_application,
      component_id: component_id,
      component_name: component_name,
      entity_classification: entity_classification,
      hash1: hash1,
      status: status,
      component_schema_guid: component_schema_guid,
      payload: payload
    }
    |> Repo.insert!()
  end
end

alias HokEcs.DatabaseSeeder
alias HokEcs.Repo

Repo.transaction(fn ->
  DatabaseSeeder.run()
end)
