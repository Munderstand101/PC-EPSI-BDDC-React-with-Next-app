// src/movieService.js
import MovieAPI from '../api/movieAPI';

const createMovie = (movieData) => MovieAPI.post('movies', movieData);
const getAllMovies = () => MovieAPI.get('movies');
const getMovieById = (id) => MovieAPI.get(`movie/${id}`); // Ensure this matches your MovieAPI route
const updateMovieById = (id, updateData) => MovieAPI.put(`movie/${id}`, updateData);
const deleteMovieById = (id) => MovieAPI.delete(`movie/${id}`);

export { createMovie, getAllMovies, getMovieById, updateMovieById, deleteMovieById };
