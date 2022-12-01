import React, { useEffect, useState } from "react";
import Axios from "axios";
import Document from "./Document";

export default function Dashboard() {
  
  const [data, setData] = useState(null);


  
  useEffect(() => {
    Axios({
      method: "GET",
      // withCredentials: true,
      url: "/users/dashboard",
    }).then((res) => {
      setData(res.data);
      console.log(res.data);
    });
  }, []);
  
const documents = data? data.userDocuments.map(document => {
    return (
      <Document 
        key={document._id}
        id={document._id}
        url={document.URL}
        creator={document.creator}
      />
    )
  }) : <></> ;

  // console.log("what is this", data.userDocuments);

  // const documents = data.map(document => {
  //   return (
  //     <Document 
  //       key={document._id}
  //       id={document._id}
  //       url={document.url}
  //       creator={document.creator}
  //     />
  //   )
  // })

  // const getUser = () => {
  //   Axios({
  //     method: "GET",
  //     // withCredentials: true,
  //     url: "/users/dashboard",
  //   }).then((res) => {
  //     setData(res.data);
  //     console.log(res.data);
  //   });
  // };

  return (
    <div>
      <h1>Get User</h1>
      {data ? <h1>Welcome Back {data.user.username}</h1> : <h1>loading...</h1>}
      {data? <div>{documents}</div> : <div><h1>hahahahhaha</h1></div>}
    </div>
  );
}
