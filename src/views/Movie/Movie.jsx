import React, {useEffect, useState} from 'react';
import Title from "../../components/Title/Title";
import {useParams} from "react-router-dom";
import moviesService from "../../services/moviesService";

const Movie = () => {

    //Récupère l'id dans l'url
    const {id} = useParams()
    const [movie, setMovie] = useState([])

    useEffect(() => {
        moviesService.show(id)
            .then((data) => setMovie(data))
            .catch((err) => console.log(err))
    }, [])

    return (
        <div id={"movie"}>
            <Title title={movie.title}/>
            <div id={"moviePresentation"}>
                <img src={movie.poster} alt={movie.title}/>
                <div id={"moviePresentationText"}>
                    <p><span>Date de sortie: </span>{movie.release_date}</p>
                    <p><span>Acteurs: </span>{movie.actors && movie.actors.map((actor) => actor.name + ', ')}</p>
                    <p><span>Catégories: </span>{movie.categories && movie.categories.map((category) => category + ', ')}</p>
                </div>
            </div>
            <h2>Synopsis</h2>
            <p>{movie.description}</p>
            <h2>Films similaires</h2>
            <section>
                {movie.similar_movies && movie.similar_movies.map((similar, index) =>
                    <div key={index}>
                        <img src={similar.poster} alt={similar.title}/>
                        <p>{similar.title}</p>
                        <p className={"cardDate"}>{similar.release_date}</p>
                    </div>
                )}
            </section>
        </div>
    );
};

export default Movie;