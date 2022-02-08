import React from "react";

import cl from "./Button.module.css";

export const Button = ({ children, ...rest }) => {
  return (
    <button className={cl.btn} {...rest}>
      {children}
    </button>
  );
};
