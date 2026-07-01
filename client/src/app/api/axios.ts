import axios from "axios";

const backendURL = "http://localhost:5000";
const api = axios.create({
  baseURL: backendURL,
  withCredentials: true,
});

export const setAuthTokenHeader = (token: string | null) => {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
    return;
  }

  delete api.defaults.headers.common.Authorization;
};

export default api;
