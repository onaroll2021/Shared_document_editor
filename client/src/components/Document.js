import React from "react";

export default function Document(props) {
  const documentLink = "/documents/" + props.url;
  return (
    <ul>
      <a href={documentLink}>{props.id}</a>
      <button>delete</button>
    </ul>
  );
};