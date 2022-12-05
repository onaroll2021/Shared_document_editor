import React, { useState } from "react";
import Axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@material-tailwind/react";

export default function Document(props) {
  const [deleteDocument, setDeleteDocument] = useState(false);
  //const [canDelete, setCanDelete] = useState(false);
  const documentLink = "/documents/" + props.url;
  const navigate = useNavigate();

  const handleDelete = (e) => {
    e.stopPropagation();
    setDeleteDocument(true);
    Axios({
      method: "POST",
      data: {
        id: props.id,
      },
      url: "/api/users/delete",
    }).then((res) => {
      console.log(res);
    });
  };

  //check deleteDocument state first

  let editor = "";
  const editorArr = props.editAccess.filter(
    (editor) => editor.username !== props.creator
  );
  if (editorArr) {
    editorArr.forEach((e) => {
      editor = editor + e.username + " ";
    });
    editor.trimEnd();
  }
  let viewer = "";
  const viewerArr = props.viewAccess;
  if (viewerArr) {
    viewerArr.forEach((e) => {
      viewer = viewer + e.username + " ";
    });
    viewer.trimEnd();
  }

  const vie = viewerArr.map((vie) => vie.username);

  const canDelete = () => {
    return vie.includes(props.user.username);
  };

  console.log("viewerArr", vie);
  console.log("username", props.user.username);

  return !deleteDocument ? (
    <div
      onClick={() =>
        navigate(documentLink, {
          state: {
            user: props.user,
            creatorId: props.creatorId,
            editorArr: props.editAccess,
          },
        })
      }
      className="flex items-center p-4 rounded-lg hover:bg-gray-100 text-gray-700 text-sm cursor-pointer"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="black"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
        />
      </svg>

      <p className="flex-grow pl-5 w-10 pr-10 truncate">{props.title}</p>
      <p className="pr-5 text-sm">{props.creator}</p>
      <p className="pr-5 text-sm">{editor}</p>
      <p className="pr-5 text-sm">{viewer}</p>
      <p className="pr-5 text-sm">{props.date}</p>

      <Button disabled={canDelete()} color="red" onClick={handleDelete}>
        Delete
      </Button>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
        />
      </svg>
    </div>
  ) : (
    <Link to="#" />
  );
}
