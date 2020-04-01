import React from "react";
import { AppRegistry } from "react-native";
import App from "./App";

import { Provider } from "react-redux";
import { createStore } from "redux";
import reducer from "./src/core/reducer";

const store = createStore(reducer);

const MyApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerComponent("SnapSniper", () => MyApp);
