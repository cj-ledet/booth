import axios from "axios";

export default axios.create({
  baseURL: "http://www.boothtickets.com/api",
  headers: {
    "Content-type": "application/json"
  }
});
