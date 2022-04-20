import { render, screen } from "@testing-library/react";
import ConfessFormInput from "./ConfessFormInput";

test("renders form element", () => {
  const onChangeHandler = jest.fn();
  render(
    <ConfessFormInput
      labelText="Testing label"
      inputValue=""
      onChangeFunc={onChangeHandler}
      name="testLabel"
    />
  );
  //label
  expect(screen.getByText(/Testing label/i)).toBeInTheDocument();

  //input elements
  expect(
    screen.getByRole("textbox", { name: "testLabel" })
  ).toBeInTheDocument();
});
