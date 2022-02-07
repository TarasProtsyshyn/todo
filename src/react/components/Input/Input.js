import React from "react";

import s from "./Input.module.css";

export const Input = ({ ...rest }) => {
  return <input className={s.input} {...rest} />;
};
