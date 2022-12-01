import React, { useState } from "react";
import Axios from "axios";

export default function Dashboard() {
  const [data, setData] = useState(null);

  const getUser = () => {
    Axios({
      method: "GET",
      // withCredentials: true,
      url: "/users/dashboard",
    }).then((res) => {
      setData(res.data);
      console.log(res.data);
    });
  };

  return (
    <div>
      <h1>Get User</h1>
      <button onClick={getUser}>Submit</button>
      {data ? <h1>Welcome Back {data[0].creator.username}</h1> : null}
    </div>
  );
}
