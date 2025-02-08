import axios from 'axios';

const axiosi = axios.create({
  baseURL: process.env.API_BASE_URL || 'https://mern-ecommerce-api-nu.vercel.app/', // Set backend base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export { axiosi };
