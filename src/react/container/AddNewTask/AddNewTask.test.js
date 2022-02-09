import { AddNewTask } from "./AddNewTask";
import userEvent from "@testing-library/user-event";
import { renderWithRedux, screen, fireEvent } from "../../../test-utils";

describe("render AddNewTask", () => {
  const setup = () => {
    renderWithRedux(<AddNewTask />);

    const input = screen.getByPlaceholderText("What needs to be done?");
    return input;
  };

  it("render without crash", () => {
    const input = setup();

    expect(input).toBeInTheDocument();
  });

  it("user should be can input something", () => {
    const input = setup();

    userEvent.type(input, "Test task");

    expect(input.value).toBe("Test task");
  });

  it("On submit should clear input value", () => {
    const input = setup();

    fireEvent.change(input, { target: { value: "Test task" } });
    fireEvent.submit(input);

    expect(input.value).toBe("");
  });

  it("Show error on submit when value is empty", () => {
    const input = setup();

    fireEvent.submit(input);

    expect(screen.getByText("Task can't be empty")).toBeInTheDocument("");
  });
});
