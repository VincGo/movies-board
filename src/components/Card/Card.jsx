import React from 'react';
import Delete from "../Delete/Delete";

const Card = ({movie, delete_id}) => {
    //limiter la taille de la description
    const overview = movie.description.slice(0, 100)
    //changer le format de la date (dd/mm/yyyy)
    const d = new Date(movie.release_date)
    const dataFr = d.toLocaleDateString('fr')

    function getId(id) {
        delete_id(id)
    }

    return (
        <a className={"cardMovie"} href={`movies/${movie.id}`}>
            <img src={movie.poster} alt={movie.title}/>
            <p className={"cardTitle"}>{movie.title}</p>
            <p className={"cardDate"}>{dataFr}</p>
            {overview && <p className={"cardDescription"}>{overview} ...</p>}
            <div className={"updateDelete"}>
                <button>Modifier</button>
                <Delete id={movie.id} delete_id={getId}/>
            </div>
        </a>
    );
};

export default Card;