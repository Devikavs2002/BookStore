import React, { useEffect } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "flowbite-react";

import { useState } from "react";
import Profile from "../pages/Profile";
import { updateProfile } from "../services/allApi";

const EditProfile = () => {
  const [openModal, setOpenModal] = useState(true);
  const [userDetails, setUserDetails] = useState({});
  const [pswd, setPswd] = useState("");
  const [repPswd, setRepPswd] = useState("");
  const [preview, setPreview] = useState("");
  const [token, setToken] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"));
    setId(user._id);
    if (user) {
      setUserDetails(user);
    }
    let token1 = localStorage.getItem("token");
    setToken(token1);
  }, []);

  const handleFileChange = (file) => {
    console.log(file);
    setUserDetails({ ...userDetails, Profile: file });
    let url = URL.createObjectURL(file);
    setPreview(url);
  };
  const handleSave = async () => {
    if (pswd == repPswd) {
      // Proceed to api call
      let reqHeader = {
        authorization: `Bearer ${token}`,
      };
      setUserDetails({ ...userDetails, password: pswd });
      if (preview) {
        // Proceed as formdata
        let reqBody = new FormData();
        for (let key in userDetails) {
          reqBody.append(key, userDetails[key]);
        }
        let apiResponse = await updateProfile(reqBody, reqHeader,id);
        console.log(apiResponse);
      } else {
        // Proceed as normal json data
        let { bio, email, password, Profile, userName } = userDetails;
        let apiResponse = await updateProfile(
          { bio, email, password, Profile, userName },
          reqHeader,id
        );
        console.log(apiResponse);
      }
    } else {
      alert("Password MissMatch");
    }
  };

  return (
    <>
      <Button className="text-black ms-4" onClick={() => setOpenModal(true)}>
        Edit
      </Button>
      <Modal
        className="mx-100"
        dismissible
        show={openModal}
        onClose={() => setOpenModal(false)}
      >
        <ModalHeader>Edit User Profile</ModalHeader>
        <ModalBody>
          <div className="space-y-6 ms-4 me-4">
            {/* <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              With less than a month to go before the European Union enacts new consumer privacy laws for its citizens,
              companies around the world are updating their terms of service agreements to comply.
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant
              to ensure a common set of data rights in the European Union. It requires organizations to notify users as
              soon as possible of high-risk data breaches that could personally affect them.
            </p> */}
            <label htmlFor="img">
              <input
                onChange={(e) => handleFileChange(e.target.files[0])}
                style={{ display: "none" }}
                accept="image/jpg image/png image/jpeg"
                type="file"
                id="img"
              />
              {preview ? (
                <img className="w-25 rounded" src={preview} alt="" />
              ) : (
                <img
                  className="w-25"
                  src="https://cdn-icons-png.flaticon.com/512/8136/8136031.png"
                  alt=""
                />
              )}
            </label>
            <input
              onChange={(e) =>
                setUserDetails({ ...userDetails, userName: e.target.value })
              }
              value={userDetails?.userName}
              type="text"
              placeholder="Name"
              className="w-full p-2 mb-4 rounded border text-black "
            />
            <input
              onChange={(e) =>
                setUserDetails({ ...userDetails, email: e.target.value })
              }
              type="email"
              value={userDetails?.email}
              placeholder="Email Id"
              className="w-full p-2 mb-4 rounded border text-black "
            />
            <input
              type="password"
              value={userDetails?.password}
              onChange={(e) => setPswd(e.target.value)}
              placeholder=" New Password"
              className="w-full p-2 mb-4 rounded border text-black "
            />
            <input
              value={userDetails?.password}
              type="password"
              onChange={(e) => setRepPswd(e.target.value)}
              placeholder="Repeatt New Password"
              className="w-full p-2 mb-4 rounded border text-black "
            />
            <textarea
              onChange={(e) =>
                setUserDetails({ ...userDetails, bio: e.target.value })
              }
              placeholder="Profile Bio"
              value={userDetails?.bio}
              className="w-full p-2 mb-4 rounded border text-black "
              name=""
              id=""
            ></textarea>
          </div>
        </ModalBody>
        <ModalFooter className="ms-4 gap-2 mb-4">
          <Button
            className="text-black bg-green-700 rounded"
            onClick={handleSave}
          >
            Save Changes
          </Button>
          <Button
            className="text-black bg-orange-700 rounded"
            onClick={() => setOpenModal(false)}
          >
            Decline
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default EditProfile;
