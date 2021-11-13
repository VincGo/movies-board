import React, {useEffect, useRef, useState} from 'react';
import moviesService from "../../services/moviesService";

const Categories = ({movie_id, categoriesData}) => {
    const [categories, setCategories] = useState([])
    const categoriesArray = useRef()
    const category = categories.map((c) => c)

    useEffect(() => {
        getCategoriesMovie(movie_id)
    }, [movie_id])

    useEffect(() => {
        categoriesData(categories)
    }, [categoriesData, categories])

    function updateCategories () {
        const categories = categoriesArray.current.value.split(",")
        setCategories(categories)
    }

    //Récupère les catégories d'un film via l'ID du film
    function getCategoriesMovie(movies_id) {
        moviesService.getCategoriesMovie(movies_id)
            .then((data) => {
                const arr = []
                for (let i=0; i<data.genres.length; i++) {
                    arr.push(data.genres[i].name)
                }
                setCategories(arr)
            })
            .catch((err) => console.log(err))
    }
    return (
        <>
            <label>Catégories</label>
            <input type="text" placeholder={"action, aventure, comédie, ..."} ref={categoriesArray} defaultValue={category} onBlur={updateCategories}/>
        </>
    );
};

export default Categories;