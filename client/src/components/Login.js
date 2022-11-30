import React, {useState} from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";


export default function Application() {
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const navigate = useNavigate();


  const login = () => {
    Axios({
      method: "POST",
      data: {
        username: loginUsername,
        password: loginPassword,
      },
      withCredentials: true,
      url: "/login",
    }).then((res) => {
      console.log(res);
      navigate("/users/dashboard");
  });
  };

  return (
    <section>
			<h3>Sdoc</h3>
			<h1>Login</h1>
      <form onSubmit={event => event.preventDefault()} autoComplete="off">
        <div>
          <input
            name="login"
            type="text"
            placeholder="Username"
            value={loginUsername}
            onChange={(event) => setLoginUsername(event.target.value)}
          />
        </div>
        <div>
          <input
            name="login"
            type="text"
            placeholder="Password"
            value={loginPassword}
            onChange={(event) => setLoginPassword(event.target.value)}
          />
        </div>
        <div>
          <button onClick={login}>Login</button>
        </div>
      </form>


			<p>Don't have an account? <a href="/signup">Sign up</a></p>
		</section>
  );
};