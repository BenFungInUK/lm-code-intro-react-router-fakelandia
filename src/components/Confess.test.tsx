import { render, screen } from "@testing-library/react";
import Confess from "./Confess";

test("renders element", () => {
  render(<Confess />);
  const firstHeaderText = screen.getByText(
    /It's very difficult to catch people committing misdemeanours so we appreciate it when citizens confess to us directly./i
  );
  const secondHeaderText = screen.getByText(
    /However, if you're just having a hard day and need to vent then you're welcome to contact us here too. Up to you!/i
  );
  expect(firstHeaderText).toBeInTheDocument();
  expect(secondHeaderText).toBeInTheDocument();
});
