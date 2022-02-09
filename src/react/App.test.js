import {
  renderWithRedux,
  screen,
  waitForElementToBeRemoved,
  waitFor,
  fireEvent,
} from "../test-utils";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";

import App from "./App";
import configureStore from "../redux/configureStore";
import { server } from "../mocks/server";

const store = configureStore();

describe("App component", () => {
  const setup = () => {
    return renderWithRedux(<App />, { store });
  };

  const renderTasksList = async () => {
    setup();
    
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();

    await waitForElementToBeRemoved(() => screen.queryByText(/Loading.../i));
  };

  it("Render tasks List with all tasks", async () => {
    await renderTasksList();

    expect(screen.getByText("Done task")).toBeInTheDocument();
    expect(screen.getByText("not done task")).toBeInTheDocument();
  });

  it("Render only active tasks", async () => {
    await renderTasksList();
    userEvent.click(screen.getByText(/active/i));

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
    await waitForElementToBeRemoved(() => screen.queryByText(/Loading.../i));

    expect(screen.getByTestId(/tasks-list/i)).toBeInTheDocument();
    expect(screen.queryByText("Done task")).not.toBeInTheDocument();
    expect(screen.getByText("not done task")).toBeInTheDocument();
  });

  it("Render only Completed tasks", async () => {
    await renderTasksList();
    userEvent.click(screen.getByText(/Completed/i));

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();

    await waitForElementToBeRemoved(() => screen.queryByText(/Loading.../i));

    expect(screen.getByTestId(/tasks-list/i)).toBeInTheDocument();
    expect(screen.getByText("Done task")).toBeInTheDocument();
    expect(screen.queryByText("not done task")).not.toBeInTheDocument();
  });

  it("Render empty list", async () => {
    server.use(
      rest.get(`${process.env.REACT_APP_API_URL}/v1/tasks`, (req, res, ctx) => {
        return res(ctx.json([]));
      })
    );
    await renderTasksList();

    expect(screen.getByText(/Not have tasks/i)).toBeInTheDocument();
  });

  it("Add task", async () => {
    await renderTasksList();
    const addTaskInput = screen.getByPlaceholderText("What needs to be done?");

    userEvent.type(addTaskInput, "New task");
    fireEvent.submit(addTaskInput);

    await waitFor(() => screen.findByText("New task"));
  });

  it("Edit task => content", async () => {
    await renderTasksList();
    const taskForEdit = screen.getByText("Task for edit").closest("li");
    const editBtn = taskForEdit.querySelector('button[data-testid="todo-item-edit"]');

    userEvent.click(editBtn);
    userEvent.type(screen.getByDisplayValue("Task for edit"), " was edited");

    // close on outside click
    userEvent.click(document.body);

    expect(screen.getByText(/was edited/i)).toBeInTheDocument();
  });

  it("Edit task => isDone", async () => {
    await renderTasksList();
    const taskForEdit = screen.getByText("Task for check").closest("li");
    const checkBtn = taskForEdit.querySelector('button[data-testid="todo-item-check"]');

    userEvent.click(checkBtn);

    await waitFor(() =>
      expect(screen.queryByText("Task for check").closest("li")).toHaveClass("done")
    );
  });

  it("Delete task", async () => {
    await renderTasksList();

    const taskForEdit = screen.getByText("Task fro delete").closest("li");
    const deleteBtn = taskForEdit.querySelector('button[data-testid="todo-item-delete"]');

    userEvent.click(deleteBtn);

    await waitForElementToBeRemoved(() => screen.queryByText("Task fro delete"));

    expect(screen.queryByText("Task fro delete")).not.toBeInTheDocument();
  });
});
