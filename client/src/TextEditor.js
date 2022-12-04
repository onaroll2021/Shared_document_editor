import { useCallback, useEffect, useState, useContext } from "react";
// import Axios from "axios";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { io } from "socket.io-client";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Documentheader from "./components/Header-document";
import {Context} from "./App";

const SAVE_INTERVAL_MS = 2000;

//  set toolbar
const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote", "code-block"],

  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }], // superscript/subscript
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction
  ["image", "blockquote", "code-block"],
  [{ size: ["small", false, "large", "huge"] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],

  ["clean"], // remove formatting button
];

export default function TextEditor() {

  const info = useContext(Context);
  const { id: documentId } = useParams();
  const [socket, setSocket] = useState();
  const [quill, setQuill] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  const setRequiredDirectURL = info.setRequiredDirectURL;

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
      quill.setContents(document);
      quill.enable();
    });

    socket.emit("get-document", documentId);
  }, [socket, quill, documentId]);

  useEffect(() => {
    if (socket == null || quill == null) return;

    const interval = setInterval(() => {
      socket.emit("save-document", quill.getContents());
    }, SAVE_INTERVAL_MS);

    return () => {
      clearInterval(interval);
    };
  }, [socket, quill]);

  useEffect(() => {
    setRequiredDirectURL("");
  }, [])

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

  if (info.state.loginStatus) {
    return (
      <>
        <Documentheader url={documentId} />
        <div className="container" ref={wrapperRef}></div>
      </>
    );
  } else {
    setRequiredDirectURL(location.pathname.replace("/documents/", ""));
    navigate('/login');
  }
}
