import React from 'react'
import {
  faFacebook,
  faInstagram,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const Footer = () => {
  return (
    <>
    <div className="row bg-black p-4  text-white">
      <div className="col">
        <h3 >  ABOUT US</h3>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia facere illo rerum, debitis, iure distinctio architecto expedita doloribus dolorem, unde soluta? Earum nostrum incidunt dolore, aliquam laudantium sunt nihil sed!</p>
      </div>
      <div className="col text-center">
        <h3>NEWSLETTER</h3>
        <p>Stay updated with our latest trends</p>
 <div className="flex justify-center items-center ">
          <input
            type="text"
            placeholder="Email ID"
            className="w-40 h-10 p-3 mb-4 border  text-white "
          />
          <button
            type="submit"
            className="w-10 h-10 mb-4 bg-blue-600 text-white py-2  "
          >
          
          </button>
        </div>

      </div>
      <div className="col ">
        <h3>FOLLOW US</h3>
        <p>Let us be social</p>
           <FontAwesomeIcon icon={faInstagram} />
          <FontAwesomeIcon icon={faXTwitter} />
          <FontAwesomeIcon icon={faFacebook} />

      </div>
    </div>
    
</>
  )
}

export default Footer