import {useState} from 'react';
import axios from 'axios';

export default function Register() {
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const register = () => {
    axios({
      method: "post",
      data: {
        username: registerUsername,
        email: registerEmail,
        password: registerPassword
      },
      withCredentials: true,
      url: "http://localhost:3000/register",
    }).then((res) => console.log(res));
  };
  

  return (
    <div>
      <h1>Register</h1>
      <input placeholder='username' onChange={(e => setRegisterUsername(e.target.value))} />
      <input placeholder='email' onChange={(e => setRegisterEmail(e.target.value))} />
      <input placeholder='password' onChange={(e => setRegisterPassword(e.target.value))} />
      <button onClick={register}>Submit</button>
    </div>
  )
}
