import axios from 'axios';

const httpClient = axios.create({
    baseURL: process.env.VUE_APP_BASE_URL,
    timeout: 1000,
    headers: {}
});

httpClient.interceptors.response.use(
      (response) => {
            return response
      },
      (error) => Promise.reject(error),
);

export default httpClient;