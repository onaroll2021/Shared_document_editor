import { useState } from "react";

export default function useAppData () {
  const [state, setState] = useState({
    loginUsername: "",
    loginPassword: "",
    documents: [],
    user: [], 
    /*data:{
      userDocuments: findDocument, 
      user: req.user, user includes 
    }*/
    sent: false,
    text: "",
    title: false,
    newUsername: "",
    newEmail: "",
    newPassword: "",
  });
  const setLoginUsername = loginUsername => {
    return setState({ ...state, loginUsername })
  }
  const setLoginPassword = loginPassword => {
    return setState({ ...state, loginPassword })
  }
  const setUser = user => {
    return setState({ ...state, user })
  }
  const setDocuments = documents => {
    return setState({ ...state, documents })
  }
  const setSent = sent => {
    return setState({ ...state, sent })
  }
  const setText = text => {
    return setState({ ...state, text })
  }
  const setTitle = title => {
    return setState({ ...state, title })
  }
  const setNewUsername = newUsername => {
    return setNewUsername({ ...state, newUsername })
  }
  const setNewEmail = newEmail => {
    return setNewEmail({ ...state, newEmail })
  }
  const setNewPassword = newPassword => {
    return setNewPassword({ ...state, newPassword })
  }
  return {
    state,
    setLoginUsername,
    setLoginPassword,
    setUser,
    setDocuments,
    setSent,
    setText,
    setTitle,
    setNewUsername,
    setNewEmail,
    setNewPassword,
  }
} 