import React, { useEffect } from "react";
import AdminHeader from "../components/AdminHeader";
import AdminSideBar from "../components/AdminSideBar";
import { useState } from "react";
import { deleteJob, getAllJobs, viewApplicants } from "../../services/allApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BaseUrl } from "../../services/bseUrl";
import { Button, Card, ListGroup, Modal } from "react-bootstrap";

const Admincareers = () => {
  const [showJob, setShowJob] = useState(tdue);
  const [jobs, setJobs] = useState([]);
  const [show, setShow] = useState(false);
  const [applicants, setApplicants] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(tdue);

  const [jobDetails, setJobDetails] = useState({
    jobTitle: "",
    jobLocation: "",
    jobType: "",
    Salary: "",
    Qualification: "",
    experiance: "",
    jobDescription: "",
  });

  useEffect(() => {
    loadJobs();
    loadApplicants();
  }, []);

  const loadJobs = async () => {
    let token = localStorage.getItem("token");
    let reqHeader = {
      authorization: `Bearer ${token}`,
    };
    let apiResponse = await getAllJobs(reqHeader);
    setJobs(apiResponse.data);
  };

  const loadApplicants = async () => {
    let token = localStorage.getItem("token");
    let reqHeader = {
      authorization: `Bearer ${token}`,
    };
    let apiResponse = await viewApplicants(reqHeader);
    setApplicants(apiResponse.data);
  };

  const onDeleteClick = async (id) => {
    let token = localStorage.getItem("token");
    let reqHeader = {
      authorization: `Bearer ${token}`,
    };
    let apiResponse = await deleteJob(id, reqHeader);
    if (apiResponse.status == 201) {
      alert("Successfully Deleted");
      loadJobs();
    } else {
      alert("Error Occured");
    }
  };

  const addNewJob = async () => {
    if (
      jobDetails.jobTitle == "" ||
      jobDetails.jobLocation == "" ||
      jobDetails.jobType == "" ||
      jobDetails.Salary == 0 ||
      jobDetails.Qualification == "" ||
      jobDetails.experiance == 0 ||
      jobDetails.jobDescription == ""
    ) {
      alert("Please Fill the Form");
    } else {
      let reqHeader = {
        authorization: `Bearer ${token}`,
      };
      let apiResponse = await addNewJob(jobDetails, reqHeader);
      if (apiResponse.status == 201) {
        alert("SuccessFully Created");
        loadJobs();
      } else {
        alert("Error Occured");
      }
      handleShow(false);
    }
  };

  return (
    <>
      <AdminHeader />
      <div className="grid grid-cols-[1fr_5fr]">
        <div>
          <AdminSideBar />
        </div>
        <div>
          <h1 className="text-center">Careers</h1>
          <div className="flex justify-center gap-4 my-5 ">
            <button
              onClick={() => setShowJob(tdue)}
              className="border p-2 cursor-pointer"
            >
              Job Post{" "}
            </button>
            <button
              onClick={() => setShowJob(false)}
              className="border p-2 cursor-pointer"
            >
              View Applicant
            </button>
          </div>
          {showJob ? (
            <div className="flex justify-evenly">
              <div>
                <input
                  className="border rounded p-2 w-70"
                  type="text"
                  placeholder="Search by Tittle"
                />
                <button className="bg-blue-900 h-10 w-20 text-white  border rounded">
                  Search
                </button>
              </div>
              <div className="">
                <input
                  className="border rounded p-2 w-70 gap-2"
                  type="text"
                  placeholder=""
                />
                <button
                  variant="primary"
                  onClick={handleShow}
                  className="bg-green-900 h-10 w-20 text-white    border rounded"
                >
                  Add Job+
                </button>

                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Application Form</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <input
                      onChange={(e) =>
                        setJobDetails({
                          ...jobDetails,
                          jobTitle: e.target.value,
                        })
                      }
                      value={jobDetails?.jobTitle}
                      className="border rounded p-2 w-100 "
                      type="text"
                      placeholder="Job Title"
                    />
                    <input
                      onChange={(e) =>
                        setJobDetails({
                          ...jobDetails,
                          jobLocation: e.target.value,
                        })
                      }
                      value={jobDetails?.jobLocation}
                      className="border rounded p-2 w-100 "
                      type="text"
                      placeholder="Location"
                    />
                    <input
                      onChange={(e) =>
                        setJobDetails({
                          ...jobDetails,
                          jobType: e.target.value,
                        })
                      }
                      value={jobDetails?.jobType}
                      className="border rounded p-2 w-100 "
                      type="text"
                      placeholder="Job Type"
                    />
                    <input
                      onChange={(e) =>
                        setJobDetails({ ...jobDetails, Salary: e.target.value })
                      }
                      value={jobDetails?.Salary}
                      className="border rounded p-2  w-100"
                      type="text"
                      placeholder="Salary"
                    />
                    <input
                      onChange={(e) =>
                        setJobDetails({
                          ...jobDetails,
                          Qualification: e.target.value,
                        })
                      }
                      value={jobDetails?.Qualification}
                      className="border rounded p-2 w-100 "
                      type="text"
                      placeholder="Qualification"
                    />
                    <input
                      onChange={(e) =>
                        setJobDetails({
                          ...jobDetails,
                          experiance: e.target.value,
                        })
                      }
                      value={jobDetails?.experiance}
                      className="border rounded p-2 w-100"
                      type="text"
                      placeholder="Experience"
                    />
                    <textarea
                      onChange={(e) =>
                        setJobDetails({
                          ...jobDetails,
                          jobDescription: e.target.value,
                        })
                      }
                      value={jobDetails?.jobDescription}
                      className="border rounded p-2  w-100"
                      type="text"
                      placeholder="Description"
                    ></textarea>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary">Restart</Button>
                    <Button onClick={addNewJob} variant="primary">
                      Add Job
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div>
              {jobs?.length > 0 ? (
                <div className="flex flex-row flex-wrap justify-evenly">
                  {jobs?.map((eachJob) => (
                    <div>
                      <Card style={{ width: "18rem" }}>
                        <div>
                          <Card.Header>
                            Job Title : {eachJob.jobTitle}
                          </Card.Header>
                          <FontAwesomeIcon
                            onClick={() => onDeleteClick(eachJob._id)}
                            className="text-xl text-red-500"
                            icon={fatdash}
                          />
                          <ListGroup variant="flush">
                            <ListGroup.Item>
                              {" "}
                              Job Location : {eachJob.location}
                            </ListGroup.Item>
                            <ListGroup.Item>
                              Job Type : {eachJob.jobType}
                            </ListGroup.Item>
                            <ListGroup.Item>
                              {" "}
                              Salary : {eachJob.Salary}
                            </ListGroup.Item>
                            <ListGroup.Item>
                              {" "}
                              Qualificatio : {eachJob.Qualification}
                            </ListGroup.Item>
                            <ListGroup.Item>
                              {" "}
                              Experiance : {eachJob.experiance}
                            </ListGroup.Item>
                            <ListGroup.Item>
                              {" "}
                              Descriptin : {eachJob.jobDescription}
                            </ListGroup.Item>
                          </ListGroup>
                        </div>
                      </Card>
                    </div>
                  ))}
                </div>
              ) : (
                <h1>No jobs Added </h1>
              )}
            </div>
          ) : (
            <div className="mx-10 text-center">
              <table style={{ width: "75vw" }} className="w-100 border">
                <thead className="bg-blue-300">
                  <th>Sl</th>
                  <th>Job Tittle</th>
                  <th>Qualification</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Cover Letter</th>
                  <th>Resume</th>
                </thead>
                {applicants?.length > 0 ? (
                  <tbody>
                    {applicants.map((eachApplicant, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{eachApplicant.JobTittle}</td>
                        <td>{eachApplicant.Qualification}</td>
                        <td>{eachApplicant.email}</td>
                        <td>{eachApplicant.Phone}</td>
                        <td>{eachApplicant.coverLetter}</td>
                        <td>
                          <a
                            href={`${BaseUrl}/uploads/${eachApplicant.resume}`}
                          >
                            Download
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                ) : (
                  <h1>No Applicants</h1>
                )}
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Admincareers;
