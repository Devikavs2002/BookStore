import { BaseUrl } from "./bseUrl";
import commonApi from "./commonApi";

export const createUser = async (reqBody) => {
  return await commonApi("post", `${BaseUrl}/register`, reqBody);
};

export const loginUser = async (reqBody) => {
  return await commonApi("post", `${BaseUrl}/login`, reqBody);
};

export const googleLogin = async (reqBody) => {
  return await commonApi("post", `${BaseUrl}/googleAuth`, reqBody);
};

export const createBook = async (reqBody, header) => {
  return await commonApi("post", `${BaseUrl}/createBooks`, reqBody, header);
};

export const getAllbooks = async (reqHeader, SearchKey) => {
  return await commonApi(
    "get",
    `${BaseUrl}/getAllbooks/?search=${SearchKey}`,
    "",
    reqHeader
  );
};

export const getHomeBooks = async () => {
  return await commonApi("get", `${BaseUrl}/getHomeBook`, "");
};

export const updateProfile = async (reqBody, reqHeader) => {
  return await commonApi(
    "put",
    `${BaseUrl}/:${id}/updateUser`,
    reqBody,
    reqHeader
  );
};

export const getUserBooks = async (reqHeader) => {
  return await commonApi("get", `${BaseUrl}/getUserBooks`, "", reqHeader);
};

export const getSingleBook = async (id, reqHeader) => {
  return await commonApi(
    "get",
    `${BaseUrl}/${id}/getSingleBook`,
    "",
    reqHeader
  );
};

export const getAllUsers = async (reqHeader) => {
  return await commonApi("get", `${BaseUrl}/allUsers`, "", reqHeader);
};

export const getAllJobs = async (reqHeader) => {
  return await commonApi("get", `${BaseUrl}/getAlljobs`, "", reqHeader);
};

export const addNewJob = async (reqBody,reqHeader) => {
  return await commonApi("post", `${BaseUrl}/createJob`,reqBody , reqHeader);
};

export const deleteJob = async (id,reqHeader) => {
  return await commonApi("delete", `${BaseUrl}/${id}/deleteJob`,{} , reqHeader);
};

export const applyJob=async(reqBody,reqHeader)=>{
  return await commonApi("post",`${BaseUrl}/addApplictaion`,reqBody,reqHeader)
}

export const viewApplicants=async(reqHeader)=>{
  return await commonApi("get",`${BaseUrl}/viewApplicantions`,reqHeader)
}
