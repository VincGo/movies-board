import axios from "axios";

const moviesService = {
    showAllMovies() {
        return axios
            .get('http://localhost:3000/movies')
            .then((response) => response.data)
            .catch((err) => console.log(err))
    }
}

export default moviesService;