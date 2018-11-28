import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

import App from "./components/App/App";
import registerServiceWorker from "./util/registerServiceWorker";

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
