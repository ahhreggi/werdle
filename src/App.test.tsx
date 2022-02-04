import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  render(<App />);
  const helloWorld = screen.getByText("Hello world!");
  expect(helloWorld).toBeInTheDocument();
});
