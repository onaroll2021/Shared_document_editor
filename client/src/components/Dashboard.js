import React, { useEffect, useState } from "react";
import Axios from "axios";
import Header from "./Header";
import moment from "moment";
import Document from "./Document";
import { useNavigate } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function Dashboard() {
  // useEffect(() => {
  //   props.fetchData
  // })

  const [documents, setDocuments] = useState([]);
  const [showDocuments, setShowDocuments] = useState([]);

  const [user, setUser] = useState({});
  const [search, setSearch] = useState("");
  const [search2, setSearch2] = useState("");
  const [arr, setArr] = useState("");

  useEffect(() => {
    Axios({
      method: "GET",
      url: "/api/users/dashboard",
    })
      .then((res) => {
        setDocuments(res.data.userDocuments);
        setShowDocuments(res.data.userDocuments);
        setUser(res.data.user);
        console.log("XXXX", res.data);
        console.log("fffff", res.data.userDocuments);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  //sort
  const sortByCreator = (event, arr) => {
    event.preventDefault();
    arr.sort((a, b) => {
      if (a.creator.username !== user.username) return -1;
      console.log("11111", new Date(a.dateTime).getTime());

      return new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime();
    });
    //arr.sort((a, b) => {
    //  const aTime = new Date(a.dateTime).getTime();
    //  const bTime = new Date(b.dateTime).getTime();
    //  if (!(aTime - bTime)) return -1;
    //  console.log("11111", aTime);
    //  return a.creator.username === user.username;
    //});

    setArr(arr);
    console.log("arr", arr);
  };

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
  const handleDelete = (event, Id) => {
    event.stopPropagation();
    const docList = [...documents];
    const newDocList = docList.filter((doc) => doc._id !== Id);
    setDocuments(newDocList);
    setShowDocuments(newDocList);
    Axios({
      method: "POST",
      data: {
        id: Id,
      },
      url: "/api/users/delete",
    }).then((res) => {
      console.log(res);
    });
  };

  const documentsList = showDocuments.map((document) => {
    const dateCreated = moment(document.dateTime).startOf("second").fromNow();
    console.log("dateCreated", dateCreated);
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
        handleDelete={handleDelete}
      />
    );
  });

  //search tittle
  const searchResult = (event, arr, query) => {
    event.preventDefault();
    let result = arr.filter((el) =>
      el.title.toLowerCase().includes(query.toLowerCase())
    );
    console.log("search", result);
    setShowDocuments(result);
  };

  const closeSearch = () => {
    // event.stopPropagation();
    setSearch("");
    setShowDocuments(documents);
  };

  const searchContent = (event, arr, query) => {
    event.preventDefault();
    const result2 = [];
    for (const element of arr) {
      if (element.data === "") {
        continue;
      }
      const ops = element.data.ops;
      if (ops.length > 0) {
        for (const op of ops) {
          if (
            typeof op.insert === "string" &&
            op.insert.toLowerCase().includes(query.toLowerCase())
          ) {
            result2.push(element);
            break;
          }
        }
      }
    }
    setShowDocuments(result2);
  };

  const closeSearch2 = () => {
    // event.stopPropagation();
    setSearch2("");
    setShowDocuments(documents);
  };

  //console.log("documents", documents);
  //console.log("mysearch", search);
  //console.log("mysearch2", search2);
  //console.log("result", result);
  //console.log("result2", result2);

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
        <div className="w-3/5 mx-auto">
          <div className="flex items-center justify-between py-6">
            <h2 className="text-gray-700 text-lg">Start a new document</h2>
          </div>
          <div>
            <div
              className="relative h-52 w-40 boarder-2 cursor-pointer hover:border-blue-700"
              onClick={() =>
                navigate(newLink, {
                  state: { user: user },
                })
              }
            >
              <img layout="fill" src="https://links.papareact.com/pju" alt="" />
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white px-10 md:px-0">
        <form
          className="w-1/4 mt-6 ml-72 flex flex-grow items-center px-5 py-2 bg-gray-100 text-gray-600 rounded-lg focus-within:text-gray-600 focus-within:shadow-md"
          onSubmit={(e) => searchResult(e, documents, search)}
          autoComplete="off"
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
              placeholder="Title Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-grow px-5 text-base bg-transparent outline-none"
            />
          </svg>
          <input
            type="text"
            placeholder="Title Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-grow px-5 text-base bg-transparent outline-none"
          />
          {search && (
            <button type="button" onClick={closeSearch}>
              <FontAwesomeIcon icon={faXmark} />
            </button>
          )}
        </form>

        <form
          className="w-1/4 mt-6 ml-72 flex flex-grow items-center px-5 py-2 bg-gray-100 text-gray-600 rounded-lg focus-within:text-gray-600 focus-within:shadow-md"
          onSubmit={(e) => searchContent(e, documents, search2)}
          autoComplete="off"
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
              placeholder="Content Search"
              value={search2}
              onChange={(e) => setSearch2(e.target.value)}
              className="flex-grow px-5 text-base bg-transparent outline-none"
            />
          </svg>
          <input
            type="text"
            placeholder="Content Search"
            value={search2}
            onChange={(e) => setSearch2(e.target.value)}
            className="flex-grow px-5 text-base bg-transparent outline-none"
          />
          {search2 && (
            <button type="button" onClick={closeSearch2}>
              <FontAwesomeIcon icon={faXmark} />
            </button>
          )}
        </form>

        <div className="w-3/5 mx-auto py-4 text-sm text-gray-700">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100 shadow-md rounded-md">
              <tr>
                <th
                  scope="col"
                  className="py-3 text-xs font-bold text-gray-500 uppercase "
                ></th>
                <th
                  scope="col"
                  className="w-50 py-3 text-xs font-bold text-left text-gray-700 uppercase "
                >
                  My Documents
                </th>

                <th
                  scope="col"
                  className="px-6 py-3 text-xs font-bold text-center text-gray-700 uppercase bg-gray-100 bg-violet-500 hover:bg-violet-600"
                >
                  <Button
                    className="group/item hover:bg-slate-100 text-gray-700 uppercase bg-gray-100"
                    onClick={(e) => sortByCreator(e, documents)}
                  >
                    CREATOR
                  </Button>
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
        </div>
      </section>
    </div>
  );
}
