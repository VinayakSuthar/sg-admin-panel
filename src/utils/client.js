import axios from 'axios';

const client = axios.create({
  baseURL: import.meta.env.VITE_URL,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`,
  },
});

export default client;
