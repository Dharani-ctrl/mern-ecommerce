import axios from 'axios';

const axiosi = axios.create({
  baseURL: process.env.API_BASE_URL || 'http://localhost:8000', // Set backend base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export { axiosi };
