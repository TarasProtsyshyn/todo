import { applyMiddleware, compose, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";

import rootReducer from "./rootReducer";
import rootSaga from "./rootSaga";

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(preloadedState) {
  // Set saga middleware into single enhancer
  const middlewareEnhancer = applyMiddleware(sagaMiddleware);

  // Compose all enhancer into single function
  const enhancers = [middlewareEnhancer];

  const composeFunction = process.env.NODE_ENV !== "production" ? composeWithDevTools : compose;
  const composedEnhancers = composeFunction(...enhancers);

  // Create store with preloaded state and enhancers
  const store = createStore(rootReducer, preloadedState, composedEnhancers);

  // Run all sagas
  sagaMiddleware.run(rootSaga);

  return store;
}
