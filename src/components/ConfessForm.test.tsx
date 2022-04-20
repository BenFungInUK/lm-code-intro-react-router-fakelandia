import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ConfessForm from "./ConfessForm";

test("renders form element", () => {
  render(<ConfessForm />);
  //label
  expect(screen.getByText(/Citizen ID/i)).toBeInTheDocument();
  expect(screen.getByText(/Subject/i)).toBeInTheDocument();
  expect(screen.getByText(/Reason for contact/i)).toBeInTheDocument();

  //input elements
  expect(screen.getAllByRole("textbox").length).toBe(3);

  const options: HTMLOptionElement[] = screen.getAllByRole("option");
  expect(options.length).toBe(5);
  expect(options.find((item) => item.value === "talk")).toBeTruthy();
  expect(options.find((item) => item.value === "rudeness")).toBeTruthy();
  expect(options.find((item) => item.value === "vegetables")).toBeTruthy();
  expect(options.find((item) => item.value === "lift")).toBeTruthy();
  expect(options.find((item) => item.value === "united")).toBeTruthy();

  expect(screen.getByRole("button", { name: /Confess/i })).toBeInTheDocument();
});

describe("validate the function call", () => {
  test.each([["a"], ["@!"], ["1@a"], ["abc1"]])(
    "Given the input text is (%s), When it is typed in Citizen text input, Then the error message should be shown",
    (inputText) => {
      render(<ConfessForm />);
      const inputBox = screen.getByRole("textbox", { name: "citizenInput" });
      userEvent.type(inputBox, inputText);
      expect(inputBox).toHaveValue(inputText);
      expect(
        screen.getByText(/Citizen ID must be an integer./i)
      ).toBeInTheDocument();
    }
  );

  test("Given the input text is numeric, When it is typed in Citizen text input, Then the error message should not be shown", () => {
    render(<ConfessForm />);
    const inputBox = screen.getByRole("textbox", { name: "citizenInput" });
    userEvent.type(inputBox, "1233211234567");
    expect(inputBox).toHaveValue("1233211234567");
    expect(
      screen.queryByText(/Citizen ID must be an integer./i)
    ).not.toBeInTheDocument();
  });

  test.each([
    ["", "", "", true],
    ["1", "", "", true],
    ["", "1", "", true],
    ["", "", "1", true],
    ["1", "1", "", true],
    ["", "1", "1", true],
    ["1", "", "1", true],
    ["1", "1", "1", false],
  ])(
    "Given the input text are ({citizen id: %s, subject: %s, detail: %s }), When they are typed in corresponding text input, Then the submit button should (not) be disabled",
    (citizenId, subject, detail, expected) => {
      render(<ConfessForm />);
      const citizenInput = screen.getByRole("textbox", {
        name: "citizenInput",
      });
      const subjectInput = screen.getByRole("textbox", {
        name: "subjectInput",
      });
      const detailInput = screen.getByRole("textbox", {
        name: "detailInput",
      }) as HTMLInputElement;
      if (citizenId.length > 0) userEvent.type(citizenInput, citizenId);
      if (subject.length > 0) userEvent.type(subjectInput, subject);
      if (detail.length > 0) userEvent.type(detailInput, detail);
      const submitBtn: HTMLButtonElement = screen.getByRole("button");
      expect(submitBtn.disabled).toBe(expected);
    }
  );
});
