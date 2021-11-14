import axios from "axios";

const API_KEY = "e15c129d8401459ccb452e300c98cc83"

const moviesService = {
    //Affiche tous les films de la DB
    showAllMovies() {
        return axios
            .get('http://localhost:3000/movies')
            .then((response) => response.data)
            .catch((err) => console.log(err))
    },

    //Affiche uniquement le film sélectionné avec son id
    show(id) {
        return axios
            .get(`http://localhost:3000/movies/${id}`)
            .then((response) => response.data)
            .catch((err) => console.log(err))
    },

    //Récupère les films via l'API themoviedb
    getDataMovie(title, date_release) {
        return axios
            .get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&page=1&language=fr&query=${title}&primary_release_year=${date_release}`)
            .then((response) => response.data.results)
            .catch((err) => console.log(err))
    },

    //Récupère les catégoris d'un film
    getCategoriesMovie (movie_id) {
        return axios
            .get(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=${API_KEY}&language=fr`)
            .then((response) => response.data)
            .catch((err) => console.log(err))
    },

    //Récupère les acteurs d'un film
    getActorsMovie (movie_id) {
        return axios
            .get(`https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=${API_KEY}&language=fr`)
            .then((response) => response.data)
            .catch((err) => console.log(err))
    },

    //Récupère les films similaires d'un film
    getSimilarsMovies (movie_id) {
        return axios
            .get(`https://api.themoviedb.org/3/movie/${movie_id}/recommendations?api_key=${API_KEY}&language=fr&page=1`)
            .then((response) => response.data)
            .catch((err) => console.log(err))
    },

    //Ajoute un film dans la DB
    add(movie) {
        return axios
            .post('http://localhost:3000/movies', {
                title: movie.title,
                release_date: movie.release_date,
                categories: movie.categories,
                description: movie.description,
                poster: movie.poster,
                backdrop: movie.backdrop,
                actors: movie.actors,
                similar_movies: movie.similar_movies
            })
            .then((response) => response.data)
            .catch((err) => console.log(err))
    },

    //Supprimer un film
    removeMovie(id) {
        return axios
            .delete(`http://localhost:3000/movies/${id}`)
            .then((response) => response.data)
            .catch((err) => console.log(err))
    },

    //Modification d'un film
    edit(id, movie) {
        return axios
            .put(`http://localhost:3000/movies/${id}`, movie)
            .then((response) => response.data)
            .catch((err) => console.log(err))
    },

    //Récupère toutes les catégories pour le filtre de la home
    getAllCategories() {
        return axios
            .get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=fr`)
            .then((response) => response.data)
            .catch((err) => console.log(err))
    }
}

export default moviesService;