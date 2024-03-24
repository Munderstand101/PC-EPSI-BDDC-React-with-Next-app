import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <h1>Welcome to the Movie App!</h1>
            <Link to="/movies">View Movies</Link>
        </div>
    );
};

export default Home;
