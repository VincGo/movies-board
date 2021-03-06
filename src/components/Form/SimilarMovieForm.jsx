import React, {useEffect, useState} from 'react';
import produce from "immer";
import {IoIosAddCircle, IoIosCloseCircle} from "react-icons/io";
import moviesService from "../../services/moviesService";

const SimilarMovieForm = ({similarMovieData, movie_id}) => {
    const [similarMovie, setSimilarMovie] = useState([])

    //Ajouts de nouveaux champs pour la création d'acteur
    function newSimilarMovie(e) {
        setSimilarMovie(currentSimilarMovie => [...currentSimilarMovie, {
            title: "",
            poster: "",
            release_date: ""
        }])
        e.preventDefault()
    }

    useEffect(() => {
        similarMovieData(similarMovie)
    }, [similarMovieData, similarMovie])

    useEffect(() => {
        if (window.location.pathname === "/ajout-d-un-film") {
            moviesService.getSimilarsMovies(movie_id)
                .then((data) => {
                    const arr = []
                    const similar = data.results
                    if (similar.length > 0) {
                        for (let i = 0; i < 4; i++) {
                            arr.push({
                                title: similar[i].title,
                                poster: "https://image.tmdb.org/t/p/w500" + similar[i].poster_path,
                                release_date: similar[i].release_date
                            })
                        }
                        setSimilarMovie(arr)
                    }
                })
                .catch((err) => console.log(err))
        } else {
            if (movie_id) {
                moviesService.show(movie_id)
                    .then((data) => setSimilarMovie(data.similar_movies))
                    .catch((err) => console.log(err))
            }
        }
    }, [movie_id])

    return (
        <div>
            {similarMovie.map((a, index) =>
                <div key={index} className={"input"}>
                    <input type="text" placeholder={"Titre du film"} defaultValue={a.title} onChange={e => {
                        const title = e.target.value
                        setSimilarMovie(currentSimilarMovie => produce(currentSimilarMovie, v => {
                            v[index].title = title
                        }))
                    }}/>
                    <input type="url" placeholder={"Affiche"} required={false} defaultValue={a.poster} onChange={e => {
                        const poster = e.target.value
                        setSimilarMovie(currentSimilarMovie => produce(currentSimilarMovie, v => {
                            v[index].poster = poster
                        }))
                    }}/>
                    <input type="date" placeholder={"Date de sortie"} defaultValue={a.release_date} onChange={e => {
                        const release_date = e.target.value
                        setSimilarMovie(currentSimilarMovie => produce(currentSimilarMovie, v => {
                            v[index].release_date = release_date
                        }))
                    }}/>
                    <IoIosCloseCircle onClick={(e) => {
                        e.preventDefault()
                        setSimilarMovie(currentActors => currentActors.filter(x => x.title !== a.title))
                    }}/>
                </div>
            )}
            <IoIosAddCircle onClick={newSimilarMovie}/>
        </div>
    );
};

export default SimilarMovieForm;