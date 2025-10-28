import React from "react";
import { Link } from "react-router";

const AdminSideBar = () => {
  return (
    <div className="bg-blue-300">
      <div className="mx-8 p-2">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXs7lvgKuF2UcIXyI7Zq-zPnPlWniCB7KSqBZ9fGv-Hx81ptxJKW8e-0eM6U9VpkfYe38&usqp=CAU"
          alt=""
        />
        <h2 className="text-xl text-white">User Name</h2>
        <ul className="mt-10">
          <li>
            <Link to={"/admin-home"} className="text-white cursor-pointer">
              Home
            </Link>
          </li>
          <li>
            <Link to={"/admin-books"} className="text-white cursor-pointer">
              All Books/Users
            </Link>
          </li>
          <li>
            <Link to={"/admin-careers"} className="text-white cursor-pointer">
              Careers
            </Link>
          </li>
          <li>
            <Link to={"/admin-settings"} className="text-white cursor-pointer">
              Settings
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminSideBar;
