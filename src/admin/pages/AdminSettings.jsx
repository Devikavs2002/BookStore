import React, { useEffect, useState } from "react";
import AdminHeader from "../components/AdminHeader";
import AdminSideBar from "../components/AdminSideBar";
import EditProfile from "../../components/EditProfile";
import { updateProfile } from "../../services/allApi";

const AdminSettings = () => {
  let userDetails = localStorage.getItem("user");
  userDetails = JSON.parse(userDetails);

  const [previw, setPreview] = useState("");
  const [id,setId]=useState('')
 
  useEffect(()=>{
     setId(userDetails._id)
  })
  const [profileData, setProfileData] = useState({
    userName: userDetails.userName,
    email: userDetails.email,
    password: userDetails.password,
    profile: userDetails.profile,
    cnfpswd: userDetails.password,
    bio: userDetails.bio,
  });

  const onResetClick = () => {
    setProfileData({
      userName: "",
      email: userDetails.email,
      password: "",
      profile: "",
      cnfpswd: "",
      bio: userDetails.bio,
    });
  };
  console.log(profileData);

  const handleFileChange = (file) => {
    console.log(file);

    setPreview(URL.createObjectURL(file));
    setProfileData({...profileData,profile:file})
  };
  const onUpdateClick=async()=>{
    let reqBody=new FormData()
      reqBody.append("userName",profileData.userName),
         reqBody.append("email",profileData.email),
            reqBody.append("password",profileData.password),
            reqBody.append("profile",profileData.profile),
               reqBody.append("bio",profileData.bio)

if(profileData.userName==""||profileData.password==""||profileData.cnfpswd==""){
  alert("Please Fill the Form")
}else{
 
  if(profileData.password==profileData.cnfpswd){
     // proceed to apicall
     let token=localStorage.getItem("token")
     let reqHeader={
       authorization: `Bearer ${token}`,
      'Content-Type':'multipart/form-data'
     }
     let apiResponse=await updateProfile(reqBody,reqHeader,id)
 if(apiResponse.status==200){
  localStorage.setItem('user',JSON.stringify(apiResponse.data))
  alert("Successfully Updated")
 }else{
  alert(apiResponse.data.message)
 }

  }else{
    alert("Password Incorrect")
  }
}
    

  }

  return (
    <>
      <AdminHeader />
      <div className="grid grid-cols-[1fr_5fr]">
        <div>
          <AdminSideBar />
        </div>
        <div>
          <h1 className="text-xl bg-center text-center">Settings</h1>
          <div className="grid grid-cols-[1fr_1fr] gap-5 items-center ">
            <div>
              <p className="p-2 ms-3">
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

            <div className="bg-blue-300 text-center me-2 ">
              <div className="text-center m-10">
                <label htmlFor="img">
                  <input
                    style={{ display: "none" }}
                    type="file"
                    id="img"
                    accept="image/png ,image/jpeg ,image/jpg"
                    onChange={(e) => handleFileChange(e.target.files[0])}
                  />
                  {previw ? (
                    <img
                      className="w-50 rounded-2xl inline-block"
                      src={previw}
                      alt=""
                    />
                  ) : (
                    <img
                      className="w-50 rounded-2xl inline-block"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7csvPWMdfAHEAnhIRTdJKCK5SPK4cHfskow&s"
                      alt=""
                    />
                  )}
                </label>
              </div>
              <div className="">
                <input
                  onChange={(e) =>
                    setProfileData({ ...profileData, userName: e.target.value })
                  }
                  value={profileData.userName}
                  className="  text-white p-3  mb-4 rounded border  "
                  type="text"
                  placeholder="FullName"
                />
                <input
                  onChange={(e) =>
                    setProfileData({ ...profileData, password: e.target.value })
                  }
                  value={profileData.password}
                  className=" text-white p-3 mb-4 rounded border m-5"
                  type="password"
                  placeholder="Password"
                />
                <input
                  onChange={(e) =>
                    setProfileData({ ...profileData, cnfpswd: e.target.value })
                  }
                  value={profileData.cnfpswd}
                  className=" text-white p-3 mb-4 rounded border"
                  type="password"
                  placeholder="Re Enter Password"
                />
              </div>
              <div className="flex ms-4 gap-2">
                <button
                  onClick={onResetClick}
                  className="bg-amber-500 mb-5 p-2 rounded text-xl hover:bg-amber-50 hover:text-black "
                >
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
