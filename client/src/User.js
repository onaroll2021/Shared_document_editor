import {useState} from 'react';
import axios from 'axios';

export default function User() {
  const [data, setData] = useState(null);

  const getUser = () => {
    axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:3000/user",
    }).then((res) => {
      setData(res.data);
      console.log(res.data)
    });
  };

  return (
    <div>
      <h1>Get User</h1>
      <button onClick={getUser}>Submit</button>
      {data ? <h1>Welcome Back {data.username}</h1> : null}
    </div>
  )
}