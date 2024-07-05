import React from "react";
import { createRoot } from 'react-dom/client';
import 'regenerator-runtime/runtime'

import { App } from "./App";

const container = document.getElementById("root");

if (container) {
  const root = createRoot(container);
  root.render(<App />);
} else {
  console.error('Root container is missing in the DOM.');
}