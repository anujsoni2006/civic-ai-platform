import axios from "axios";

const API = axios.create({
  baseURL: "http://10.161.184.99:5000/api",
});

export default API;
