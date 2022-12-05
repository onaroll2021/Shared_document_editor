import React, { useEffect, useState, useCallback } from "react";
import Axios from "axios";
import Header from "./Header";
import moment from "moment";
import Document from "./Document";
import { useNavigate } from "react-router-dom";
import { Input } from "@material-tailwind/react";

export default function Dashboard() {
  // useEffect(() => {
  //   props.fetchData
  // })

  const [documents, setDocuments] = useState([]);
  const [user, setUser] = useState({});
  const [search, setSearch] = useState("");

  useEffect(() => {
    Axios({
      method: "GET",
      url: "/api/users/dashboard",
    })
      .then((res) => {
        setDocuments(res.data.userDocuments);
        setUser(res.data.user);
        console.log("XXXX", res.data);
        console.log("fffff", res.data.userDocuments);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  // const documents = data ? data.userDocuments.map(document => {
  //   const dateCreated = moment(document.dateTime).format('DD-MMM-YYYY');
  //   return (
  //     <Document
  //       key={document._id}
  //       id={document._id}
  //       url={document.URL}
  //       creator={document.creator}
  //       date={dateCreated}
  //     />
  //   );
  // }) : <></>;

  const documentsList = documents.map((document) => {
    const dateCreated = moment(document.dateTime).startOf("second").fromNow();
    return (
      <Document
        key={document._id}
        id={document._id}
        title={document.title}
        url={document.URL}
        creator={document.creator.username}
        creatorId={document.creator._id}
        editAccess={document.view_edit_access}
        viewAccess={document.view_access}
        date={dateCreated}
        user={user}
      />
    );
  });

  //search function

  const searchResult = (arr, query) => {
    let result = arr.filter((el) =>
      el.title.toLowerCase().includes(query.toLowerCase())
    );
    console.log("search", result);
    return setDocuments(result);
  };

  console.log("mysearch", search);
  // console.log("what is this", data.userDocuments);

  const generateRandomString = () => {
    return Math.random().toString(36).substring(2, 14);
  };

  const newLink = `/documents/${generateRandomString()}`;
  const navigate = useNavigate();

  return (
    <div className="flex flex-col">
      <Header />
      <section className="bg-[#F8F9FA] pb-10 px-5">
        <div className="ml-8">
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
        <form
          className="w-1/4 mt-6 ml-72 flex flex-grow items-center px-5 py-2 bg-gray-100 text-gray-600 rounded-lg focus-within:text-gray-600 focus-within:shadow-md"
          onSubmit={() => searchResult(documents, search)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            color="gray"
            size="3xl"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search Document"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-grow px-5 text-base bg-transparent outline-none"
          />
        </form>
        <div className="w-3/5 mx-auto py-4 text-sm text-gray-700">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100 shadow-md rounded-md">
              <tr>
                <th
                  scope="col"
                  className="w-7 py-3 text-xs font-bold text-gray-500 uppercase "
                >
                </th>
                <th
                  scope="col"
                  className="w-50 py-3 text-xs font-bold text-left text-gray-700 uppercase "
                >
                  My Documents
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-bold text-center text-gray-700 uppercase "
                >
                  Creator
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-bold text-center text-gray-700 uppercase "
                >
                  Editor
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-bold text-center text-gray-700 uppercase "
                >
                  Viewer
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-bold text-center text-gray-700 uppercase "
                >
                  Date Created
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-bold text-center text-gray-700 uppercase "
                >
                  Delete
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">{documentsList}</tbody>
          </table>
          {/*<p className="mr-12 flex-grow">Title</p>
            <p className="mr-12">Creator</p>
            <p className="mr-12">Editor</p>
            <p className="mr-12">Viewer</p>
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
          </div>*/}
        </div>
      </section>
    </div>
  );
}
