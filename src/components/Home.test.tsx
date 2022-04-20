import { render, screen } from "@testing-library/react";
import Home from "./Home";

test("renders element", () => {
  render(<Home />);
  const firstHeaderText = screen.getByText(
    /Welcome to the home of the Justice Department of Fakelandia./i
  );
  const secondHeaderText = screen.getByText(
    /Here you can browse a list of recent misdemeanours committed by our citizens, or you can confess to your own misdemeanour./i
  );
  expect(firstHeaderText).toBeInTheDocument();
  expect(secondHeaderText).toBeInTheDocument();
});
