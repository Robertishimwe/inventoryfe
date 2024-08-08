import axios from "axios";

const headers = {};
if (localStorage.loggedinUser) {
  const loggedinUser = JSON.parse(localStorage.loggedinUser);
  console.log("token in use>>>>>>>",loggedinUser.token);
  headers.token = `${loggedinUser.token}`;
}

export default axios.create({  
  baseURL: "https://laughing-space-bassoon-9x457r7pp9vc7xq4-3002.app.github.dev",
  headers,
});
