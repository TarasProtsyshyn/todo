import React, { useState } from "react";

import s from "./AddNewTask.module.css";
import { Container } from "../../components/Container/Container";
import { Input } from "../../components/Input/Input";
import { useReduxAction } from "../../../hooks";
import { addTaskAction } from "../../../redux/tasks/tasksActions";

export const AddNewTask = () => {
  const addTask = useReduxAction(addTaskAction);

  const [newTask, setNewTask] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setNewTask(e.target.value);
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!newTask) {
      setError("Task can't be empty");
    }

    addTask(newTask);
    setNewTask("");
  };

  return (
    <Container className={s["add-new-task"]}>
      <form onSubmit={handleSubmit}>
        <Input
          onChange={handleChange}
          value={newTask}
          name="new-task"
          placeholder="What needs to be done?"
        />
        {error && <span className={s.error}>{error}</span>}
      </form>
    </Container>
  );
};

AddNewTask.propTypes = {};
