import React from "react";
import T from "prop-types";
import { v4 as uuidV4 } from "uuid";
import cl from "classnames";

import s from "./TodoListFilters.module.css";
import { taskTypes } from "../../../../constants";

const filters = [
  {
    id: uuidV4(),
    label: "View All",
    value: taskTypes.ALL,
  },
  {
    id: uuidV4(),
    label: "Active",
    value: taskTypes.ACTIVE,
  },
  {
    id: uuidV4(),
    label: "Completed",
    value: taskTypes.COMPLETED,
  },
];

export const TodoListFilters = ({ onChange, activeFilter = taskTypes.ALL }) => {
  const handleChange = (type) => () => {
    onChange(type);
  };

  return (
    <ul className={s.filters}>
      {filters.map((el) => (
        <li className={cl(s["filters-item"], activeFilter === el.value && s.active)} key={el.id}>
          <button onClick={handleChange(el.value)}>{el.label}</button>
        </li>
      ))}
    </ul>
  );
};

TodoListFilters.propTypes = {
  onChange: T.func,
  activeFilter: T.string,
};
