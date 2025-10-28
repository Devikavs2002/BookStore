import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { createUser, googleLogin, loginUser } from "../services/AllApi"
import { Bounce, ToastContainer, toast } from "react-toastify";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const Auth = ({ insideRegister }) => {
  const navigate = useNavigate();
  const [formData, setformData] = useState({
    userName: "",
    password: "",
    email: "",
  });
  const resgisterUser = async () => {6
    console.log("first")
    try {
      let apiResponse = await createUser(formData);
      if (apiResponse.status == 201) {
        toast("Successfully Registered");
      } else {
        toast(apiResponse.response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
    setformData({
      userName: "",
      password: "",
      email: "",
    });
  };
  const loginBtnClick = async () => {
    try {
      let apiResponse = await loginUser(formData);
      if (apiResponse.status == 200) {
        toast("Successfully Logined");
        console.log(apiResponse);

        localStorage.setItem("token", apiResponse.data.token);
        localStorage.setItem("user", JSON.stringify(apiResponse.data.user));

        if (apiResponse.data.user.email == "admin@gmail.com") {
          // navigate to admin home

          navigate("admin-home");
        } else {
          // navigate to user home
          navigate("/");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleGAuthDecode = async (googleToken) => {
    const decoded = jwtDecode(googleToken);
    console.log(decoded);

    let reqBody = {
      userName: decoded.name,
      email: decoded.email,
      profile: decoded.picture,
    };

    let apiResponse = await googleLogin(reqBody);
    console.log(apiResponse);

    if (apiResponse.status == 200 || apiResponse.status == 201) {
      localStorage.setItem("token", apiResponse.data.token);
      localStorage.setItem("user", JSON.stringify(apiResponse.data.user));
      navigate("/");
    } else {
      toast(apiResponse.response.data.message);
    }
  };
  return (
    <>
      <div id="AuthBg">
        <div className="row ">
          <div className="col"></div>
          <div className="col mt-5 items-center">
            <h1 className="text-4xl  mb-11 text-center text-white">
              BOOK STORE
            </h1>
            <div className="bg-gray-900 p-8 rounded-lg  relative ">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 flex items-center justify-center "></div>
              </div>
              <h2 className="text-center text-white  mb-6">
                {insideRegister ? "Register" : "Login"}
              </h2>
              {insideRegister ? (
                <input
                  value={formData.userName}
                  onChange={(e) =>
                    setformData({ ...formData, userName: e.target.value })
                  }
                  type="text"
                  placeholder="UserName"
                  className="w-full p-3 mb-4 rounded border text-white "
                />
              ) : (
                ""
              )}
              <input
                value={formData.email}
                onChange={(e) =>
                  setformData({ ...formData, email: e.target.value })
                }
                type="email"
                placeholder="Email"
                className="w-full p-3 mb-4 rounded border text-white "
              />
              <input
                value={formData.password}
                onChange={(e) =>
                  setformData({ ...formData, password: e.target.value })
                }
                type="password"
                placeholder="Password"
                className="w-full p-3 mb-4 rounded border  text-white "
              />
              {insideRegister ? (
                <button
                  onClick={resgisterUser}
                  type="submit"
                  className="w-full bg-green-600 text-white py-2 rounded "
                >
                  Register
                </button>
              ) : (
                <button
                  onClick={loginBtnClick}
                  type="submit"
                  className="w-full bg-green-600 text-white py-2 rounded "
                >
                  Login
                </button>
              )}
              <h6 className="text-white text-2xl">
                -------------------------------------or--------------------------------------
              </h6>
              {/* google auth */}
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  console.log(credentialResponse);
                  handleGAuthDecode(credentialResponse.credential);
                }}
                onError={() => {
                  console.log("Login Failed");
                }}
              />
              ;
              {insideRegister ? (
                <div className="flex m-4 gap-3">
                  <h6 className="text-white">Already a User ? </h6>
                  <Link className="text-blue-600" to={"/login"}>
                    {" "}
                    Click Here to Login
                  </Link>
                </div>
              ) : (
                <div className="flex m-4 gap-3">
                  <h6 className="text-white">Are you a new User ? </h6>
                  <Link className="text-blue-600" to={"/register"}>
                    {" "}
                    Click here to Register
                  </Link>
                </div>
              )}
            </div>
          </div>

          <div className="col"></div>
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
};

export default Auth;
