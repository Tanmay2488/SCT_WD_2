import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./Stopwatch.css";

import App from "./Stopwatch";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);