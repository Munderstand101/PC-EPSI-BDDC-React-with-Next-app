// In your React app, for example src/movieAPI.js
import axios from 'axios';

const MovieAPI = axios.create({
    baseURL: 'http://localhost:3000/api/',
});

export default MovieAPI;
