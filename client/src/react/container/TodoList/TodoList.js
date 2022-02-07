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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getTasks({
      filter,
      onSuccess: () => {
        setLoading(false);
      },
      onFail: () => {
        setLoading(false);
      },
    });
  }, [filter, getTasks]);

  const onChangeFilter = (val) => {
    setFilter(val);
  };

  return (
    <Container>
      <TodoListFilters activeFilter={filter} onChange={onChangeFilter} />
      {loading && <div>Loading...</div>}
      {!loading && !tasks.length > 0 && <div>Not have tasks yet</div>}
      {!loading && tasks.map((el) => <TodoListItem key={el.id} {...el} />)}
    </Container>
  );
};

TodoList.propTypes = {};
