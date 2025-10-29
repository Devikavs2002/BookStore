import React, { useState } from "react";
import AdminHeader from "../components/AdminHeader";
import AdminSideBar from "../components/AdminSideBar";

const AdminSettings = () => {
  const [profileData, setProfileData] = useState({
    userName: "",
    email: "",
    password: "",
    profile: "",
    cnfpswd:"",
    bio: "",
  });
  return (
    <>
      <AdminHeader />
      <div className="grid grid-cols-[1fr_5fr]">
        <div>
          <AdminSideBar />
        </div>
        <div>
          <h1 className="text-xl bg-center">Settings</h1>
          <div className="grid grid-cols-[1fr_1fr] gap-5 items-center ">
            <div>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor
                cupiditate veniam maiores animi vel incidunt modi quidem et eos.
                Id repellat aliquid aliquam beatae, quas sed repellendus
                aspernatur similique voluptas. Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Ipsam vel velit id fugit unde
                quasi quae soluta assumenda eum impedit quas quis adipisci,
                sapiente deleniti voluptatibus qui necessitatibus, asperiores
                eveniet. Lorem ipsum dolor sit amet, consectetur adipisicing
                elit. Delectus labore tempora inventore dolorem harum odio
                consequuntur aliquid natus, alias, beatae earum nobis. Facere
                animi ullam, quaerat provident alias dicta odio! Lorem ipsum,
                dolor sit amet consectetur adipisicing elit. Quisquam, sint?
                Est, dolorem sapiente. Praesentium reiciendis corrupti optio,
                alias id ea tempora, accusantium excepturi architecto fuga
                officia illum libero veritatis similique.
              </p>
            </div>

            <div className="bg-blue-300 text-center">
              <div className="text-center m-10">
                <label htmlFor="img">
                  <input style={{ display: "none" }} type="file" id="img" />
                  <img
                    className="w-50 rounded-2xl inline-block"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7csvPWMdfAHEAnhIRTdJKCK5SPK4cHfskow&s"
                    alt=""
                  />
                </label>
              </div>
              <input
                onChange={(e) =>
                  setProfileData({ ...profileData, userName: e.target.value })
                }
                   value={profileData.userName}
                className=" text-white p-3 mb-4 rounded border"
                type="text"
                placeholder="FullName"
              />
              <input
               onChange={(e) =>
                  setProfileData({ ...profileData, password: e.target.value })}
                     value={profileData.password}
                className=" text-white p-3 mb-4 rounded border m-5"
                type="password"
                placeholder="Password"
              />
              <input
               onChange={(e) =>
                  setProfileData({ ...profileData,cnfpswd: e.target.value })}
                  value={profileData.cnfpswd}
                className=" text-white p-3 mb-4 rounded border"
                type="password"
                placeholder="Re Enter Password"
              />
              <div className="flex justify-between">
                <button className="bg-amber-500 mb-5 p-2 rounded text-xl hover:bg-amber-50 hover:text-black ">
                  Reset
                </button>
                <button className="bg-green-800 mb-5 p-2 rounded text-xl  hover:bg-amber-50 hover:text-black ">
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminSettings;
