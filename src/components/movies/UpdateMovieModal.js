import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { updateMovieById } from '../../services/movieService';

function UpdateMovieModal({ show, handleClose, currentMovie, fetchMovies }) {
    const [formData, setFormData] = useState({
        title: '',
        // Ajoutez les autres champs nécessaires
    });

    useEffect(() => {
        if (currentMovie) {
            setFormData(currentMovie);
        }
    }, [currentMovie]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async () => {
        if (!currentMovie?._id) return;
        await updateMovieById(currentMovie._id, formData);
        fetchMovies();
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Mettre à jour le film</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* Exemple de champ de formulaire */}
                <Form.Group controlId="formTitle">
                    <Form.Label>Titre</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Entrez le titre"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                    />
                </Form.Group>
                {/* Ajoutez d'autres champs de formulaire ici */}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Fermer
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Sauvegarder les changements
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default UpdateMovieModal;
