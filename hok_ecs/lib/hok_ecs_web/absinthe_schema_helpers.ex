defmodule HokEcsWeb.AbsintheSchema.Helpers do
  defmacro non_null_list(type) do
    quote do
      non_null(list_of(non_null(unquote(type))))
    end
  end
end
