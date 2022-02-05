import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { Container } from "../../components/Container/Container";
import { TodoListFilters } from "./TodoListFilter/TodoListFilters";
import { TodoListItem } from "./TodoListItem/TodoListItem";
import { taskTypes } from "../../../constants";
import { useReduxAction } from "../../../hooks";
import { getTasksAction } from "../../../redux/tasks/tasksActions";

export const TodoList = () => {
  const tasks = useSelector((state) => state.tasks.data);
  const getTasks = useReduxAction(getTasksAction);
  const [filter, setFilter] = useState(taskTypes.ALL);

  useEffect(() => {
    getTasks({ filter });
  }, [filter, getTasks]);

  const onChangeFilter = (val) => {
    setFilter(val);
  };

  return (
    <Container>
      <TodoListFilters activeFilter={filter} onChange={onChangeFilter} />
      {tasks.map((el) => (
        <TodoListItem key={el.id} {...el} />
      ))}
    </Container>
  );
};

TodoList.propTypes = {};
