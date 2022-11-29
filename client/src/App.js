import TextEditor from "./TextEditor";
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
      </Routes>
    </Router>
  );
}

export default App;
