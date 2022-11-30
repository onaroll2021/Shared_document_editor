import TextEditor from "./TextEditor";
import Dashboard from "./Dashboard";
import Login from "./Login";
import User from "./User";
import Register from "./Register";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

const generateRandomString = () => {
  return Math.random().toString(36).substring(2, 14);
};

//create App component
function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Navigate to={`/documents/${generateRandomString()}`} />}
        ></Route>
        <Route path="/documents/:id" element={<TextEditor />}></Route>
        <Route path="/users/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user" element={<User />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
