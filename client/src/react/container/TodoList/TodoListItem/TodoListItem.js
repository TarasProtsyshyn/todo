import React, { useRef, useState } from "react";
import T from "prop-types";
import cl from "classnames";

import s from "./TodoListItem.module.css";

import { ReactComponent as Check } from "../../../../assets/icons/check.svg";
import { ReactComponent as Delete } from "../../../../assets/icons/delete.svg";
import { ReactComponent as Edit } from "../../../../assets/icons/edit.svg";
import { ReactComponent as Close } from "../../../../assets/icons/close.svg";

import { Input } from "../../../components/Input/Input";
import { useOutsideClickHandler, useReduxAction } from "../../../../hooks";
import { editTaskAction, deleteTaskAction } from "../../../../redux/tasks/tasksActions";

export const TodoListItem = ({ id, content, isDone }) => {
  const editTask = useReduxAction(editTaskAction);
  const deleteTask = useReduxAction(deleteTaskAction);

  const ref = useRef(null);
  const [edit, setEdit] = useState(false);
  const [task, setTask] = useState(content);

  const toggleEdit = () => setEdit((prev) => !prev);
  const onEdit = (e) => setTask(e.target.value);

  const onClose = () => {
    toggleEdit();
    setTask(content);
  };

  const onSave = (e) => {
    if (edit) {
      editTask({ id, content: task });
      toggleEdit();
    }
  };

  const handleClick = (e) => {
    if (e.keyCode === 13) {
      onSave();
    }
  };

  const onOutsideClick = () => {
    onSave();
  };

  const onDelete = () => {
    deleteTask({ id });
  };

  const onCheck = () => {
    console.log("test");
    editTask({ id, isDone: !isDone });
  };

  useOutsideClickHandler(ref, onOutsideClick);

  return (
    <li ref={ref} className={cl(s.item, isDone && s.done, edit && s.edit)}>
      {!edit && (
        <button onClick={onCheck} className={cl(s.check, s.btn, isDone && s.done)}>
          {isDone && <Check height={16} width={16} />}
        </button>
      )}
      {edit ? (
        <Input onKeyDown={handleClick} onChange={onEdit} value={task} autoFocus />
      ) : (
        <span className={cl(s.content, isDone && s.done)}>{task}</span>
      )}
      {edit ? (
        <button onClick={onClose} className={s.btn}>
          <Close height={20} width={20} />
        </button>
      ) : (
        <>
          <button disabled={isDone} onClick={toggleEdit} className={s.btn}>
            <Edit height={20} width={20} />
          </button>
          <button onClick={onDelete} className={s.btn}>
            <Delete height={20} width={20} />
          </button>
        </>
      )}
    </li>
  );
};

TodoListItem.defaultProps = {
  content: "test 3",
  createdAt: "2022-02-04T15:05:36.065Z",
  updatedAt: "2022-02-04T15:05:36.065Z",
  id: "61fd40c04e1f53917ac2a0e9",
  isDone: false,
};
TodoListItem.propTypes = {
  id: T.string,
  content: T.string,
  isDone: T.bool,
};
