import { AddNewTask } from "./AddNewTask";

import { renderWithRedux, screen, fireEvent } from "../../../test-utils";

describe("AddNewTask component", () => {
  const setup = () => {
    const utils = renderWithRedux(<AddNewTask />);
    const input = screen.getByPlaceholderText("What needs to be done?");

    return {
      input,
      ...utils,
    };
  };

  it("Should render without fail", () => {
    const { input } = setup();
    
    expect(input).toBeInTheDocument();
  });

  it("Should handle user inputs", () => {
    const { input } = setup();

    fireEvent.change(input, { target: { value: "Test task" } });
    expect(input.value).toBe("Test task");
  });

  it("On submit should clear input value", () => {
    const { input } = setup();

    fireEvent.change(input, { target: { value: "Test task" } });
    fireEvent.submit(input);

    expect(input.value).toBe("");
  });

  it("Show error on submit when value is empty", () => {
    const { input } = setup();
    
    fireEvent.submit(input);
    
    expect(screen.getByText("Task can't be empty")).toBeInTheDocument("");
  });
});
