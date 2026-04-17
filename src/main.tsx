import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const App = lazy(() => import("./App"));

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Suspense fallback={<div className="flex h-screen items-center justify-center bg-black" />}>
    <App />
  </Suspense>,
);
