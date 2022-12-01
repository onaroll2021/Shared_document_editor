import React, {useState} from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Application() {
  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const navigate = useNavigate();

  const signUp = () => {
    Axios({
      method: "POST",
      data: {
        username: newUsername,
        email: newEmail,
        password: newPassword,
      },
      withCredentials: true,
      url: "/api/signup",
    }).then((res) => {
      console.log(res);
      navigate("/users/dashboard");
    });
  };

  return (
    <section>
			<h3>Sdoc</h3>
			<h1>Sign up</h1>
      <form onSubmit={event => event.preventDefault()} autoComplete="off">
      <div>
          <input
            name="signup"
            type="text"
            placeholder="username"
            value={newUsername}
            onChange={(event) => setNewUsername(event.target.value)}
          />
        </div>
        <div>
          <input
            name="signup"
            type="text"
            placeholder="Email"
            value={newEmail}
            onChange={(event) => setNewEmail(event.target.value)}
          />
        </div>
        <div>
          <input
            name="signup"
            type="text"
            placeholder="Password"
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
          />
        </div>
        <div>
          <button onClick={signUp}>Sign Up</button>
        </div>
      </form>


			<p>Already have an account? <a href="/login">Login</a></p>
		</section>
  );
};