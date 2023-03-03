defmodule HokEcs.Graph do
  alias HokEcs.Repo
  alias __MODULE__.{Node, Edge}

  @spec get_nodes :: list(Node.t())
  def get_nodes() do
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

    %{rows: rows, columns: columns} = Repo.query!(query)

    rows
    |> Enum.map(&Repo.load(Node, {columns, &1}))
  end

  @spec get_edges :: list(Node.t())
  def get_edges() do
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

    %{rows: rows, columns: columns} = Repo.query!(query)

    rows
    |> Enum.map(&Repo.load(Edge, {columns, &1}))
  end
end
