import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { Button, Card, Form, InputGroup } from "react-bootstrap";
import { getHomeBooks } from "../services/allApi";



const Landing = () => {
  const [bookData, setBookData] = useState([]);

  const loadBooks = async () => {
    let apiResponse = await getHomeBooks();
    let data = apiResponse.data;
    setBookData(data);
    useEffect(() => {
      loadBooks();
    }, []);
  };

  return (
    <>
      <Header />
      <div className=" img-container h-screen flex flex-col justify-center items-center text-white text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-2">Wonderful Gifts</h1>
        <p className="text-lg md:text-xl mb-6">
          Give your family and friends a book
        </p>

        <div className="w-full max-w-md">
          <input
            type="text"
            placeholder="Search Books"
            className="w-full p-3 mb-4 rounded border  text-black bg-white "
          />
          {/* <FaSearch className="text-gray-600" /> */}
        </div>
      </div>
      <div className="text-center">
        <h5>New Arrivals</h5>
        <h2>Explore Our Latest Collection</h2>
      </div>
      {bookData?.length > 0 ? (
        <div className="grid grid-cols-4">
          {bookData?.map((eachBook) => (
            <div>
              <div className="mt-5 ">
                <div className="w-2xs p-3 border ">
                  <img
                    src={`${baseUrl}/uploads/${eachBook.uploadedImages[0]}`}
                    alt="book"
                  />
                  <div>
                    <p className="text-xl font-bold text-center truncate">
                      {eachBook.title}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h1>No Books Found</h1>
      )}

      <div className="flex justify-center mt-6">
        <button className="px-6 py-2 bg-blue-800 text-white rounded">
          Explore More
        </button>
      </div>

      <div className="w-full px-6 py-12 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h6 className="text-sm text-gray-600  text-center ">
              Featured Authors
            </h6>
            <h2 className="text-3xl  text-gray-900 mt-2 text-center">
              Captivates with every word
            </h2>
            <p className="mt-6 text-gray-700 ">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
              fuga nostrum illum distinctio eum quidem recusandae soluta aliquam
              laboriosam odit quas, nam molestias fugiat culpa rem nulla iste?
              Modi, molestias. Lorem ipsum dolor sit amet, consectetur
              adipisicing elit. Sunt earum possimus accusantium necessitatibus
              id neque soluta quibusdam explicabo laborum? Deserunt vel quia
              voluptates dicta incidunt illo fuga pariatur sequi error.
            </p>
            <p className="mt-4 text-gray-700 ">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
              fuga nostrum illum distinctio eum quidem recusandae soluta aliquam
              laboriosam odit quas, nam molestias fugiat culpa rem nulla iste?
              Modi, molestias. Lorem ipsum dolor sit amet, consectetur
              adipisicing elit. Sunt earum possimus accusantium necessitatibus
              id neque soluta quibusdam explicabo laborum? Deserunt vel quia
              voluptates dicta incidunt illo fuga pariatur sequi error.
            </p>
          </div>

          <div className="flex justify-center">
            <img
              src="https://thumbs.dreamstime.com/b/portrait-male-afri…nance-attorney-lawyer-sales-stylish-155546880.jpg"
              alt="Featured Author"
              className="w-full   "
            />
          </div>
        </div>

        <div className="text-center p-2 m-5">
          <h6>TESTIMONIALS</h6>
          <h3>See What Others Are Saying</h3>
          <div className="flex justify-center">
            <img
              src="https://thumbs.dreamstime.com/b/portrait-male-afri…nance-attorney-lawyer-sales-stylish-155546880.jpg"
              alt="Featured Author"
              className="rounded-full w-60 h-60 m-3 "
            />
          </div>
          <h6 className="text-center">Treesa Joseph</h6>

          <p className="flex justify-center">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatem
            vel rerum ex neque delectus? Aliquam possimus perferendis esse
            excepturi, rerum laborum error deserunt nostrum nulla necessitatibus
            tenetur nam delectus dolores. Lorem, ipsum dolor sit amet
            consectetur adipisicing elit. Id suscipit repellat, asperiores,
            maiores odit inventore at, placeat perspiciatis sint excepturi et.
            Veritatis repellat distinctio hic laboriosam, obcaecati quas ipsam
            labore.
          </p>
        </div>
      </div>
    </>
  );
};

export default Landing;
