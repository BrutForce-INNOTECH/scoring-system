import axios from "axios";

const REMOTE_URL = "https://brutforce.kvandake.ru"

// Set config defaults when creating the instance
export const apiClient = axios.create({
  baseURL: REMOTE_URL,
  timeout: 1000000
});

export const convertResponse = (data: string): string => {
  return data.replace(/'/g, '"')
}