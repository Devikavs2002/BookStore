import axios from "axios";

const commonApi = async (reqMethod, url, reqbody, reqHeader) => {
  let configObj = {
    method: reqMethod,
    data: reqbody,
    url: url,
    headers: reqHeader,
  };
  console.log(configObj);
  return await axios(configObj)
    .then((res) => {
      return res;
    })

    .catch((err) => {
      return err;
    });
};
export default commonApi;
