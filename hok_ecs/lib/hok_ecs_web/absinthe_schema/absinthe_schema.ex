defmodule HokEcsWeb.AbsintheSchema do
  use Absinthe.Schema

  alias __MODULE__.{Types, Queries, Mutations}

  import_types(Types)
  import_types(Queries)
  import_types(Mutations)

  query do
    import_fields(:entity_queries)
    import_fields(:component_queries)
    import_fields(:relationship_queries)
    import_fields(:graph_queries)
  end

  mutation do
    import_fields(:relationship_mutations)
  end
end
