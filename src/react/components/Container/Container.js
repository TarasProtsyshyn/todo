import React from "react";
import T from "prop-types";
import cl from "classnames";

import s from "./Container.module.css";

export const Container = ({ children, className }) => {
  return <div className={cl(s.container, className)}>{children}</div>;
};

Container.propTypes = {
  className: T.string,
};
