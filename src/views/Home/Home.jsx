import React, {useEffect, useState} from 'react';
import moviesService from "../../services/moviesService";
import Card from "../../components/Card/Card";
import Title from "../../components/Title/Title";
import {IoIosSearch} from "react-icons/io"

const Home = () => {

    const [movies, setMovies] = useState([])

    useEffect(() => {
        moviesService.showAllMovies()
            .then((data) => setMovies(data))
            .catch((err) => console.log(err))
    }, [])

    return (
        <div>
            <Title title={"Affichage de tous les films"}/>
            <form id={"search"}>
                <input type="text" placeholder={"Titre du film"}/>
                <input type="date"/>
                <input type="select" placeholder={"Catégories"}/>
                <button><IoIosSearch /></button>
            </form>
            <div id={"allCardMovie"}>
                {movies && movies.map((movie) => <Card key={movie.id} movie={movie}/>)}
            </div>
        </div>
    );
};

export default Home;