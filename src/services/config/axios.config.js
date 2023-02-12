import axios from 'axios';

// Default config for AXIOS 
export default axios.create(
    {
        baseURL: 'http://localhost:3000/api',
        responseType: 'json',
        timeout: 6000
    }
)    