import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { TASKS } from "./json.js";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App tasks={TASKS} />
  </React.StrictMode>
);
