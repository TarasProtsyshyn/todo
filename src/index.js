import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./react/App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import configureStore from "./redux/configureStore";

const store = configureStore();

function main() {
  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>,
    document.getElementById("root")
  );
}

main();

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
