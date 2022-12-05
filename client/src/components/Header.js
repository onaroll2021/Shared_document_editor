import React from 'react';
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, IconButton } from "@material-tailwind/react";


export default function Header() {
  const navigate = useNavigate();

  const logOut = () => {
    Axios({
      method: "POST",
      withCredentials: true,
      url: "/api/logout",
    }).then((res) => {
      navigate("/");
    }).catch((err) => {
      console.log(err);
    });
  };

  return (
    <div className='flex items-center sticky z-50 top-0 px-4 py-2 shadow-md bg-white'>
    <button className="button button-icon px-5" >
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
    </svg>
    </button>
    <IconButton className="h-20 w-20">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
    </svg>
    </IconButton>
    <h1 className='ml-2 text-gray-700 text-2xl'>Docs</h1>
    <div className="mx-5 md:mx-10 flex flex-grow items-center px-5 py-2 bg-gray-100 text-gray-600 rounded-lg focus-within:text-gray-600 focus-within:shadow-md">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" color='gray' size='3xl' className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </svg>
    <input type="text" placeholder="Search" className="flex-grow px-5 text-base bg-transparent outline-none"/>
    </div>
    <button className="button button-icon px-5" data-ripple-light="true">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
    </svg>
    </button>
    <Button onClick={logOut}>Log Out</Button>
    <img loading="lazy" className="cursor-pointer h-12 w-12 rounded-full ml-2" alt="" src='https://c8.alamy.com/comp/2AE4838/profile-of-a-teenage-indian-boy-looking-at-outsides-2AE4838.jpg' />
    </div>
  )
}
