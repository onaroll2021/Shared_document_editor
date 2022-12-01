import React from "react";

export default function Document(props) {
  const documentLink = "http://localhost:3000/documents/" + props.url;
  return (
    <ul>
      <a href={documentLink}>{props.id}</a>
      <button>delete</button>
    </ul>
  );
};