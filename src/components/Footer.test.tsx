import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

test("renders element", () => {
  render(<Footer />);
  const firstHeaderText = screen.getByText(/© 2022 Techreturner./i);
  expect(firstHeaderText).toBeInTheDocument();
});
