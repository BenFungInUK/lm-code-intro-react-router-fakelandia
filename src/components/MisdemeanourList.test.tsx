import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MisdemeanourContextProvider } from "./MisdemeanourContext";
import MisdemeanourList from "./MisdemeanourList";

beforeEach(() => {
  jest.spyOn(global.Math, "random").mockReturnValue(0.1);
});

afterEach(() => {
  jest.spyOn(global.Math, "random").mockRestore();
});

test("renders list element", () => {
  render(<MisdemeanourList />);
  //label
  expect(screen.getByText(/Citizen ID/i)).toBeInTheDocument();
  expect(screen.getByText(/Date/i)).toBeInTheDocument();
  expect(screen.getByText(/Misdemeanour/i)).toBeInTheDocument();
  expect(screen.getByText(/Punishment Idea/i)).toBeInTheDocument();

  //input elements
  const options: HTMLOptionElement[] = screen.getAllByRole("option");
  expect(options.length).toBe(5);
  expect(options.find((item) => item.value === "show all")).toBeTruthy();
  expect(options.find((item) => item.value === "rudeness")).toBeTruthy();
  expect(options.find((item) => item.value === "vegetables")).toBeTruthy();
  expect(options.find((item) => item.value === "lift")).toBeTruthy();
  expect(options.find((item) => item.value === "united")).toBeTruthy();
});

describe("validate the function call", () => {
  test.each([
    ["Show All", 10],
    ["Rudeness", 10],
    ["Vegetables", 0],
    ["Lift", 0],
    ["United", 0],
  ])(
    "Given the filter value is (%s), When it has been selected, Then only the misdemeanours with the same value can be shown",
    async (filterText, expected) => {
      render(
        <MisdemeanourContextProvider>
          <MisdemeanourList />
        </MisdemeanourContextProvider>
      );
      const comboBox = screen.getByRole("combobox") as HTMLSelectElement;
      const options = screen.getByRole("option", {
        name: filterText,
      }) as HTMLOptionElement;
      await waitFor(
        () => {
          expect(screen.getAllByText("Mild Public Rudeness 🤪").length).toBe(
            10
          );
        },
        { timeout: 2000 }
      );
      userEvent.selectOptions(comboBox, options);
      expect(options.selected).toBe(true);
      expect(screen.queryAllByText("Mild Public Rudeness 🤪").length).toBe(
        expected
      );
    }
  );
});
