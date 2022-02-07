import { TodoListFilters } from "../../react/container/TodoList/TodoListFilter/TodoListFilters";
import { render, screen } from "../test-utils";
import { taskTypes } from "../../constants";

describe("TodoListFilters component", () => {
  it("render filter list ALL is default active", () => {
    render(<TodoListFilters />);

    expect(screen.getByText(/View All/).closest("li")).toHaveClass("active");
  });

  it("render filter list, set ACTIVE as filter", () => {
    render(<TodoListFilters activeFilter={taskTypes.ACTIVE} />);

    expect(screen.getByText(/Active/).closest("li")).toHaveClass("active");
  });
});
