import axios from "axios";
import React, { useState, useEffect } from "react";
import { IconButton, Button, Input } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

export default function Documentheader(props) {
  const [sent, setSent] = useState(false);
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [changeTittle, setChangeTittle] = useState(false);
  const navigate = useNavigate();
  const handleSend = async (e) => {
    setSent(true);
    try {
      await axios.post("api/send_mail", {
        text,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleEnterPress = () => {
    setChangeTittle(true);
    axios({
      method: "POST",
      // withCredentials: true,
      data: {
        title: title,
        URL: props.url,
      },
      url: "/api/users/changeTitle",
    }).then((res) => {
      console.log(res);
    });
  };

  return (
    <div className="flex items-center justify-between sticky z-50 top-0 px-4 py-2 shadow-md bg-white">
      <div className="flex space-x-5">
        <IconButton
          className="h-20 w-20 mt-1"
          onClick={() => navigate("/users/dashboard")}
        >
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

        {!changeTittle ? (
          <>
            {" "}
            <h1 className="ml-2 mt-3 text-gray-700 text-2xl">Title</h1>
            <form
              className="mx-5 md:mx-10 flex items-center px-5 py-2 bg-gray-100 text-gray-600 rounded-lg focus-within:text-gray-600 focus-within:shadow-md"
              onSubmit={handleEnterPress}
            >
              <Input
                label="Tittle"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </form>
          </>
        ) : (
          <h1 className="ml-2 mt-3 text-gray-700 text-2xl">{title}</h1>
        )}
      </div>

      <div className="flex flex-end">
        {!sent ? (
          <form className="flex flex-end" onSubmit={handleSend}>
            <Input
              label="Share message"
              className="mr-3 mt-1"
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <Button className="ml-2" type="submit">
              Share
            </Button>
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
