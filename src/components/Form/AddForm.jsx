import moviesService from "../../services/moviesService";
import {useEffect, useRef, useState} from "react";
import { IoIosArrowRoundForward } from "react-icons/io";

const AddForm = ({data}) => {
    const titleSearch = useRef()
    const dateSearch = useRef()

    const [dataMovie, setDataMovie] = useState([])
    const [movie, setMovie] = useState(null)

    //Récupère les données via l'API avec titre ou date de sortie
    function getDataFromApi() {
        const title = titleSearch.current.value
        const date = dateSearch.current.value
        if(title.length >= 3) {
            moviesService.getDataMovie(title, date)
                .then((data) => setDataMovie(data))
                .catch((err) => console.log(err))
        } else {
            setDataMovie([])
        }
    }

    //Récupère les données du film via l'API en fonction du titre
    function getMovieSelected() {
        const title = titleSearch.current.value

        for (let i = 0; i < dataMovie.length; i++) {
            if (dataMovie[i].title === title) {
                setMovie(dataMovie[i])
            }
        }
    }

    useEffect(() => {
        data(movie)
    }, [movie])

    return (
        <form id={"search"}>
            <input id={"titleSearch"} list={"titleList"} name={"titleSearch"} type={"text"}
                   placeholder={"Titre du film"} ref={titleSearch} onChange={getDataFromApi} autoComplete={"off"}/>
            <input type={"number"} placeholder={"Année du film"} ref={dateSearch} onChange={getDataFromApi}/>

            <datalist id="titleList">
                {dataMovie && dataMovie.map((data, index) => <option key={index} value={data.title}/>)}
            </datalist>
            <button onClick={getMovieSelected}><IoIosArrowRoundForward /> </button>
        </form>
    )
}

export default AddForm