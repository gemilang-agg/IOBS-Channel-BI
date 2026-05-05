import React from "react";
import ReactDOM from "react-dom/client";
import "@/index.css";
import App from "@/App";

// Suppress benign Recharts warning that fires before parent layout is measured.
// The warning is purely cosmetic and Recharts re-renders correctly once layout settles.
const originalWarn = console.warn;
console.warn = (...args) => {
  const first = args[0];
  if (
    typeof first === "string" &&
    first.includes("The width") && first.includes("of chart should be greater than 0")
  ) {
    return;
  }
  originalWarn(...args);
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
