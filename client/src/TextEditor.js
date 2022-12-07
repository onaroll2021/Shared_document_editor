import { useCallback, useEffect, useState } from "react";
// import Axios from "axios";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { io } from "socket.io-client";
import { useParams, useLocation } from "react-router-dom";
import Documentheader from "./components/Header-document";
import { GrDocumentSound } from "react-icons/gr";

const SAVE_INTERVAL_MS = 2000;

//  set toolbar
const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  [{ script: "sub" }, { script: "super" }], // superscript/subscript
  [{ font: [] }, { size: ["small", false, "large", "huge"] }], // custom dropdown
  [{ color: [] }, { background: [] }], // dropdown with defaults from theme

  [{ align: [] }, { list: "ordered" }, { list: "bullet" }], //list
  [{ indent: "-1" }, { indent: "+1" }, { direction: "rtl" }], // outdent/indent

  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  ["link", "image", "blockquote", "code-block"], //code,image

  ["clean"], // remove formatting button
];

export default function TextEditor() {
  const { id: documentId } = useParams();
  const [socket, setSocket] = useState();
  const [quill, setQuill] = useState();
  const [showTitle, setShowTittle] = useState();

  const location = useLocation();

  const userEmail = location.state.user.email;
  const userId = location.state.user._id;
  const userName = location.state.user.username;
  const creatorId = location.state.creatorId;
  const editorArr = location.state.editorArr;

  const editPermission = (document, id) => {
    return document.view_edit_access.includes(id);
  };
  // console.log(location);
  // console.log(userEmail);

  //get user information
  // const [user, setUser] = useState({});
  // useEffect(() => {
  //   Axios({
  //     method: "GET",
  //     url: "/api/users/dashboard",
  //   }).then((res) => {
  //     setUser(res.data.user);
  //     console.log(res.data.user);
  //   }).catch((err) => {
  //     console.log(err.message);
  //   });
  // }, []);

  //connect socket
  useEffect(() => {
    const connectSocket = io();
    setSocket(connectSocket);
    return () => {
      connectSocket.disconnect();
    };
  }, []);

  //create event handler- text change
  useEffect(() => {
    if (socket == null || quill == null) return;
    const handler = (delta, oldDelta, source) => {
      if (source !== "user") return;
      socket.emit("send-changes", delta);
    };
    quill.on("text-change", handler);

    return () => {
      quill.off("text-change", handler);
    };
  }, [socket, quill]);

  //create event handler- receive text change
  useEffect(() => {
    if (socket == null || quill == null) return;
    const handler = (delta) => {
      quill.updateContents(delta);
    };
    socket.on("receive-changes", handler);

    return () => {
      socket.off("receive-changes", handler);
    };
  }, [socket, quill]);

  //set document id
  useEffect(() => {
    if (socket == null || quill == null) return;

    socket.once("load-document", (document) => {
      console.log("222document: ", document.title);
      setShowTittle(document.title);

      quill.setContents(document.data);
      if (editPermission(document, userId)) {
        quill.enable();
      }
      console.log("editPermission", editPermission(document, userId));
    });
    // const userEmail = location.state.user.email;
    // console.log(userEmail);
    socket.emit("get-document", documentId, userEmail);
  }, [socket, quill, documentId, userEmail, userId]);

  useEffect(() => {
    if (socket == null || quill == null) return;

    const interval = setInterval(() => {
      socket.emit("save-document", quill.getContents());
    }, SAVE_INTERVAL_MS);

    return () => {
      clearInterval(interval);
    };
  }, [socket, quill]);

  //create editor + toolbar only once
  const wrapperRef = useCallback((wrapper) => {
    if (wrapper == null) return;
    wrapper.innerHTML = "";
    const editor = document.createElement("div");
    wrapper.append(editor);
    const createQuill = new Quill(editor, {
      theme: "snow",
      modules: {
        toolbar: toolbarOptions,
      },
    });
    createQuill.disable();
    createQuill.setText("Loading...");
    setQuill(createQuill);
  }, []);

  return (
    <>
      <Documentheader
        url={documentId}
        userEmail={userEmail}
        userId={userId}
        userName={userName}
        creatorId={creatorId}
        editorArr={editorArr}
        documentTitle={showTitle}
      />
      {/*<button>dark</button>*/}
      <div className="container" ref={wrapperRef}></div>
    </>
  );
}
