import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import { Context } from "../App";
import Axios from "axios";

export default function Document(props) {
  const documentLink = "/documents/" + props.url;
  const navigate = useNavigate();
  const info = useContext(Context);
  const documents = info.state.data.documents;
  const setDocuments = info.setDocuments;
  const user = info.state.data.user;
  const setData= info.setData;

  const handleDelete = (e) => {
    e.stopPropagation();
    Axios({
      method: "POST",
      data: {
        id: props.id,
        user: user,
      },
      url: "/api/users/delete"
    }).then((res) => {
      console.log("res.data", res.data);
      setData(res.data);
    })
  };
  const deleteAccess = () => {
    if(user.username === props.creator) {
      return true;
    } else {
      return false;
    }
  }
  return (
    <tr
      onClick={() => navigate(documentLink, { state: { user: props.user } })}
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
      </td>
      
      <td className="text-center text-sm">{props.creator}</td>
      <td className="text-center text-sm"></td>
      <td className="text-center text-sm"></td>
      <td className="text-center text-sm">{props.date}</td>
      <td className="text-center px-3 py-1.5 my-1.5">
      <Button color="red" disabled={!deleteAccess()} onClick={handleDelete}>Delete</Button>
        </td>
      </tr>
  );
}
