import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  console.log("========== API REQUEST ==========");
  console.log("URL:", config.url);
  console.log("TOKEN:", token);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log("Authorization header added");
  } else {
    console.log("No token found");
  }

  return config;
});

export default api;