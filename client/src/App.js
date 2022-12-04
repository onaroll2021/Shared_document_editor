import TextEditor from "./TextEditor";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState, createContext } from "react";
import useAppData from "./hooks/useAppData";

export const Context = createContext(); 

//create App component
function App() {
  const info = useAppData();

  return (
    <Context.Provider value={info}>
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to={"/login"} />}></Route>
        <Route path="/documents/:id" element={<TextEditor />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="users/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
    </Context.Provider>
  );
}

export default App;
