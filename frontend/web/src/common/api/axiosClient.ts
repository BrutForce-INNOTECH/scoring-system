import axios from "axios";

const API_BASE_URL = '/api'

const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 1000000,
});

export default axiosClient;