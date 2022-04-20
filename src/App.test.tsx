import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

test("renders element", () => {
  render(<App />);
  const firstHeaderText = screen.getByText(/FAKELANDIA JUSTICE DEPARTMENT/i);
  expect(firstHeaderText).toBeInTheDocument();
});

test("navigates home when you click 'Home'", () => {
  render(<App />);
  const link = screen.getByText("Home");
  userEvent.click(link);
  expect(
    screen.getByText(
      /Welcome to the home of the Justice Department of Fakelandia./i
    )
  ).toBeInTheDocument();
});

test("navigates misdemeanour when you click 'Misdemeanour'", () => {
  render(<App />);
  const link = screen.getByText("Misdemeanours");
  userEvent.click(link);
  expect(screen.getByText(/Punishment Idea/i)).toBeInTheDocument();
});

test("navigates confess when you click 'Confess'", () => {
  render(<App />);
  const link = screen.getByText("Confess To Us");
  userEvent.click(link);
  expect(screen.getByText(/Reason for contact/i)).toBeInTheDocument();
});
