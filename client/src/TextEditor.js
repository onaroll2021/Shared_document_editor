import { useCallback, useEffect, useState, useContext } from "react";
// import Axios from "axios";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { io } from "socket.io-client";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Documentheader from "./components/Header-document";
import { Context } from "./App";
import update from 'immutability-helper';

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
  ["image", "blockquote", "code-block"], //code,image

  ["clean"], // remove formatting button
];

export default function TextEditor(props) {
  const info = useContext(Context);
  const setData = info.setData;
  const setRequiredDirectURL = info.setRequiredDirectURL;
  const location = useLocation();
  const navigate = useNavigate();
  console.log("state is ", info.state);
  const username = info.state.data.user.username;
  const { id: documentId } = useParams();
  const [socket, setSocket] = useState();
  const [quill, setQuill] = useState();

  // console.log("location.state", location.state);

  const neededURL = location.pathname.replace("/documents/", "");
  const searchDocuments = info.state.data.documents;
  const currentUserId = info.state.data.user._id;
  const searchNeededDocument = function(neededURL, searchDocuments) {
    console.log("searchDocuments", searchDocuments)
    for (const document of searchDocuments) {
      if (document.URL === neededURL) {
        return document;
      }
    }
    return {};
  };
  let neededDocument = searchNeededDocument(neededURL, searchDocuments);
  const userEmail = info.state.data.user.email;
  console.log("neededDocument", neededDocument)
  const editPermission = (document, userId) => {
    console.log("document", document)
    return document.view_edit_access.includes(userId);
  };

  const updateDocState = (document) => {
    const newDocumentsState = info.state.data.documents.map( arrDoc => {
      if (arrDoc.URL === document.URL) {
        const newArrDoc = update(arrDoc, {
          $set: document
        })
        return newArrDoc;
      }
      return arrDoc;
    })
    setData({"user": info.state.data.user, "documents": newDocumentsState});
  }

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
      // console.log("document", document)
      quill.setContents(document.data);
      updateDocState(document);
      if (editPermission(document, currentUserId)) {
        quill.enable();
      }
    });
    socket.emit("get-document", documentId, userEmail)
  }, [socket, quill, documentId, userEmail]);

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
  }, []);

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
  if(info.state.loginStatus) {
    return (
      <>
        <Documentheader
          url={documentId}
          creator={info.state.data.user._id}
        />
        <div className="container" ref={wrapperRef}></div>
      </>
    );
  } else {
    setRequiredDirectURL(location.pathname.replace("/documents/", ""));
    navigate("/login")
  }
}
