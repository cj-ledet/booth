import axios from "axios";

export default axios.create({
  baseURL: "http://54.241.133.168:8080/api",
  headers: {
    "Content-type": "application/json"
  }
});
