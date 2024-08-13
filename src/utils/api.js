import axios from "axios";

const headers = {};
if (localStorage.loggedinUser) {
  const loggedinUser = JSON.parse(localStorage.loggedinUser);
  console.log("token in use>>>>>>>",loggedinUser.token);
  headers.token = `${loggedinUser.token}`;
}

export default axios.create({
  baseURL: "https://supreme-giggle-4r9vj5q77wph757v-3002.app.github.dev",
  headers,
});
