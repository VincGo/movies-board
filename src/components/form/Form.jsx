import React, {useEffect, useRef, useState} from 'react';
import moviesService from "../../services/moviesService";
import ActorsForm from "./ActorsForm";
import SimilarMovieForm from "./SimilarMovieForm";

const Form = ({movie}) => {
    const [movieData, setMovieData] = useState("")
    const [actorsData, setActorsData] = useState([])
    const [similarMovie, setSimilarMovie] = useState([])

    const title = useRef()
    const release_date = useRef()
    const categoriesArray = useRef()
    const description = useRef()
    const poster = useRef()
    const backdrop = useRef()

    useEffect(() => {
        setMovieData(movie)
    }, [movie])

    //Ajoute un film dans la DB
    function sendForm(e) {
        const categories = categoriesArray.current.value.split(",")

        //Création d'un objet avec les données du film
        const data = {
            title: title.current.value,
            release_date: release_date.current.value,
            categories: categories,
            description: description.current.value,
            poster: poster.current.value,
            backdrop: backdrop.current.value,
            actors: actorsData,
            similar_movies: similarMovie
        }

        moviesService.add(data)
            .then((data) => console.log(data))
            .catch((err) => console.log(err))

        e.preventDefault()
    }

    //Récupère les données du components ActorsForm et enregistre dans actorData
    function getActorsData(data) {
        setActorsData(data)
    }

    //Récupère les données du components SimilarMovieForm et enregistre dans similarMovie
    function getSimilarMovieData(data) {
        setSimilarMovie(data)
    }

    return (
        <form style={{display: "inline-grid"}}>
            <input type="text" placeholder={"Titre"} defaultValue={movieData && movieData.title} ref={title}/>
            <input type="date" placeholder={"Date"} defaultValue={movieData && movieData.release_date}
                   ref={release_date}/>
            <input type="text" placeholder={"Catégories"} ref={categoriesArray}/>
            <input type="textarea" placeholder={"Description"} defaultValue={movieData && movieData.overview}
                   ref={description}/>
            <input type="url" placeholder={"Poster"} defaultValue={movieData && movieData.poster_path} ref={poster}/>
            <input type="url" placeholder={"Backdrop"} defaultValue={movieData && movieData.backdrop_path}
                   ref={backdrop}/>

            <label>Acteurs:</label>
            <ActorsForm actorsData={getActorsData}/>

            <label htmlFor="similarMovies">Films similaires:</label>
            <SimilarMovieForm similarMovieData={getSimilarMovieData}/>

            <button onClick={sendForm}>Valider</button>
        </form>
    );
};

export default Form;