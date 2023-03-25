import axios from "axios";

export default axios.create({
  baseURL: "https://www.boothtickets.com:8080/api",
  headers: {
    "Content-type": "application/json"
  }
});
