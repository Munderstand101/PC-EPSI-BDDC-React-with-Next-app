import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { createMovie } from '../../services/movieService';

function CreateMovieModal({ show, handleClose, fetchMovies }) {
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const submitData = {
            ...formData,
            runtime: parseInt(formData.runtime, 10),
            year: parseInt(formData.year, 10),
            genres: formData.genres.split(',').map(genre => genre.trim()),
            cast: formData.cast.split(',').map(member => member.trim()),
            languages: formData.languages.split(',').map(language => language.trim()),
            countries: formData.countries.split(',').map(country => country.trim()),
            directors: formData.directors.split(',').map(director => director.trim()),
            awards: JSON.parse(formData.awards),
            imdb: JSON.parse(formData.imdb),
            tomatoes: JSON.parse(formData.tomatoes),
            num_mflix_comments: parseInt(formData.num_mflix_comments, 10),
        };

        // try {
            await createMovie(submitData);
            fetchMovies();
            handleClose();
        // } catch (error) {
        //     console.error("Failed to create movie:", error);
        //     // Optionally, set an error state here to display an error message
        // }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Create New Movie</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    {Object.entries(formData).map(([key, value]) => (
                        <Form.Group className="mb-3" controlId={`form${key}`} key={key}>
                            <Form.Label>{key.charAt(0).toUpperCase() + key.slice(1)}</Form.Label>
                            <Form.Control
                                as={['fullplot', 'awards', 'imdb', 'tomatoes'].includes(key) ? 'textarea' : 'input'}
                                rows={['fullplot', 'awards', 'imdb', 'tomatoes'].includes(key) ? 3 : undefined}
                                name={key}
                                value={value}
                                onChange={handleChange}
                                placeholder={`Enter ${key}`}
                                type={['released', 'lastupdated'].includes(key) ? 'date' : 'text'}
                            />
                        </Form.Group>
                    ))}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
                <Button variant="primary" onClick={handleSubmit}>Save</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default CreateMovieModal;
