import React from "react";

export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = (props) => (
  <button {...props} className={`px-4 py-2 rounded-md shadow ${props.className || ""}`}>
    {props.children}
  </button>
);