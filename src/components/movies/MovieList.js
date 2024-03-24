// src/components/MovieList.js
import React from 'react';

function MovieList({ movies, onDelete, onEdit }) {
    return (
        <div className="row">
            {movies.map(movie => (
                <div key={movie._id} className="col-md-4 mb-3">
                    <div className="card h-100">
                        <img src={movie.poster} className="card-img-top" alt={movie.title} />
                        <div className="card-body">
                            <h5 className="card-title">{movie.title}</h5>
                            <p className="card-text">{movie.plot}</p>
                            <p className="card-text"><small className="text-muted">Director(s): {movie.directors.join(", ")}</small></p>
                            {/* Include more details as needed */}
                        </div>
                        <div className="card-footer">
                            <button className="btn btn-primary mr-2" onClick={() => onEdit(movie)}>Edit</button>
                            <button className="btn btn-danger" onClick={() => onDelete(movie._id)}>Delete</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default MovieList;
