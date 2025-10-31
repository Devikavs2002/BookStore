import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { BaseUrl } from "../services/bseUrl";
import { getSingleBook } from "../services/allApi";
import { loadStripe } from "@stripe/stripe-js";

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
  const buyBook = async () => {
    const stripe = await loadStripe(
      pk_test_51SO0QkFQadLdxUWVtYqLBwmu5iHWh2iAnEtKZvpwrEZnonIHG75ajkqzGX69bh2zT9eEDYpH7YxxjOKhvqXsmeFP00jHh09NmA
    );
    console.log(stripe);
  };
  return (
    <div>
      <div className="mx-30 my-30 border p-5">
        <h1 className="text-center text-xl">{bookDetails?.title}</h1>
        <h5 className="text-center text-xl bg-blue-800">
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
            <button
              onClick={buyBook}
              className="bg-green-800 w-20 mt-3 ms-5 p-2 rounded text-xl"
            >
              Buy Book{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewBooks;
