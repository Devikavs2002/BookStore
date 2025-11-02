import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import { Link } from "react-router";
import { Card } from "flowbite-react";
import { BaseUrl } from "../services/bseUrl";
import { getAllbooks } from "../services/allApi";
import { AuthContext } from "../context/AuthContext";

const AllBooks = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [category, setCategory] = useState([]);
  const [books, setBooks] = useState([]);
  const [duplicateBooks, setDuplicateBooks] = useState([]);

  const { token } = useContext(AuthContext);

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
       getBooks();
    }
   
  }, []);

  const getBooks = async (search) => {
    try {
      let header = {
        authorization: `Bearer ${token}`,
      };
      let apiResponse;
      if (search) {
        apiResponse = await getAllbooks(header, search);
      } else {
        apiResponse = await getAllbooks(header, "");
      }
      let data = apiResponse.data;
      setBooks(data);
      setDuplicateBooks(data);

      let categories = [];
      data.forEach((eachBook) => {
        if (!categories.includes(eachBook.category)) {
          categories.push(eachBook.category);
        } else {
        }
      });

      setCategory(categories);
      console.log(categories);
    } catch (error) {
      console.log(error);
    }
  };

  const filterBooks = (cat) => {
    let AllBooks = books;
    let filteredBooks = duplicateBooks.filter(
      (eachBook) => eachBook.category == cat
    );
    console.log(filteredBooks);
    setBooks(filteredBooks);
  };
  return (
    <>
      <Header />

      {/* give the condition for login here */}

      {isLoggedIn ? (
        <div>
          <h1 className="text-center my-4 ">Collections</h1>
          <div className="flex justify-center">
            <div>
              <input
                onChange={(e) => getBooks(e.target.value)}
                className="border rounded p-2 w-70"
                type="text"
                placeholder="Search by Book Name"
              />
              <button
                onClick={getBooks}
                className="bg-blue-900 h-10 w-20 text-white  border rounded"
              >
                Search
              </button>
            </div>
          </div>
          <div className="grid grid-cols-[1fr_5fr] mt-10 ms-10 ">
            <div className=" ">
              {/* grid to show categories */}
              {category?.map((eachCategorie, index) => (
                <div>
                  <input
                    id={index}
                    type="radio"
                    onChange={() => filterBooks(eachCategorie)}
                  />
                  <label htmlFor={index}>{eachCategorie} </label>
                </div>
                // <li key=</li>
              ))}
            </div>
            <div>
              {/*grid to show books */}
              {books.length > 0 ? (
                <div className="grid grid-cols-3 gap-4">
                  {books?.map((eachBook) => (
                    <Card
                      className="max-w-sm"
                      imgAlt="Meaningful alt text for an image that is not purely decorative"
                      imgSrc={`${BaseUrl}/uploads/${eachBook.uploadedImages[0]}`}
                    >
                      <h5 className="text-2xl font-bold tracking-tight text-gray-900">
                        {eachBook.title}
                      </h5>
                      <p className="font-normal text-gray-700 dark:text-gray-400">
                        {eachBook.abstract}
                      </p>
                      <Link
                        to={`/view-book/${eachBook._id}`}
                        className=" bg-blue-500 p-2 w-25 rounded-xl text-white"
                      >
                        View More
                      </Link>
                    </Card>
                  ))}
                </div>
              ) : (
                <h1 className="text-center text-xl text-red-700">
                  No Books Found
                </h1>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center">
          <div>
            <img
              className="w-90"
              src="https://arkca.com/assets/img/login.gif"
              alt=""
            />
            <h3>
              Please <Link to={"/login"}>Login</Link> To Explore More
            </h3>
          </div>
        </div>
      )}
    </>
  );
};

export default AllBooks;
