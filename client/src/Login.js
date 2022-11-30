import {useState} from 'react';
import axios from 'axios';

export default function Login() {
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const login = () => {
    axios({
      method: "post",
      data: {
        username: loginUsername,
        password: loginPassword
      },
      withCredentials: true,
      url: "http://localhost:3000/login",
    }).then((res) => console.log(res)).catch((error) => console.error(error.response.data))
  };

  return (
    <div>
      <h1>Login</h1>
      <input placeholder='Username' onChange={(e => setLoginUsername(e.target.value))} />
      <input placeholder='password' onChange={(e => setLoginPassword(e.target.value))} />
      <button onClick={login}>Submit</button>
    </div>
  )
}
