import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { BaseUrl } from "../services/bseUrl";
import { getSingleBook } from "../services/allApi";


const ViewBooks = () => {
  const [bookDetails, setBookDetails] = useState({});
  let { id } = useParams();
  useEffect(() => {
    getBookDetails();
  }, []);
  const getBookDetails = async () => {
    let token = localStorage.getItem("token");
    let reqHeader = {
      authorization: `Bearer ${token}`,
    };
    let apiResponse = await getSingleBook(id, reqHeader);
    console.log(apiResponse);
    setBookDetails(apiResponse.data);
  };
  return (
    <div>
      <div className="mx-30 my-30 border p-5">
        <h1 className="text-center text-5xl">{bookDetails?.title}</h1>
        <h5 className="text-center text-2xl bg-blue-800">
          {bookDetails?.author}
        </h5>
        <div className="grid grid-cols-[1fr_5fr] gap-10">
          <div className="image">
            <img
              src={`${BaseUrl}/uploads/${bookDetails.uploadedImages?.[0]}`}
              alt="image of book"
            />
          </div>
          <div className="contents">
            <div className="flex justify-between ">
              <h2>Publisher : {bookDetails?.publisher}</h2>
              <h2>Language : {bookDetails?.language}</h2>
              <h2>No of Pages : {bookDetails?.noOfPages}</h2>
            </div>
            <div className="flex justify-between mt-5 ">
              <h2>Seller Name : {bookDetails?.userMail}</h2>
              <h2>Real Price : {bookDetails?.price}</h2>
              <h2>ISBN : {bookDetails?.isbn}</h2>
            </div>
            <p className="mt-5 font-bold">{bookDetails?.abstract}</p>
            <Link
              to={"/my-books"}
              className="bg-blue-800 mt-5 p-2 rounded text-xl"
            >
              Go Back
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewBooks;
