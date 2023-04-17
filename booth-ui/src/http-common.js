import axios from "axios";

export default axios.create({
  baseURL: "https://boothtickets.com:443/api",
  headers: {
    "Content-type": "application/json"
  }
});
