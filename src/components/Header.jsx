import {
  faFacebook,
  faInstagram,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { Dropdown, DropdownItem } from "flowbite-react";

const Header = () => {
  const [isLoggined, setLoggined] = useState(false);

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      setLoggined(true);
    }
  }, []);

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

          {
            isLoggined?<span>
               <Dropdown label="Options" className="text-green-900" >
      <DropdownItem>
        <Link to={'/profile'}>Profile</Link>
      </DropdownItem>
      <DropdownItem>LogOut</DropdownItem>
      
    </Dropdown>
            </span>:
            <Link
            to={"/login"}
            className="mx-5 border-black p-3 rounded-4xl cursor-pointer"
          >
            Login
          </Link>
          }
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
