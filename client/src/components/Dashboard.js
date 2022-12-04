import React, { useEffect, useState, useContext } from "react";
import Axios from "axios";
import Header from "./Header";
import moment from "moment";
import Document from "./Document";
import { useNavigate } from "react-router-dom";
import { Context } from "../App";

export default function Dashboard() {

  const info = useContext(Context);
  const user = info.state.data.user;
  const documents = info.state.data.documents;
  const setData= info.setData;

  useEffect(() => {
    Axios({
      method: "GET",
      url: "/api/users/dashboard",
    })
      .then((res) => {
        console.log("res", res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  // console.log("dashb-info", info.state)

  const documentsList = documents.map((document) => {
    const dateCreated = moment(document.dateTime).format("DD-MMM-YYYY");
    return (
      <Document
        key={document._id}
        id={document._id}
        title={document.title}
        url={document.URL}
        creator={document.creator.username}
        date={dateCreated}
        user={user}
      />
    );
  });

  // console.log("what is this", data.userDocuments);

  const generateRandomString = () => {
    return Math.random().toString(36).substring(2, 14);
  };
    
  const newLink = `/documents/${generateRandomString()}`;
  const navigate = useNavigate();

  return (
    <div>
      <Header />
      <section className="bg-[#F8F9FA] pb-10 px-5">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between py-6">
            <h2 className="text-gray-700 text-lg">Start a new document</h2>
            <button className="button button-icon px-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                />
              </svg>
            </button>
          </div>
          <div>
            <div
              className="relative h-52 w-40 boarder-2 cursor-pointer hover:border-blue-700"
              onClick={() => navigate(newLink, { state: { user: user } })}
            >
              <img layout="fill" src="https://links.papareact.com/pju" alt="" />
            </div>
            <p className="ml-2 mt-2 font-semibold text-sm text-gray-700">
              Blank
            </p>
          </div>
        </div>
      </section>
      <section className="bg-white px-10 md:px-0">
        <div className="max-w-3xl mx-auto py-8 text-sm text-gray-700">
          <div className="flex items-center justify-between pb-5">
            <h2 className="font-medium flex-grow">My Documents</h2>
            <p className="mr-12">Creator</p>
            <p className="mr-12">Date Created</p>
            <p className="mr-12">Delete</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="gray"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
              />
            </svg>
          </div>
          <div>
            <div className="flex flex-col-reverse">{documentsList}</div>
          </div>
        </div>
      </section>
    </div>
  );
}
