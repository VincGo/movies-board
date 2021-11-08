import React from 'react';

const Card = ({movie}) => {
    return (
        <div>
            <img src={movie.poster} alt={movie.title}/>
            <p>{movie.title}</p>
            <p>{movie.release_date}</p>
            <p>{movie.description}</p>
            <button>Modifier</button>
            <button>Supprimer</button>
        </div>
    );
};

export default Card;