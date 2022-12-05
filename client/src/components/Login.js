import React, { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import loginImg from "../assets/login2.png";
import { FcGoogle } from 'react-icons/fc'
import {GrFacebook} from 'react-icons/gr'
import { Button, Checkbox } from "@material-tailwind/react";

export default function Login() {
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const navigate = useNavigate();
  const pStyle = {
    elevation: 3,
  };

  const login = () => {
    Axios({
      method: "POST",
      data: {
        username: loginUsername,
        password: loginPassword,
      },
      withCredentials: true,
      // headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      url: "/api/login",
    }).then((res) => {
      navigate("/users/dashboard");
    });
  };

  return (
    <div className="relative w-full h-screen">
      <img
        src={loginImg}
        className="absolute w-full h-full object-cover mix-blend-darken"
        alt="/"
      />

      <div className='flex justify-center items-center h-full' onSubmit={event => event.preventDefault()} autoComplete="off">
        <form className='z-10 max-w-[400px] mx-auto bg-white/5 p-8'>
          <h2 className='text-4xl font-bold py-4 text-center'>Shared Editor</h2>
          <div className="flex justify-between py-8">
            <p className="border shadow-lg hover:shadow-xl px-6 py-2 relative flex items-center">
              <GrFacebook className="mr-2" /> Facebook
            </p>
            <p className="border shadow-lg hover:shadow-xl px-6 py-2 relative flex items-center">
              <FcGoogle className="mr-2" /> Google
            </p>
          </div>
          <div className="flex flex-col mb-4">
            <label>Username</label>
            <input
              name="login"
              type="text"
              placeholder="Username"
              value={loginUsername}
              onChange={(event) => setLoginUsername(event.target.value)}
              className="border relative bg-gray-100 p-2"
            />
          </div>
          <div className="flex flex-col mb-4">
            <label>Password</label>
            <input
              name="login"
              type="password"
              placeholder="Password"
              value={loginPassword}
              onChange={(event) => setLoginPassword(event.target.value)}
              className="border relative bg-gray-100 p-2"
            />
          </div>
          <button
            onClick={login}
            className="w-full py-3 mt-8 bg-indigo-600 hover:bg-indigo-500 relative text-white"
          >
            Sign In
          </button>
          <div className="flex items-center">
            <Checkbox />
            Remember me
          </div>
          <p className='text-center mt-8'>Not a member?&nbsp;&nbsp;<a href="/signup" className="text-blue underline">Sign up now</a></p>
        </form>
      </div>
    </div>
  );
}
