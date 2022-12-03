import { useCallback, useEffect, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";
import axios from "axios";
import Documentheader from "./components/Header-document";

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

export default function TextEditor(props) {
  const { id: documentId } = useParams();
  const [socket, setSocket] = useState();
  const [quill, setQuill] = useState();

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
    console.log("props.email", props.email);
    const userEmail = props.email;
    socket.emit("get-document", documentId, userEmail);
  }, [socket, quill, documentId, props.email]);

  useEffect(() => {
    if (socket == null || quill == null) return;

    const interval = setInterval(() => {
      socket.emit("save-document", quill.getContents());
    }, SAVE_INTERVAL_MS);

    return () => {
      clearInterval(interval);
    };
  }, [socket, quill]);

  //set state for email send
  const [sent, setSent] = useState(false);
  const [text, setText] = useState("");

  const handleSend = async () => {
    setSent(true)
    try {
      await axios.post("/send_mail", {
        text
      })
    } catch (error) {
      console.log(error)
    }
  }

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
  <div>
    {!sent ? (
        <form onSubmit={handleSend}><input type="text" value={text} onChange={(e) => {
          setText(e.target.value)
        }} />
        <button type="submit" >send email</button>
        </form>
    ) : (
      <h1> Email sent</h1>
    )}

  <div className="container" ref={wrapperRef}></div>
  </div>
  );
}
