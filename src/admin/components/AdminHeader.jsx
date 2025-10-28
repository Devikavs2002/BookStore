import React from 'react'
import { Link } from 'react-router'


const AdminHeader = () => {
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
         

          <button className="mx-5 border p-3 rounded-4xl cursor-pointer">
            LogOut
          </button>
        </div>
      </div>

      <div className="bg-gray-800 text-white p-2">
        <marquee behavior="" direction="">
          Welcome , Admin ! you're all set to manage and monitor the system. Let's get to work !
        </marquee>
      </div>

    </div>
  )
}

export default AdminHeader