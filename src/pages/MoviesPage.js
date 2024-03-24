// src/components/MoviesPage.js
import React, { useState, useEffect } from 'react';
import {createMovie, deleteMovieById, getAllMovies, updateMovieById} from "../services/movieService";
import MovieForm from "../components/movies/MovieForm";
import {Button} from "react-bootstrap";
import MovieList from "../components/movies/MovieList";
import CreateMovieModal from "../components/movies/CreateMovieModal";
import UpdateMovieModal from "../components/movies/UpdateMovieModal";


const MoviesPage = () => {
    const [movies, setMovies] = useState([]);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [currentMovie, setCurrentMovie] = useState({});
    const [error, setError] = useState('');

    useEffect(() => {
        fetchMovies();
    }, []);

    const fetchMovies = async () => {
        try {
            const response = await getAllMovies();

            if (Array.isArray(response.data.data)) {
                setMovies(response.data.data);
                setError('');
            } else {
                console.error("Unexpected response structure:", response.data);
                setError('Failed to fetch movies due to unexpected response structure.');
            }
        } catch (error) {
            console.error("Failed to fetch movies:", error);
            setError('Failed to fetch movies.');
        }
    };


    const handleCreateOrUpdate = async (movieData) => {
        try {
            if (movieData._id) {
                await updateMovieById(movieData._id, movieData);
            } else {
                await createMovie(movieData);
            }
            fetchMovies();
            setCurrentMovie({});
            setError('');
        } catch (error) {
            console.error("Failed to create/update movie:", error);
            setError('Failed to create/update movie.');
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteMovieById(id);
            fetchMovies();
            setError('');
        } catch (error) {
            console.error("Failed to delete movie:", error);
            setError('Failed to delete movie.');
        }
    };

    // const handleEdit = (movie) => {
    //     setCurrentMovie(movie);
    // };
    const handleEdit = (movie) => {
        setCurrentMovie(movie);
        setShowUpdateModal(true); // Show the update modal directly when editing
    };


    const handleShowCreateModal = () => setShowCreateModal(true);
    const handleCloseCreateModal = () => setShowCreateModal(false);

    const handleShowUpdateModal = (movie) => {
        setCurrentMovie(movie);
        setShowUpdateModal(true);
    };

    const handleCloseUpdateModal = () => setShowUpdateModal(false);

    return (
        <div className="container mt-5">
            {error && <div className="alert alert-danger" role="alert">{error}</div>}
            {/*<MovieForm onSubmit={handleCreateOrUpdate} initialData={currentMovie} />*/}
            <Button variant="primary" onClick={handleShowCreateModal}>
                Ajouter un film
            </Button>

            <hr />
            <MovieList movies={movies} onDelete={handleDelete} onEdit={handleEdit} />

            <CreateMovieModal
                show={showCreateModal}
                handleClose={handleCloseCreateModal}
                fetchMovies={fetchMovies}
            />

            {showUpdateModal && (
                <UpdateMovieModal
                    show={showUpdateModal}
                    handleClose={handleCloseUpdateModal}
                    currentMovie={currentMovie}
                    onSubmit={handleCreateOrUpdate} // Assuming UpdateMovieModal uses this prop for form submission
                    fetchMovies={fetchMovies}
                />
            )}

        </div>
    );
};

export default MoviesPage;
