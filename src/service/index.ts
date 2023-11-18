import TSRequest from "./request";
import { BASE_URL, TIME_OUT } from "./config";

const tsRequest = new TSRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  // interceptors: {
  //   requestSuccess: (config) => { return config },
  //   requestFailure: (error) => { return error },
  //   responseSuccess: (res) => { return res },
  //   responseFailure: (error) => { return error }
  // }
});

export default tsRequest;