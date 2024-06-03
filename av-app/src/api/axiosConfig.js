import axios from 'axios';

// Create an Axios instance
const api = axios.create({
  baseURL: 'https://localhost:7112/',
  headers: {
    'Content-Type': 'application/json',
    // Any other common headers
  },
  timeout: 10000,  // Set timeouts if necessary
});

export default api;
