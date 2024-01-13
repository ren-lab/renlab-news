// api.ts
import axios, { AxiosInstance, AxiosResponse } from 'axios';

const api: AxiosInstance = axios.create({
  // baseURL: 'https://api.example.com', // Replace with your API base URL
  timeout: 5000, // Set a timeout for requests
});

// Example API call function
export const fetchData = async (): Promise<AxiosResponse> => {
  try {
    const response = await api.get('/data');
    return response;
  } catch (error) {
    throw error;
  }
};

export default api;

