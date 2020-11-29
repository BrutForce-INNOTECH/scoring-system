import axios from "axios";
import {API_BASE_URL} from "@common/api/_constants";



const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 1000000,
});

export default axiosClient;