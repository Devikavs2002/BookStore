import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faPhone } from "@fortawesome/fontawesome-free-solid";
import { faMessage } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Contact = () => {
  return (
    <>
      <Header />
      <div className="text-center">
        <h2 className="mt-8 ">Contacts</h2>
        <p className="text-center">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis
          similique illum rerum! Tempora esse aspernatur impedit animi labore
          minus est voluptate, a veniam recusandae fugit quibusdam tenetur quo
          dolorum porro? Lorem ipsum, dolor sit amet consectetur adipisicing
          elit. Iure est, ab enim rerum ipsum, quam explicabo autem quas cum
          debitis at natus dolorem odio veritatis. Quaerat quae eum unde
          reprehenderit!
        </p>
      </div>
      <div>
        <div className="row text-center p-4  font-bold">
          <div className="col">
            <FontAwesomeIcon icon={faLocationDot} />
            123 Main Street, Apt 4B, Anytown, CA 91234
          </div>
          <div className="col">
            <FontAwesomeIcon icon={faPhone} />
            +91 9874561230
          </div>
          <div className="col">
            <FontAwesomeIcon icon={faMessage} />
            Bookstore@gmail.com
          </div>
        </div>
        <div className="row">
          <div className="col-6 m-4">
             <div className="bg-gray-200 p-8 rounded shadow-md w-full max-w-md ">
    <h2 className="text-center text-lg font-semibold mb-6">Send me Message</h2>

   
      <input
        type="text"
        placeholder="Name"
        className="w-full p-3 rounded border  focus:ring-1  bg-white"
        required
      />

      <input
        type="email"
        placeholder="Email Id"
        className="w-full p-3 rounded border  focus:ring-1 bg-white"
        required
      />

      <textarea
        rows="6"
        placeholder="Message"
        className="w-full p-3 rounded border focus:outline-none focus:ring-2 bg-white"
        required
      ></textarea>

      <button
        type="submit"
        className="bg-gray-900 text-white w-full py-3 rounded flex items-center justify-center gap-2-800 transition"
      >
        Send <i className="fas fa-paper-plane"></i>
      </button>
   
  </div>


          </div>
          <div className="col m-4">
            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3945.793203404306!2d76.93963047477428!3d8.519448591522979!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1758641126463!5m2!1sen!2sin" width="500" height="450"  allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </div>
      </div>
     
    </>
  );
};

export default Contact;
