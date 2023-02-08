defmodule HokEcs.ECSFixtures do
  @moduledoc """
  This module defines test helpers for creating
  entities via the `HokEcs.ECS` context.
  """

  @doc """
  Generate a entity.
  """
  alias HokEcs.Repo
  alias HokEcs.Events.Event
  alias HokEcs.Entities.Entity
  alias HokEcs.Components
  alias HokEcs.Components.Component
  alias HokEcs.Relationships

  alias HokEcs.Relationships.{
    RelationshipDestinationComponent,
    RelationshipDestinationEntity,
    RelationshipSourceComponent,
    RelationshipSourceEntity
  }

  def entity_fixture(attrs \\ %{}) do
    %Entity{}
    |> Entity.changeset(attrs)
    |> Repo.insert!()
  end

  @doc """
  Generate a component.
  """
  def component_fixture(%Entity{} = entity, attrs \\ %{}) do
    attrs =
      attrs
      |> Enum.into(%{
        entity_guid: entity.entity_guid,
        active: true,
        authoring_application: "some authoring_application",
        component_id: "some component_id",
        component_name: "some component_name",
        component_payload_type: "some component_payload_type",
        component_type: "some component_type",
        component_type_reference: "some component_type_reference",
        context: "some context",
        entity_classification: "some entity_classification",
        hash1: "some hash1",
        owner: "some owner",
        payload: %{},
        schema: "some schema",
        status: "some status",
        version: 42
      })

    %Component{}
    |> Component.changeset(attrs)
    |> Repo.insert!()
  end

  @doc """
  Generate a component_schema.
  """
  def component_schema_fixture(attrs \\ %{}) do
    {:ok, component_schema} =
      attrs
      |> Enum.into(%{
        name: "Person.Details",
        schema: %{
          "$schema" => "http://json-schema.org/schema#",
          "title" => "Person.Details",
          "version" => "V0.02",
          "type" => "object",
          "properties" => %{
            "FirstName" => %{
              "type" => "string",
              "description" => "Persons First Name"
            },
            "LastName" => %{
              "type" => "string",
              "description" => "Persons last name"
            },
            "EmailAddress" => %{
              "type" => "string",
              "description" => "Persons email address"
            },
            "UniqueID" => %{
              "type" => "string",
              "description" => "Entity Specific Identifier"
            }
          }
        }
      })
      |> Components.create_component_schema()

    component_schema
  end

  @doc """
  Generate a event.
  """
  def event_fixture(attrs \\ %{}) do
    {:ok, event} =
      %Event{
        type: "some type",
        data: %{}
      }
      |> Event.changeset(attrs)
      |> Repo.insert()

    event
  end

  @doc """
  Generate a relationship.
  """
  def relationship_fixture(attrs \\ %{}) do
    {:ok, relationship} =
      attrs
      |> Enum.into(%{
        active: true,
        context: "some context",
        relationship_name: "some relationship_name",
        relationship_type: "some relationship_type",
        relationship_type_reference: "some relationship_type_reference",
        version: 42
      })
      |> Relationships.create_relationship()

    relationship
  end

  @doc """
  Generate a relationship_source_entity.
  """
  def relationship_source_entity_fixture(attrs \\ %{}) do
    %RelationshipSourceEntity{}
    |> RelationshipSourceEntity.changeset(attrs)
    |> Repo.insert!()
  end

  @doc """
  Generate a relationship_source_component.
  """
  def relationship_source_component_fixture(attrs \\ %{}) do
    %RelationshipSourceComponent{}
    |> RelationshipSourceComponent.changeset(attrs)
    |> Repo.insert!()
  end

  @doc """
  Generate a relationship_destination_entity.
  """
  def relationship_destination_entity_fixture(attrs \\ %{}) do
    %RelationshipDestinationEntity{}
    |> RelationshipDestinationEntity.changeset(attrs)
    |> Repo.insert!()
  end

  @doc """
  Generate a relationship_destination_component.
  """
  def relationship_destination_component_fixture(attrs \\ %{}) do
    %RelationshipDestinationComponent{}
    |> RelationshipDestinationComponent.changeset(attrs)
    |> Repo.insert!()
  end
end
