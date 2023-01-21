import React from "react";
import { createRoot } from "react-dom/client";
import { Popup } from "./Popup";

const removeAllChildNodes = (parent: Node) => {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
};

const html = document.getElementsByTagName("html")[0];
removeAllChildNodes(html);

const head = document.createElement("head");
html.appendChild(head);

const body = document.createElement("body");
html.appendChild(body);

const root = createRoot(body);
root.render(<Popup />);

// const container = document.getElementById("root");
// // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
// const root = createRoot(container!);
// root.render(<Popup />);
