import React from 'react';

const Card = ({movie}) => {
    const overview = movie.description.slice(0, 100)

    const d = new Date(movie.release_date)
    const dataFr = d.toLocaleDateString('fr')

    return (
        <a className={"cardMovie"} href={`movies/${movie.id}`}>
            <img src={movie.poster} alt={movie.title}/>
            <p className={"cardTitle"}>{movie.title}</p>
            <p className={"cardDate"}>{dataFr}</p>
            {overview && <p className={"cardDescription"}>{overview} ...</p>}
            <button>Modifier</button>
            <button>Supprimer</button>
        </a>
    );
};

export default Card;