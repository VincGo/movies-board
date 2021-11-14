import React, {useEffect, useState} from 'react';
import Title from "../../components/Title/Title";
import {useParams} from "react-router-dom";
import moviesService from "../../services/moviesService";
import Delete from "../../components/Delete/Delete";

const Movie = () => {
    //Récupère l'id dans l'url
    const {id} = useParams()
    const [movie, setMovie] = useState([])

    const d = new Date(movie.release_date)
    const dataFr = d.toLocaleDateString('fr')

    useEffect(() => {
        moviesService.show(id)
            .then((data) => setMovie(data))
            .catch((err) => console.log(err))
    }, [id])

    return (
        <div id={"movie"}>
            <Title title={movie.title}/>
            <div id={"moviePresentation"}>
                <img src={movie.poster} alt={movie.title}/>
                <div id={"moviePresentationText"}>
                    <p><span>Date de sortie: </span>{dataFr}</p>
                    <p><span>Acteurs: </span>{movie.actors && movie.actors.map((actor) => actor.name + ', ')}</p>
                    <p><span>Catégories: </span>{movie.categories && movie.categories.map((category) => category + ', ')}</p>
                </div>
            </div>
            <h2>Synopsis</h2>
            <p>{movie.description}</p>
            <p>{!movie.description && "Il n'y a pas de résumé pour ce film pour le moment."}</p>
            {!movie.similar_movies && <h2>Films similaires</h2>}
            <section>
                {movie.similar_movies && movie.similar_movies.map((similar, index) =>
                    <div key={index}>
                        <img src={similar.poster} alt={similar.title}/>
                        <p>{similar.title}</p>
                        <p className={"cardDate"}>{similar.release_date}</p>
                    </div>
                )}
            </section>
            <Delete id={id} />
        </div>
    );
};

export default Movie;