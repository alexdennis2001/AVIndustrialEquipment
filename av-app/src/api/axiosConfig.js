import axios from 'axios';

// Create an Axios instance
const api = axios.create({
  baseURL: 'http://137.184.3.233/',
  headers: {
    'Content-Type': 'application/json',
    // Any other common headers
  },
  timeout: 10000,  // Set timeouts if necessary
});

export default api;
