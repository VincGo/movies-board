import React, {useEffect, useRef, useState} from 'react';
import moviesService from "../../services/moviesService";
import Card from "../../components/Card/Card";
import Title from "../../components/Title/Title";
import {IoIosSearch} from "react-icons/io"

const Home = () => {
    const [movies, setMovies] = useState([])
    const [categoriesArr, setCategoriesArr] = useState([])
    const title = useRef()
    const date = useRef()
    const categories = useRef()

    useEffect(() => {
        moviesService.showAllMovies()
            .then((data) => setMovies(data))
            .catch((err) => console.log(err))
        moviesService.getAllCategories()
            .then((data) => setCategoriesArr(data.genres))
            .catch((err) => console.log(err))
    }, [])

    function deleteCard(delete_id) {
        const newMoviesArr = movies.filter(m => m.id !== delete_id)
        setMovies(newMoviesArr)
    }

    function filterMovie(e) {
        e.preventDefault()
        const currentTitle = title.current.value
        const currentDate = date.current.value
        const currentCategories = categories.current.value

        if(currentTitle){
            setMovies(currentMovies => currentMovies.filter(x => x.title === currentTitle))
        }

        if(currentDate){
            setMovies(currentMovies => currentMovies.filter(x => x.release_date === currentDate))
        }

        if(currentCategories !== "Catégories") {
            const arr = []
            for (let i=0; i<movies.length; i++) {
                for(let j=0; j<movies[i].categories.length; j++){
                    if(movies[i].categories[j] === currentCategories) {
                        arr.push(movies[i])
                    }
                }
            }
            setMovies(arr)
        }
    }

    return (
        <div>
            <Title title={"Affichage de tous les films"}/>
            <form id={"search"}>
                <input type="text" placeholder={"Titre du film"} ref={title}/>
                <input type="date" ref={date}/>
                <select name="categories" id="categories" ref={categories}>
                    <option>Catégories</option>
                    {categoriesArr.map((c) => <option key={c.id} value={c.name}>{c.name}</option>)}
                </select>
                <button onClick={filterMovie}><IoIosSearch /></button>
            </form>
            <div id={"allCardMovie"}>
                {movies && movies.map((movie) => <Card key={movie.id} movie={movie} delete_id={deleteCard}/>)}
            </div>
        </div>
    );
};

export default Home;