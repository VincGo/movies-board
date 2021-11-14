import React, { useRef, useState} from 'react';
import moviesService from "../../services/moviesService";
import ActorsForm from "./ActorsForm";
import SimilarMovieForm from "./SimilarMovieForm";
import Categories from "./Categories";
import {useNavigate} from "react-router-dom";

const Form = ({movie}) => {
    const [actorsData, setActorsData] = useState([])
    const [similarMovie, setSimilarMovie] = useState([])
    const [categoriesData, setCategoriesData] = useState(null)

    const title = useRef()
    const release_date = useRef()
    const description = useRef()
    const poster = useRef()
    const backdrop = useRef()

    const navigate = useNavigate()

    //Ajoute un film dans la DB
    function sendForm(e) {
        //Création d'un objet avec les données du film

        const posterString = poster.current.value.substring(0, 1)
        const backdropString = backdrop.current.value.substring(0, 1)

        const data = {
            title: title.current.value,
            release_date: release_date.current.value,
            categories: categoriesData,
            description: description.current.value,
            poster: posterString === "/" ? "https://image.tmdb.org/t/p/w500" + poster.current.value : poster.current.value,
            backdrop: backdropString === "/" ? "https://image.tmdb.org/t/p/w500" + backdrop.current.value : backdrop.current.value,
            actors: actorsData,
            similar_movies: similarMovie
        }

        if(window.location.pathname === "/ajout-d-un-film") {
            moviesService.add(data)
                .then(() => navigate("/"))
                .catch((err) => console.log(err))
        } else {
            moviesService.edit(movie.id, data)
                .then(() => navigate("/"))
                .catch((err) => console.log(err))
        }
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

    function getCategoriesData (data) {
        setCategoriesData(data)
    }

    return (
        <form id={"form"}>
            <label>Titre</label>
            <input type="text" defaultValue={movie && movie.title} ref={title}/>
            <label>Date de sortie</label>
            <input type="date" defaultValue={movie && movie.release_date}
                   ref={release_date}/>

           <Categories movie_id={movie.id} categoriesData={getCategoriesData} />

            <label>Description</label>
            <textarea ref={description} defaultValue={movie.overview || movie.description}/>
            <label>Affiche</label>
            <input type="url" defaultValue={movie && movie.poster} ref={poster}/>
            <label>Backdrop</label>
            <input type="url" defaultValue={movie && movie.backdrop} ref={backdrop}/>

            <label>Acteurs:</label>
            <ActorsForm actorsData={getActorsData} movie_id={movie.id}/>

            <label htmlFor="similarMovies">Films similaires:</label>
            <SimilarMovieForm similarMovieData={getSimilarMovieData} movie_id={movie.id}/>

            <button onClick={sendForm}>Valider</button>
        </form>
    );
};

export default Form;