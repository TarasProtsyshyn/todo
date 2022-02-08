import userEvent from "@testing-library/user-event";

import { renderWithRedux, screen, fireEvent } from "../../../../test-utils";
import { TodoListItem } from "./TodoListItem";

describe("TodoListItem component", () => {
  const defaultProps = {
    content: "test task",
    id: "61fd40c04e1f53917ac2a0e9",
    isDone: false,
  };

  it("render not done", () => {
    renderWithRedux(<TodoListItem {...defaultProps} />);

    const checkBtn = screen.getByTestId("todo-item-check");
    const editBtn = screen.getByTestId("todo-item-edit");
    const deleteBtn = screen.getByTestId("todo-item-delete");

    expect(checkBtn).not.toHaveClass("done");
    expect(editBtn).toBeInTheDocument();
    expect(deleteBtn).toBeInTheDocument();
  });

  it("edit", () => {
    renderWithRedux(<TodoListItem {...defaultProps} />);

    fireEvent.click(screen.getByTestId("todo-item-edit"));

    const closeBtn = screen.getByTestId("todo-item-close");
    const input = screen.getByDisplayValue("test task");

    expect(screen.queryByTestId("todo-item-edit")).not.toBeInTheDocument();
    expect(screen.queryByTestId("todo-item-delete")).not.toBeInTheDocument();
    expect(closeBtn).toBeInTheDocument();

    userEvent.type(input, " edited");

    expect(input.value).toBe("test task edited");

    // close on outside click
    userEvent.click(document.body);

    expect(screen.getByText("test task edited")).toBeInTheDocument();
  });

  it("on close btn click", () => {
    renderWithRedux(<TodoListItem {...defaultProps} />);

    userEvent.click(screen.getByTestId("todo-item-edit"));

    userEvent.type(screen.getByDisplayValue("test task"), " edit");

    userEvent.click(screen.getByTestId("todo-item-close"));

    expect(screen.getByText("test task")).toBeInTheDocument();
  });

  it("render done TodoListItem", () => {
    renderWithRedux(<TodoListItem {...defaultProps} isDone={true} />);

    expect(screen.getByTestId("todo-item-check")).toHaveClass("done");
  });
});
