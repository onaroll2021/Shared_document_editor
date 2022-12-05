import { useState } from "react";

export default function useAppData () {
  const [state, setState] = useState({
    loginUsername: "",
    loginPassword: "",
    loginStatus: false,
    data: {
      documents: [], 
      user: {},
    },
    sent: false,
    text: "",
    title: false,
    newUsername: "",
    newEmail: "",
    newPassword: "",
    requiredDirectURL: "",
  });
  const setLoginUsername = loginUsername => {
    return setState({ ...state, loginUsername })
  }
  const setLoginPassword = loginPassword => {
    return setState({ ...state, loginPassword })
  }
  const setLoginStatus = loginStatus => {
    return setState({ ...state, loginStatus })
  }
  const setData = data => {
    return setState({ ...state, data })
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
    return setState({ ...state, newUsername })
  }
  const setNewEmail = newEmail => {
    return setState({ ...state, newEmail })
  }
  const setNewPassword = newPassword => {
    return setState({ ...state, newPassword })
  }
  const setRequiredDirectURL = requiredDirectURL => {
    return setState({ ...state, requiredDirectURL})
  }
  return {
    state,
    setState,
    setLoginUsername,
    setLoginPassword,
    setLoginStatus,
    setData,
    setSent,
    setText,
    setTitle,
    setNewUsername,
    setNewEmail,
    setNewPassword,
    setRequiredDirectURL
  }
} 