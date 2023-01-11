import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders App", () => {
  render(<App />);
  const appElement = screen.getByTestId("App-header");
  expect(appElement).toHaveTextContent("Edit src/App.tsx and save to reload");
});