import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "@semi-bot/semi-theme-tooyea/semi.min.css";
import "./index.css";

// const body = document.body;
// if (body.hasAttribute("theme-mode")) {
//   body.removeAttribute("theme-mode");
// } else {
//   body.setAttribute("theme-mode", "dark");
// }

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
);
