import axios from "axios";

const REMOTE_URL = "http://82.148.19.167"

// Set config defaults when creating the instance
export const apiClient = axios.create({
  baseURL: REMOTE_URL,
  timeout: 1000000
});