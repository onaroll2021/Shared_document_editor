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
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to={"/login"} />}></Route>
        <Route path="/documents/:id" element={<TextEditor />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="users/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
