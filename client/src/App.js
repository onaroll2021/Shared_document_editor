import React from "react";
// import Axios from "axios";
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
  // const [user, setUser] = useState({});
  // const [data, setData] = useState({});
  // const [state, setState] = useState({
  //   user: {},
  //   documents: []
  // });

  // useEffect(() => {
  // }, []);

  // const fetchData = () => {
  //   Axios({
  //     method: "GET",
  //     // headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  //     url: "/api/users/dashboard",
  //   }).then((res) => {
  //     setState(prev => ({...prev, user:res.data.user, documents:res.data.userDocuments}));
  //     // setState({user:res.data.user, documents:res.data.userDocuments});
  //     console.log(res.data);
  //   });

  // }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to={"/login"} />}></Route>
        <Route
          path="/users"
          element={<Navigate to={"users/dashboard"} />}
        ></Route>
        <Route
          path="/documents/:id"
          element={
            <TextEditor
            // key={state.user._id}
            // email={state.user.email}
            />
          }
        ></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route
          path="users/dashboard"
          element={
            <Dashboard
            // documents={state.documents}
            // fetchData={fetchData}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
