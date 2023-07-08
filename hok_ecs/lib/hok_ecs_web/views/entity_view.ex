defmodule HokEcsWeb.EntityView do
  use HokEcsWeb, :view
  alias HokEcsWeb.EntityView

  def render("index.json", %{entities: entities}) do
    %{data: render_many(entities, EntityView, "entity.json")}
  end

  def render("show.json", %{entity: entity}) do
    %{data: render_one(entity, EntityView, "entity.json")}
  end

  def render("entity.json", %{entity: entity}) do
    %{
      entity_guid: entity.entity_guid,
      classification: entity.classification,
      classification_reference: entity.classification_reference,
      context: entity.context,
      creation_date: entity.creation_date
    }
  end
end
