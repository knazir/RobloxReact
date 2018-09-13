import React from "react";
import ReactDOM from "react-dom";
import ReduxPromise from "redux-promise";
import ReduxThunk from "redux-thunk";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";
import reducers from "./reducers";

const createStoreWithMiddleware = applyMiddleware(ReduxThunk, ReduxPromise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router>
      <App/>
    </Router>
  </Provider>,
  document.querySelector("#root")
);
