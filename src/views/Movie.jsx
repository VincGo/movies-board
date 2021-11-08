import React, {useEffect, useState} from 'react';
import Title from "../components/Title";
import {useParams} from "react-router-dom";
import moviesService from "../services/moviesService";

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
        <div>
            <Title title={"Movie"}/>
            <p>{movie.title}</p>
            <img src={movie.poster} alt={movie.title}/>
            <p>{movie.release_date}</p>
            <p>{movie.actors && movie.actors.map((actor) => actor.name + ', ')}</p>
            <p>{movie.categories && movie.categories.map((category) => category + ', ')}</p>
            <p>{movie.description}</p>
            <p>{movie.similar_movies && movie.similar_movies.map((similar) => similar.title + ', ')}</p>
        </div>
    );
};

export default Movie;