import axios from "axios";

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
    }
}

export default moviesService;