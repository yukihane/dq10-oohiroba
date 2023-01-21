import React from "react";
import { createRoot } from "react-dom/client";
import { Main } from "./Main";

const initialize = () => {
  const removeAllChildNodes = (parent: Node) => {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  };

  const head = document.getElementsByTagName("head")[0];
  removeAllChildNodes(head);
  const body = document.getElementsByTagName("body")[0];
  removeAllChildNodes(body);

  const root = createRoot(body);
  root.render(<Main />);
};

initialize();
