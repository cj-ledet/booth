import axios from "axios";

export default axios.create({
  baseURL: "http://ec2-54-241-133-168.us-west-1.compute.amazonaws.com:8080/api",
  headers: {
    "Content-type": "application/json"
  }
});
