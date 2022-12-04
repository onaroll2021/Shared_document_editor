import axios from "axios";
import { useEffect, useContext, useState } from "react";
import { IconButton, Button, Input } from "@material-tailwind/react";
import { Context } from "../App";
import { useLocation } from "react-router-dom";

export default function Documentheader(props) {


  const info = useContext(Context);
  const sent = info.state.sent;
  const setSent = info.setSent;
  const text = info.state.text;
  const setText = info.setText;
  let location = useLocation();
  console.log("location", location);
  const neededURL = location.pathname.replace("/documents/", "");
  console.log("needeURL", neededURL)
  
  // const url = info.state.data.user

  const documents = info.state.data.userDocuments
  // userDocument array
  const findDoc = () =>  {
    const shrinkedURL = document.URL.replace("http://localhost:3000/documents/", "");
    for (const document of documents ) {
      if ( shrinkedURL == props.url ) {
        return document;
      } else {
        return null;
      }
    }
  }
  const requireDoc = findDoc();
  console.log("requireDoc", requireDoc)
  const [title, setTitle] = useState();



  const handleSend = async() => {
    setSent(true);
    try {
      await axios.post("/api/send_mail", {
        text,
      });
    } catch (error) {
      console.error(error);
    }
  };

  // useEffect(() => {
  //   axios({
  //     method: "GET",
  //     // withCredentials: true,
  //     url: `/api/documents/${props.url}`,
  //   }).then((res) => {
  //     setData(res.data);
  //   });
  // }, []);

  return (
    <div className="flex items-center justify-between sticky z-50 top-0 px-4 py-2 shadow-md bg-white">
      <div className="flex space-x-5">
        <IconButton className="h-20 w-20 mt-1">
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
              d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
            />
          </svg>
        </IconButton>

        {!title ? (
          <div>
            {" "}
            <h1 className="ml-2 mt-3 text-gray-700 text-2xl">Title</h1>
            <div className="mx-5 md:mx-10 flex items-center px-5 py-2 bg-gray-100 text-gray-600 rounded-lg focus-within:text-gray-600 focus-within:shadow-md">
              <Input 
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}/>
            </div>
          </div>
        ) : (
          <h1>XXXX</h1>
        )}
      </div>

      <div className="flex flex-end space-x-2">
        {!sent ? (
          <form onSubmit={handleSend}>
            <Input
              type="text"
              value={title}
              onChange={(e) => setText(e.target.value)}
            />
            <Button type="submit">Share</Button>
          </form>
        ) : (
          <h1>Email Sent</h1>
        )}
        <img
          loading="lazy"
          className="cursor-pointer h-12 w-12 rounded-full ml-2"
          alt=""
          src="https://c8.alamy.com/comp/2AE4838/profile-of-a-teenage-indian-boy-looking-at-outsides-2AE4838.jpg"
        />
      </div>
    </div>
  );
}
