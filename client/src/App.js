import React, { useEffect, useState } from "react";
import Axios from "axios";
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

// const generateRandomString = () => {
//   return Math.random().toString(36).substring(2, 14);
// };

//create App component
function App() {

  const [user, setUser] = useState({});

  useEffect(() => {
    Axios({
      method: "GET",
      url: "/api/users/dashboard",
    }).then((res) => {
      setUser(res.data.user);
    });
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Navigate to={"/login"} />}
        ></Route>
        <Route path="/documents/:id" element={<TextEditor
          key={user._id}
          email={user.email}
        />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="users/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
