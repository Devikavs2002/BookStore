import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faArrowsTurnRight,
  faLocationPinLock,
} from "@fortawesome/free-solid-svg-icons";
import { addNewJob, applyJob } from "../services/allApi";

const Careers = () => {
  const [showModal, setShowModal] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [applicantData, setApplicantData] = useState({
    fullName: "",
    jobTitle: "",
    Qualification: "",
    email: "",
    phone: "",
    coverLetter: "",
    resume: "",
  });

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    let token = localStorage.getItem("token");
    let reqHeader = {
      authorization: `Bearer ${token}`,
    };
    let apiResponse = await getAllJobs(reqHeader);
    setJobs(apiResponse.data);
  };

  const showModalFn=(jobTitle)=>{
    setApplicantData({...applicantData,jobTitle:jobTitle})
    setShowModal(true)
  }

  const onApplyClick = async () => {
    if(applicantData.jobTitle==""||applicantData.phone==""||applicantData.Qualification==""||applicantData.coverLetter==""||applicantData.email==""||applicantData.fullName==""||applicantData.resume==""){
      alert("Please Fill the Form")
    }else{

    
    let reqHeader = {
       "Content-Type": "multipart/form-data",
    
    };
    let reqBody= new FormData()
    for(let key in applicantData){
      reqBody.append(key,applicantData[key])
    }

      let apiResponse=await applyJob(reqBody,reqHeader)
      if(apiResponse.status==201){
        alert("SuccessFully Applied")
      }else{
        alert("Something went Wrong")
      }
      setShowModal(false)
    }
  };

  return (
    <>
      <Header />
      <div className="text-center m-4 p-5">
        <h2 className="mt-8 ">Careers</h2>
        <p className="text-center">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis
          similique illum rerum! Tempora esse aspernatur impedit animi labore
          minus est voluptate, a veniam recusandae fugit quibusdam tenetur quo
          dolorum porro? Lorem ipsum, dolor sit amet consectetur adipisicing
          elit. Iure est, ab enim rerum ipsum, quam explicabo autem quas cum
          debitis at natus dolorem odio veritatis. Quaerat quae eum unde
          reprehenderit! Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Fugiat magni aut enim labore quae nesciunt sed assumenda ea
          eligendi! Ea, laboriosam impedit nemo eos architecto tenetur ducimus
          quas pariatur voluptatem.
        </p>

        <h2 className="text-start m-4 p-5">Current Openings</h2>

        <div className="flex justify-center items-center ">
          <input
            type="text"
            placeholder="Search by Title"
            className="w-70 p-3 mb-4 border  text-black "
          />
          <button
            type="submit"
            className="w-17 h-15 mb-4 bg-green-600 text-white py-2  "
          >
            Search
          </button>
        </div>
        {/* card */}
        {jobs?.length > 0 ? (
          <div className="mx-40">
            {jobs?.map((eachJob) => {
              <div className="p-5 shadow rounded">
                <div className="grid grid-cols-[8fr_1fr">
                  <div>
                    <h1 className="text-xl">{eachJob.jobTitle}</h1>
                    <hr className='"border-grey-300 mt-3' />
                    <div className=" text-end ">
                      <button
                        onClick={() => setShowModal(eachJob.jobTitle)}
                        type="button"
                        className="bg-blue-500 px-4 py-3 rounded text-white ms-48"
                      >
                        Apply <FontAwesomeIcon icon={faArrowsTurnRight} />
                      </button>
                    </div>
                    <div className="text-start">
                      <FontAwesomeIcon icon={faLocationPinLock} />
                      Location : {eachJob.jobLocation}
                      <h6>Job Type : {eachJob.jobType}</h6>
                      <h6>Salary : {eachJob.Salary}</h6>
                      <h6>Qualification : {eachJob.Qualification}</h6>
                      <h6>Experience : {eachJob.experiance}</h6>
                      <h6>Description : {eachJob.jobDescription}</h6>
                    </div>
                  </div>
                </div>
              </div>;
            })}
          </div>
        ) : (
          <h1 className="mt-5">No Jobs Founded</h1>
        )}
      </div>

      {showModal ? (
        <div
          open={showModal}
          onClose={() => setShowModal(false)}
          className="relative z-10"
        >
          <div
            transition
            className="fixed inset-0 bg-gray-900/50 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
          />

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div>
                <div className="flex justify-between w-2xl bg-gray-500 p-4">
                  <h2>Application Form</h2>
                  <button
                    className="cursor-pointer"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
                <div className="bg-white p-2">
                  <div className="flex justify-evenly">
                    <input
                      onChange={(e) =>
                        setApplicantData({
                          ...applicantData,
                          fullName: e.target.value,
                        })
                      }
                      value={applicantData.fullName}
                      className="border rounded p-2"
                      placeholder="Full Name"
                      type="text"
                    />
                    <input
                      onChange={(e) =>
                        setApplicantData({
                          ...applicantData,
                          Qualification: e.target.value,
                        })
                      }
                      value={applicantData.Qualification}
                      className="border rounded p-2"
                      placeholder="Qualification"
                      type="text"
                    />
                  </div>

                  <div className="flex justify-evenly">
                    <input
                      onChange={(e) =>
                        setApplicantData({
                          ...applicantData,
                          email: e.target.value,
                        })
                      }
                      value={applicantData.email}
                      className="border rounded p-2 mt-2"
                      placeholder="Email Id"
                      type="text"
                    />
                    <input
                      onChange={(e) =>
                        setApplicantData({
                          ...applicantData,
                          phone: e.target.value,
                        })
                      }
                      value={applicantData.phonee}
                      className="border rounded p-2 mt-2"
                      placeholder="Phone Number"
                      type="text"
                    />
                  </div>
                  <textarea
                    onChange={(e) =>
                      setApplicantData({
                        ...applicantData,
                        coverLetter: e.target.value,
                      })
                    }
                    value={applicantData.coverLetter}
                    placeholder="cover Letter"
                    className="mt-2 border"
                    cols={60}
                    name=""
                    id=""
                  ></textarea>
                  <br />
                  <div>
                    <label htmlFor="">Resume :-</label>
                    <input
                      onChange={(e) =>
                        setApplicantData({
                          ...applicantData,
                          resume: e.target.files[0],
                        })
                      }
                      type="file"
                      name=""
                      id=""
                    />
                  </div>
                </div>
                <div className="bg-gray-400 flex justify-end gap-5">
                  <button
                    onClick={onApplyClick}
                    className="bg-orange-700 p-2 rounded border"
                  >
                    Submit
                  </button>
                  <button className="bg-blue-700 p-2 rounded border">
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Careers;
