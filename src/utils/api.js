import axios from "axios";

const headers = {};
if (localStorage.loggedinUser) {
  const loggedinUser = JSON.parse(localStorage.loggedinUser);
  console.log("token in use>>>>>>>",loggedinUser.token);
  headers.token = `${loggedinUser.token}`;
}

export default axios.create({  
  baseURL: "https://hardwarems-3.onrender.com",
  headers,
});
