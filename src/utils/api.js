import axios from 'axios';

const api = axios.create({
  baseURL: "https://hardware.cyclic.app",
});

api.interceptors.request.use(
  config => {
    const tokenMalfomed = localStorage.getItem('token');
    const token = tokenMalfomed.slice(1, -1);
    if (tokenMalfomed) {
      console.log("toooooooooooooooooooooooooooo", token)
      config.headers.token = `${token}`;
    }
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

api.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    const { status, data } = error.response;
    if (status === 401 && data.message === 'Invalid token') {
      // Clear localStorage
      localStorage.clear();
    }
    return Promise.reject(error);
  }
);

export default api;
