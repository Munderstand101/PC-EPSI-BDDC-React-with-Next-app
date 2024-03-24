import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { updateMovieById } from '../../services/movieService';

function UpdateMovieModal({ show, handleClose, currentMovie, fetchMovies }) {
    const [formData, setFormData] = useState({
        title: '',
        plot: '',
        genres: '',
        runtime: '',
        cast: '',
        poster: '',
        fullplot: '',
        languages: '',
        released: '',
        directors: '',
        rated: '',
        awards: JSON.stringify({ wins: 0, nominations: 0, text: '' }),
        year: '',
        imdb: JSON.stringify({ rating: 0, votes: 0, id: '' }),
        countries: '',
        type: '',
        tomatoes: JSON.stringify({
            viewer: { rating: 0, numReviews: 0, meter: 0 },
            fresh: 0,
            critic: { rating: 0, numReviews: 0, meter: 0 },
            rotten: 0,
            lastUpdated: ''
        }),
        num_mflix_comments: '',
    });
    const [error, setError] = useState('');

    useEffect(() => {
        if (currentMovie) {
            setFormData({
                ...currentMovie,
                genres: currentMovie.genres?.join(', ') || '',
                cast: currentMovie.cast?.join(', ') || '',
                directors: currentMovie.directors?.join(', ') || '',
                languages: currentMovie.languages?.join(', ') || '',
                countries: currentMovie.countries?.join(', ') || '',
                awards: JSON.stringify(currentMovie.awards || { wins: 0, nominations: 0, text: '' }),
                imdb: JSON.stringify(currentMovie.imdb || { rating: 0, votes: 0, id: '' }),
                tomatoes: JSON.stringify(currentMovie.tomatoes || {
                    viewer: { rating: 0, numReviews: 0, meter: 0 },
                    fresh: 0,
                    critic: { rating: 0, numReviews: 0, meter: 0 },
                    rotten: 0,
                    lastUpdated: ''
                }),
                released: currentMovie.released ? currentMovie.released.substring(0, 10) : '',
                lastupdated: currentMovie.lastupdated ? currentMovie.lastupdated.substring(0, 10) : '',
            });
        }
    }, [currentMovie]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async () => {
        if (!currentMovie?._id) return;

        const submitData = {
            ...formData,
            runtime: parseInt(formData.runtime, 10),
            year: parseInt(formData.year, 10),
            genres: formData.genres.split(',').map(item => item.trim()),
            cast: formData.cast.split(',').map(item => item.trim()),
            directors: formData.directors.split(',').map(item => item.trim()),
            languages: formData.languages.split(',').map(item => item.trim()),
            countries: formData.countries.split(',').map(item => item.trim()),
            awards: JSON.parse(formData.awards),
            imdb: JSON.parse(formData.imdb),
            tomatoes: JSON.parse(formData.tomatoes),
            num_mflix_comments: parseInt(formData.num_mflix_comments, 10),
        };

        // try {
            await updateMovieById(currentMovie._id, submitData);
            fetchMovies();
            handleClose();
        // } catch (error) {
        //     console.error("Failed to update movie:", error);
        //     setError('Failed to update movie. Please check the form data and try again.');
        // }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Update Movie</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error && <Alert variant="danger">{error}</Alert>}
                {Object.entries(formData).map(([key, value]) => {
                    if (key === 'awards' || key === 'imdb' || key === 'tomatoes') {
                        return (
                            <Form.Group controlId={`form${key}`} key={key}>
                                <Form.Label>{key.charAt(0).toUpperCase() + key.slice(1)}</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    name={key}
                                    value={value}
                                    onChange={handleChange}
                                    placeholder={`Enter ${key}`}
                                />
                            </Form.Group>
                        );
                    } else {
                        return (
                            <Form.Group controlId={`form${key}`} key={key}>
                                <Form.Label>{key.charAt(0).toUpperCase() + key.slice(1)}</Form.Label>
                                <Form.Control
                                    as={key === 'fullplot' ? 'textarea' : 'input'}
                                    rows={key === 'fullplot' ? 3 : undefined}
                                    name={key}
                                    value={value}
                                    onChange={handleChange}
                                    placeholder={`Enter ${key}`}
                                    type={key === 'released' || key === 'lastupdated' ? 'date' : 'text'}
                                />
                            </Form.Group>
                        );
                    }
                })}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
                <Button variant="primary" onClick={handleSubmit}>Save Changes</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default UpdateMovieModal;
