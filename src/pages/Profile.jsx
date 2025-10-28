import React, { useEffect, useState } from "react";
import Header from "../components/Header";

import EditProfile from "../components/EditProfile";
import { Card } from "flowbite-react";
import { BaseUrl } from "../services/bseUrl";
import { createBook, getUserBooks } from "../services/allApi";


const Profile = () => {
  const [userDetails, setUserDetails] = useState({});
  const [sellFlag, setSellFlag] = useState(false);
  const [bookFlag, setBookFlag] = useState(false);
  const [priceFlag, setPriceFlag] = useState(false);
  const [preview, setPreview] = useState("");
  const [previewList, setPreviewList] = useState([]);
  const [userBooks, setUserBooks] = useState([]);

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUserDetails(user);
    }
    loadUserBooks();
  }, []);

  const loadUserBooks = async () => {
     let token = localStorage.getItem("token");
    let reqHeader = {
        authorization: `Bearer ${token}`,
    }
    let apiResponse = await getUserBooks(reqHeader);
    setUserBooks(apiResponse.data);
  };

  const ViewsellBook = () => {
    setBookFlag(false);
    setPriceFlag(false);
    setSellFlag(true);
  };
  const ViewBookstatus = () => {
    setBookFlag(true);
    setPriceFlag(false);
    setSellFlag(false);
  };
  const ViewPurchase = () => {
    setPriceFlag(true);
    setSellFlag(false);
    setBookFlag(false);
  };

  const handleFileChange = (e) => {
    let imgFile = e.target.files[0];
    console.log(imgFile);
    setPreview(URL.createObjectURL(imgFile));

    setPreviewList([...previewList, URL.createObjectURL(imgFile)]);
    let aBookImages = bookData.bookImages;
    aBookImages.push(imgFile);

    setBookData({ ...bookData, bookImages: aBookImages });
  };

  const handleSubmit = async () => {
    console.log(bookData);
    const {
      title,
      author,
      imageUrl,
      noOfPages,
      price,
      publisher,
      category,
      language,
      isbn,
      abstract,
      bookImages,
    } = bookData;
    if (
      title == "" ||
      author == "" ||
      imageUrl == "" ||
      noOfPages == "" ||
      price == "" ||
      publisher == "" ||
      category == "" ||
      language == "" ||
      isbn == "" ||
      abstract == ""
    ) {
      alert(" Please Fill the Form");
    } else {
      // proceed to api call
      let token = localStorage.getItem("token");
      let header = {
        authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      };

      let reqBody = new FormData();
      for (let key in bookData) {
        if (key !== "bookImages") {
          reqBody.append(key, bookData[key]);
        } else {
          bookData.bookImages.forEach((eachImageFile) => {
            reqBody.append("bookImages", eachImageFile);
          });
        }
      }
      let apiResponse = await createBook(reqBody, header);
      console.log(apiResponse);
    }
  };

  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    imageUrl: "",
    noOfPages: 0,
    price: 0,
    publisher: "",
    category: "",
    language: "",
    isbn: "",
    abstract: "",

    dicountprice: 0,
    bookImages: [],
  });

  return (
    <>
      <Header />

      <div className=" profile bg-black p-20   "></div>
      <div style={{ width: "250px", marginTop: "-70px", marginLeft: "80px" }}>
        <img
          className="w-40 border-12 border-white rounded-4xl"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXs7lvgKuF2UcIXyI7Zq-zPnPlWniCB7KSqBZ9fGv-Hx81ptxJKW8e-0eM6U9VpkfYe38&usqp=CAU"
          alt=""
        />
      </div>

      <div className="flex justify-between  ">
        <h1 className="ms-6">{userDetails ? userDetails.userName : "user"}</h1>
      </div>
      <EditProfile />
      <p className="ms-4">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Unde tempore
        soluta harum impedit, enim ex? Consectetur saepe fugit enim adipisci
        molestiae maxime aut a similique tenetur, dolores, porro quo placeat
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dignissimos,
        blanditiis. Iusto, veniam. Accusamus vel aut magnam, nostrum quod
        exercitationem. Facilis placeat sit labore molestias accusamus iusto
        dignissimos ex qui non..
      </p>

      <div className="text-center">
        <button
          onClick={ViewsellBook}
          className="me-4 border border-black h-10 w-30 bg-blue-300 "
        >
          Sell Book
        </button>
        <button
          onClick={ViewBookstatus}
          className="me-4 border border-black h-10 w-30  bg-blue-300  "
        >
          Book Status
        </button>
        <button
          onClick={ViewPurchase}
          className="me-4 border border-black h-10 w-40  bg-blue-300 "
        >
          Purchase History
        </button>
      </div>
      {sellFlag && (
        <div className="mx-30 bg-gray-400 text-white mt-10 ">
          <h1 className="text-center">Book details</h1>
          <div className="flex justify-center gap-4 w-100 ">
            <div className="rounded ">
              <input
                onChange={(e) =>
                  setBookData({ ...bookData, title: e.target.value })
                }
                className="bg-white block p-2 border  text-black  "
                type="text"
                placeholder="Title"
              />
              <input
                onChange={(e) =>
                  setBookData({ ...bookData, author: e.target.value })
                }
                className="bg-white block p-2 border text-black"
                type="text"
                placeholder="Author"
              />
              <input
                onChange={(e) =>
                  setBookData({ ...bookData, noOfPages: e.target.value })
                }
                className="bg-white block p-2 border text-black"
                type="text"
                placeholder="No of pages"
              />
              <input
                className="bg-white block p-2 border text-black"
                type="text"
                onChange={(e) =>
                  setBookData({ ...bookData, imageUrl: e.target.value })
                }
                placeholder="Image URL"
              />
              <input
                onChange={(e) =>
                  setBookData({ ...bookData, price: e.target.value })
                }
                className="bg-white block p-2 border text-black"
                type="text"
                placeholder="Price"
              />
              <input
                onChange={(e) =>
                  setBookData({ ...bookData, dicountprice: e.target.value })
                }
                className="bg-white block p-2 border text-black"
                type="text"
                placeholder="Discount Price"
              />
              <textarea
                onChange={(e) =>
                  setBookData({ ...bookData, abstract: e.target.value })
                }
                className="bg-white block p-2 border text-black mt-2"
                name=""
                id=""
              ></textarea>
            </div>
            <div className="w-40">
              <input
                onChange={(e) =>
                  setBookData({ ...bookData, publisher: e.target.value })
                }
                className="bg-white block p-2 border  text-black  "
                type="text"
                placeholder="publisher"
              />
              <input
                onChange={(e) =>
                  setBookData({ ...bookData, language: e.target.value })
                }
                className="bg-white block p-2 border text-black"
                type="text"
                placeholder="language"
              />
              <input
                onChange={(e) =>
                  setBookData({ ...bookData, isbn: e.target.value })
                }
                className="bg-white block p-2 border text-black"
                type="text"
                placeholder="ISBN"
              />
              <input
                onChange={(e) =>
                  setBookData({ ...bookData, category: e.target.value })
                }
                className="bg-white block p-2 border text-black"
                type="text"
                placeholder="catogory"
              />

              <label htmlFor="image">
                <input
                  onChange={(e) => handleFileChange(e)}
                  id="image"
                  style={{ visibility: "hidden" }}
                  type="file"
                  accept="image/png,image/jpeg,image/jpg"
                />
                <img
                  style={{ width: "100px" }}
                  src={
                    preview
                      ? preview
                      : "https://cdn-icons-png.flaticon.com/512/8136/8136031.png"
                  }
                  alt=""
                />
              </label>

              <div className="flex mt-4 gap-2">
                {preview
                  ? previewList?.map((eachPreview) => {
                      <img className="w-25" src={eachPreview} alt="Previews" />;
                    })
                  : ""}
                {previewList?.length < 3 && previewList > 0 ? (
                  <label htmlFor="image">
                    <input
                      onChange={(e) => handleFileChange(e)}
                      id="image"
                      type="file"
                      accept="image/png,image/jpeg,image/jpg"
                    />
                    <img
                      className="w-25"
                      src="https://img.icons8.com/?size=1200&id=tbca2FSDbCDP&format=png"
                      alt=""
                    />
                  </label>
                ) : (
                  ""
                )}
                <button
                  onClick={handleSubmit}
                  className="bg-amber-800 mb-5 p-2 rounded text-xl"
                >
                  Add Book
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {bookFlag && (
     
        <div className=" mx-60 mt-10 ">
          {
            userBooks?.length>0?
            <div className="grid grid-cols-3 gap-3">
  {
    userBooks?.map((eachBook)=>{
       <Card
            className="max-w-sm"
            imgAlt="Meaningful alt text for an image that is not purely decorative"
            imgSrc={`${BaseUrl}/uploads/${eachBook.uploadedImages[0]}`}
          >
            <h5 className="text-2xl font-boldt text-gray-900">
            {eachBook?.title}
            </h5>
              <h6 className="text-xl font-boldt text-gray-900">
           ${eachBook?.price}
            </h6>
            <p className="font-normal text-gray-700 dark:text-gray-400">
             {eachBook?.abstract}
            </p>
          </Card>
    })
  }
            </div>:
                <div className="mt-20 flex flex-col items-center justify-center ">
          <img
            src="https://i.pinimg.com/originals/b4/13/34/b41334a036d6796c281a6e5cbb36e4b5.gif"
             alt=""
             style={{ height: "375px" }}
          />

          <h3>No Book added yet</h3>
         </div>
          }
       
        </div>
      )}
      {priceFlag && (
        <div
          className="mt-20 
flex flex-col items-center justify-center text-center"
        >
          <img
            style={{ height: "375px" }}
            src="https://i.pinimg.com/originals/b4/13/34/b41334a036d6796c281a6e5cbb36e4b5.gif"
            alt=""
          />

          <h3>No Book added yet</h3>
        </div>
      )}
    </>
  );
};

export default Profile;
