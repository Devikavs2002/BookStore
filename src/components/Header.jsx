import {
  faFacebook,
  faInstagram,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { Dropdown, DropdownItem } from "flowbite-react";
import { AuthContext } from "../context/AuthContext";


const Header = () => {
  const [isLoggined, setLoggined] = useState(false);
  const [userDetails, setUserDetails] = useState({});

  const [logout, setLogout] = useState(false);

  const {logoutUser}=useContext(AuthContext)

  const navigate = useNavigate();

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      setLoggined(true);
    } else {
      setLoggined(false);
    }
    let user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      setUserDetails(user);
    } else {
      setUserDetails({});
    }
  }, [logout]);

  const onLogOutClick = () => {
    // localStorage.clear();
    logoutUser()
    setLogout(true);
    navigate("/");
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <img
          className="w-20"
          src="https://i.pinimg.com/736x/51/06/06/510606fef484fcbe346572557b4b8bb7.jpg"
          alt="logo"
        />
        <h1 className="text-5xl font-bold">BOOK STORE</h1>
        <div>
          <FontAwesomeIcon icon={faInstagram} />
          <FontAwesomeIcon icon={faXTwitter} />
          <FontAwesomeIcon icon={faFacebook} />

          {isLoggined ? (
            <div className="relative">
              <img
                className="w-10 rounded-3xl absolute "
                src={userDetails?.profile}
                alt=""
              />
              <Dropdown
                dismissOnClick={false}
                className=" text-3xl  text-transparent"
              >
                <DropdownItem>
                  <Link to={"/profile"}>Profile</Link>
                </DropdownItem>
                <DropdownItem>
                  <button onClick={onLogOutClick}>Logout</button>
                </DropdownItem>
              </Dropdown>
            </div>
          ) : (
            <Link
              to={"/login"}
              className="mx-5 border-black p-3 rounded-4xl cursor-pointer"
            >
              Login
            </Link>
          )}
        </div>
      </div>
      <div className="bg-black">
        <ul className="flex justify-center items-center text-white gap-4 p-4">
          <li>
            {" "}
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={"/my-books"}>Book</Link>
          </li>
          <li>
            <Link to={"/careers"}>Careers</Link>
          </li>
          <li>
            {" "}
            <Link to={"/contact"}>Contact</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
