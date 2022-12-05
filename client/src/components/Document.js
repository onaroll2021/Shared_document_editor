import React, { useState } from "react";
import Axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@material-tailwind/react";

export default function Document(props) {
  // const [deleteDocument, setDeleteDocument] = useState(false);
  //const [canDelete, setCanDelete] = useState(false);
  const documentLink = "/documents/" + props.url;
  const navigate = useNavigate();

  // const handleDelete = (e) => {
  //   e.stopPropagation();
  //   setDeleteDocument(true);
  //   Axios({
  //     method: "POST",
  //     data: {
  //       id: props.id,
  //     },
  //     url: "/api/users/delete",
  //   }).then((res) => {
  //     console.log(res);
  //   });
  // };

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

  //disable delete button when view status
  // const vie = viewerArr.map((vie) => vie.username);
  const canDelete = () => {
    // return vie.includes(props.user.username);
    return props.user._id === props.creatorId;
  };

  return (
    <tr
      onClick={() =>
        navigate(documentLink, {
          state: {
            user: props.user,
            creatorId: props.creatorId,
            editorArr: props.editAccess,
          },
        })
      }
      className="items-center p-4 rounded-lg hover:bg-gray-100 text-gray-700 text-sm cursor-pointer"
    >
      <td className="text-right">
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
      </td>
      <td>
        <div className="flex-grow pr-10 truncate">{props.title}</div>
        {/* <p className="pr-5 text-sm">{props.creator}</p>
            <p className="pr-5 text-sm">{editor}</p>
            <p className="pr-5 text-sm">{viewer}</p>
            <p className="pr-5 text-sm">{props.date}</p> */}
      </td>
      <td className="text-sm text-center">{props.creator}</td>
      <td className="text-sm text-center">{editor}</td>
      <td className="text-sm text-center">{viewer}</td>
      <td className="text-sm text-center">{props.date}</td>
      <td className="text-center px-3 py-1.5 my-1.5">
        <Button className='z-10' disabled={!canDelete()} color="red" onClick={(e)=>{props.handleDelete(e, props.id)}}>
          Delete
        </Button>
      </td>
    </tr>
  );
}
