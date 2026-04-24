import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders app header and bus lines title", () => {
  render(<App />);
  expect(
    screen.getByRole("heading", { name: /SenTransport/i, level: 1 })
  ).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { name: /Lignes Dakar Dem Dikk/i, level: 2 })
  ).toBeInTheDocument();
});
