import axios from "axios";
import { useEffect, useContext, useState } from "react";
import { IconButton, Button, Input, Checkbox } from "@material-tailwind/react";
import { Context } from "../App";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FcCandleSticks, FcElectricalSensor } from "react-icons/fc";

export default function Documentheader(props) {

  const info = useContext(Context);
  // console.log("info.state", info.state)
  const sent = info.state.sent;
  const setSent = info.setSent;
  const text = info.state.text;
  const setText = info.setText;
  let location = useLocation();
  // console.log("location", location)
  
  // console.log("neededURL", neededURL);
  const [title, setTitle] = useState();
  const[shareWithEmail, setShareWithEmail] = useState("");
  const [changeTittle, setChangeTittle] = useState(false);
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();
  const  neededDocument = props.neededDocument;
  // console.log("neededDoc", neededDocument) 

  const clickCheckbox = () => {
    setChecked(!checked);
  };
  const canShare = () => {
    return (neededDocument['creator']['_id'] === info['state']['data']['user']['_id']) ? true : false;
  }
  const canChangeTitle = () => {
    const viewEditAccessIds = neededDocument['view_edit_access'];
    const currentUserId = info.state.data.user._id;
    if (viewEditAccessIds.includes(currentUserId)) {
      return true;
    } else {
      return false;
    }
  }

  const handleSend = async () => {
    setShareWithEmail("");
    setChecked(false);
    const sendFromEmail = info.state.data.user.email;
    const sendToEmail = shareWithEmail;
    const url = neededDocument.URL;
    const documentUrl = `http://localhost:3000/documents/${props.url}`;
    try {
      await axios.post("/api/send_mail", {
        sendFromEmail: sendFromEmail,
        sendToEmail: sendToEmail,
        text: documentUrl,
        url: url,
        viewOnly: checked,
        senderName: info.state.data.user.name,
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
            <fieldset
                className="mx-5 md:mx-10 flex items-center px-5 py-2 bg-gray-100 text-gray-600 rounded-lg focus-within:text-gray-600 focus-within:shadow-md"
                disabled={!canChangeTitle()}
              >
              <Input
                label="Tittle"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              </fieldset>
            </form>
          </>
        ) : (
          <h1 className="ml-2 mt-3 text-gray-700 text-2xl">{title}</h1>
        )}
      </div>

      <div className="flex flex-end space-x-2">
      <>
            <form
              onSubmit={event => event.preventDefault()} 
              autoComplete="off"
            >
              <fieldset
                className="mx-5 md:mx-10 flex items-center px-5 py-2 bg-gray-100 text-gray-600 rounded-lg focus-within:text-gray-600 focus-within:shadow-md" 
                disabled={!canShare()}
              >
                <Input
                  label="Share with"
                  name="share"
                  type="text"
                  value={shareWithEmail}
                  onChange={(event) => setShareWithEmail(event.target.value)}
                />
                <div className='flex items-center'>
                  <Checkbox
                    checked={checked}
                    value={checked}
                    onChange={clickCheckbox}
                    label={"View Only"}
                  />
                </div>
                <Button
                  className="mx-3"
                  onClick={handleSend}
                >
                  Share
                </Button>
              </fieldset>
            </form>
          </>
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
