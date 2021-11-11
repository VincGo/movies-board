import React, {useEffect, useState} from 'react';
import moviesService from "../services/moviesService";
import Card from "../components/Card";
import Title from "../components/Title";

const Home = () => {

    const [movies, setMovies] = useState([])

    useEffect(() => {
        moviesService.showAllMovies()
            //.then((data) => setMovies(data))
            .then((data) => console.log(data))
            .catch((err) => console.log(err))
    }, [])

    return (
        <div>
            <Title title={"Affichage de tous les films"}/>
            {movies && movies.map((movie) => <Card key={movie.id} movie={movie}/>)}
        </div>
    );
};

export default Home;