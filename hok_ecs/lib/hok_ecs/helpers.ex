defmodule HokEcs.Helpers do
  @moduledoc """
  Utility functions.
  """

  @doc """
  Wraps a value in an `{:ok, value}` tuple.
  If the value is already an ok tuple it will not be changed.

  ## Examples
      iex> "OK" |> ok()
      {:ok, "OK"}

      iex> {:ok, "OK"} |> ok()
      {:ok, "OK"}
  """
  @spec ok(any) :: {:ok, any}
  def ok({:ok, _} = val), do: val
  def ok(val), do: {:ok, val}

  @doc """
  Wraps a value in an `{:error, value}` tuple.
  If the value is already an error tuple it will not be changed.

  ## Examples
      iex> "Error" |> error()
      {:error, "Error"}

      iex> {:error, "Error"} |> error()
      {:error, "Error"}
  """
  @spec error(any) :: {:error, any}
  def error({:error, _} = error), do: error
  def error(val), do: {:error, val}
end
