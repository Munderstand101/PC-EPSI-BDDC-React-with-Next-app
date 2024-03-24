import React, { useState, useEffect } from 'react';

function MovieForm({ onSubmit, initialData = {} }) {
    const [formData, setFormData] = useState({
        title: '',
        directors: [''],
        poster: '',
        genres: [''],
        cast: [''],
        runtime: '',
        plot: '',
        fullplot: '',
        year: '',
        languages: [''],
        released: '',
        rated: '',
        awards: { wins: '', nominations: '', text: '' },
        countries: [''],
        type: '',
        ...initialData,
    });

    useEffect(() => {
        setFormData({
            ...formData,
            ...initialData,
            directors: Array.isArray(initialData.directors) ? initialData.directors.join(', ') : '',
            genres: Array.isArray(initialData.genres) ? initialData.genres.join(', ') : '',
            cast: Array.isArray(initialData.cast) ? initialData.cast.join(', ') : '',
            languages: Array.isArray(initialData.languages) ? initialData.languages.join(', ') : '',
            countries: Array.isArray(initialData.countries) ? initialData.countries.join(', ') : '',
        });
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const submitData = {
            ...formData,
            runtime: parseInt(formData.runtime, 10),
            year: parseInt(formData.year, 10),
            directors: formData.directors.split(',').map(item => item.trim()),
            genres: formData.genres.split(',').map(item => item.trim()),
            cast: formData.cast.split(',').map(item => item.trim()),
            languages: formData.languages.split(',').map(item => item.trim()),
            countries: formData.countries.split(',').map(item => item.trim()),
            // Ensure proper conversion for other fields as needed
        };
        onSubmit(submitData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="title">Title</label>
                <input id="title" type="text" className="form-control" name="title" value={formData.title} onChange={handleChange} />

                <label htmlFor="directors">Director(s) - comma separated</label>
                <input id="directors" type="text" className="form-control" name="directors" value={formData.directors} onChange={handleChange} />

                <label htmlFor="poster">Poster URL</label>
                <input id="poster" type="text" className="form-control" name="poster" value={formData.poster} onChange={handleChange} />

                <label htmlFor="genres">Genres - comma separated</label>
                <input id="genres" type="text" className="form-control" name="genres" value={formData.genres} onChange={handleChange} />

                <label htmlFor="cast">Cast - comma separated</label>
                <input id="cast" type="text" className="form-control" name="cast" value={formData.cast} onChange={handleChange} />

                <label htmlFor="runtime">Runtime (minutes)</label>
                <input id="runtime" type="number" className="form-control" name="runtime" value={formData.runtime} onChange={handleChange} />

                <label htmlFor="plot">Plot</label>
                <textarea id="plot" className="form-control" name="plot" rows="3" value={formData.plot} onChange={handleChange}></textarea>

                <label htmlFor="fullplot">Full Plot</label>
                <textarea id="fullplot" className="form-control" name="fullplot" rows="5" value={formData.fullplot} onChange={handleChange}></textarea>

                <label htmlFor="year">Year</label>
                <input id="year" type="number" className="form-control" name="year" value={formData.year} onChange={handleChange} />

                <label htmlFor="languages">Languages - comma separated</label>
                <input id="languages" type="text" className="form-control" name="languages" value={formData.languages} onChange={handleChange} />

                <label htmlFor="released">Released</label>
                <input id="released" type="date" className="form-control" name="released" value={formData.released} onChange={handleChange} />

                <label htmlFor="rated">Rated</label>
                <input id="rated" type="text" className="form-control" name="rated" value={formData.rated} onChange={handleChange} />

                <label htmlFor="countries">Countries - comma separated</label>
                <input id="countries" type="text" className="form-control" name="countries" value={formData.countries} onChange={handleChange} />

                <label htmlFor="type">Type</label>
                <input id="type" type="text" className="form-control" name="type" value={formData.type} onChange={handleChange} />

                {/* Simplified input fields for awards, considering to expand as per your need */}
                <label htmlFor="awardsWins">Awards Wins</label>
                <input id="awardsWins" type="number" className="form-control" name="awardsWins" value={formData.awards.wins} onChange={(e) => setFormData({ ...formData, awards: { ...formData.awards, wins: e.target.value }})} />

                <label htmlFor="awardsNominations">Awards Nominations</label>
                <input id="awardsNominations" type="number" className="form-control" name="awardsNominations" value={formData.awards.nominations} onChange={(e) => setFormData({ ...formData, awards: { ...formData.awards, nominations: e.target.value }})} />

                <label htmlFor="awardsText">Awards Text</label>
                <input id="awardsText" type="text" className="form-control" name="awardsText" value={formData.awards.text} onChange={(e) => setFormData({ ...formData, awards: { ...formData.awards, text: e.target.value }})} />
            </div>

            <button type="submit" className="btn btn-success">Submit</button>
        </form>
    );
}

export default MovieForm;
