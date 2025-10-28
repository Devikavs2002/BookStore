import React, { useEffect, useState } from "react";
import AdminHeader from "../components/AdminHeader";
import AdminSideBar from "../components/AdminSideBar";
import { BaseUrl } from "../../services/bseUrl";
import { getAllUsers } from "../../services/allApi";

const AdminBooks = () => {
  const [showBooks, setShowBooks] = useState(true);
  const [searchKey, setSearchKey] = useState("");
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadBooks();
  }, [searchKey]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadBooks = async () => {
    let token = localStorage.getItem("token");
    let reqHeader = {
      authorization: `Bearer ${token}`,
    };
    let apiResponse = await getAllbooks(reqHeader, searchKey);
    setBooks(apiResponse.data);
  };
  const loadUsers = async () => {
    let token = localStorage.getItem("token");
    let reqHeader = {
      authorization: `Bearer ${token}`,
    };
    let apiResponse = await getAllUsers(reqHeader);
    setUsers(apiResponse.data);
  };
  return (
    <>
      <AdminHeader />
      <div className="grid grid-cols-[1fr_5fr]">
        <div>
          <AdminSideBar />
        </div>
        <div>
          <h2 className="text-center text-2xl mt-4">All Books</h2>
          <div className="flex justify-center gap-4 my-5 ">
            <button
              onClick={() => setShowBooks(true)}
              className="border p-2 cursor-pointer"
            >
              Book List
            </button>
            <button
              onClick={() => setShowBooks(false)}
              className="border p-2 cursor-pointer"
            >
              Users
            </button>
          </div>
          {showBooks ? (
            <>
              <div className="text-center">
                <input
                  onChange={(e) => setSearchKey(e.target.value)}
                  className="bg-blue-800 rounded text-white p-2"
                  placeholder="Search Books"
                  type="text"
                />
              </div>

              <div>
                {books?.length > 0 ? (
                  <div className="grid grid-cols-4 gap-4 mx-6 mt-3">
                    {books?.map((eachBook) => (
                      <div className="border">
                        <img
                          className="w-60"
                          src={`${BaseUrl}/uploads/${eachBook.uploadedImages[0]}`}
                          alt=""
                        />
                        <h2 className="text-center text-blue-500">
                          {eachBook.author}
                        </h2>
                        <h2 className="text-center text-xl ">
                          {eachBook.title}
                        </h2>
                        <h2 className="text-center text-blue-500">
                          {eachBook.price} $
                        </h2>
                      </div>
                    ))}
                  </div>
                ) : (
                  <h1>No Books Added</h1>
                )}
              </div>
            </>
          ) : (
            <div >
              {
                users?.length>0?<div className="mx-6 grid grid-cols-3 gap-4 ">

               {
                users?.map((eachUser,index)=>(
                     <div key={index} className="  p-10 bg-gray-200 rounded">
                <h5 className="text-red-500 ">ID : {eachUser._id}</h5>
                <div className=" flex  ">
                  <img
                    className="w-25"
                    src={eachUser.profile}
                    alt=""
                  />

                  <h5 className="">
                  {eachUser.userName}
                    <h4 className="text-red-500">{eachUser.email}</h4>
                  </h5>
                </div>
              </div>
                ))
               }

                </div>:<h1>N Users Found</h1>
              }
              
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminBooks;
