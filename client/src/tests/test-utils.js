import React from "react";
import { createStore } from "redux";
import rootReducer from "../redux/rootReducer";
import { render } from "@testing-library/react";

import { Provider } from "react-redux";


export const renderWithRedux = (
  ui,
  { preloadedState, store = createStore(rootReducer, preloadedState), ...renderOptions } = {}
) => {
  const Wrapper = ({ children }) => {
    return <Provider store={store}>{children}</Provider>;
  };

  return render(ui, { wrapper: Wrapper, ...renderOptions });
};

export * from "@testing-library/react";
