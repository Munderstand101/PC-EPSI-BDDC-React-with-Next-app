import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { createMovie } from '../../services/movieService';

function CreateMovieModal({ show, handleClose, fetchMovies }) {
    const [formData, setFormData] = useState({
        title: '',
        director: '',
        genres: '',
        cast: '',
        plot: '',
        year: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Convertir les genres et le cast en tableau si c'est nécessaire pour votre MovieAPI
        const submitData = {
            ...formData,
            genres: formData.genres.split(',').map(genre => genre.trim()),
            cast: formData.cast.split(',').map(member => member.trim()),
            year: parseInt(formData.year, 10) // Assurez-vous que l'année est un nombre
        };
        await createMovie(submitData);
        fetchMovies();
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Créer un nouveau film</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Titre</Form.Label>
                        <Form.Control type="text" name="title" value={formData.title} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Réalisateur</Form.Label>
                        <Form.Control type="text" name="director" value={formData.director} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Genres (séparés par des virgules)</Form.Label>
                        <Form.Control type="text" name="genres" value={formData.genres} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Acteurs (séparés par des virgules)</Form.Label>
                        <Form.Control type="text" name="cast" value={formData.cast} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Intrigue</Form.Label>
                        <Form.Control as="textarea" rows={3} name="plot" value={formData.plot} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Année</Form.Label>
                        <Form.Control type="number" name="year" value={formData.year} onChange={handleChange} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Fermer
                </Button>
                <Button variant="primary" type="submit" onClick={handleSubmit}>
                    Sauvegarder
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default CreateMovieModal;
