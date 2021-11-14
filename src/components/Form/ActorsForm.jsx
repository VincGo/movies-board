import React, {useEffect, useState} from 'react';
import produce from "immer";
import { IoIosAddCircle, IoIosCloseCircle } from "react-icons/io";
import moviesService from "../../services/moviesService";

const ActorsForm = ({actorsData, movie_id}) => {
    const [actors, setActors] = useState([])

    //Ajouts de nouveaux champs pour la création d'acteur
    function newActor(e) {
        setActors(currentActor => [...currentActor, {
            name: "",
            photo: "",
            character: ""
        }])

        e.preventDefault()
    }

    useEffect(() => {
        actorsData(actors)
    }, [actorsData, actors])

    useEffect(() => {
        if(window.location.pathname === "/ajout-d-un-film") {
            moviesService.getActorsMovie(movie_id)
                .then((data) => {
                    const arr = []
                    const cast = data.cast
                    if(cast.length > 0) {
                        for (let i=0; i< 5; i++) {
                            arr.push({
                                name: cast[i].name,
                                photo: "https://image.tmdb.org/t/p/w500" + cast[i].profile_path,
                                character: cast[i].character
                            })
                        }
                    }
                    setActors(arr)
                })
                .catch((err) => console.log(err))
        } else {
            if(movie_id) {
                moviesService.show(movie_id)
                    .then((data) => setActors(data.actors))
                    .catch((err) => console.log(err))
            }
        }
    }, [movie_id])

    return (
        <div>
            {actors.map((a, index) =>
                <div key={index} className={"input"}>
                    <input type="text" placeholder={"Nom de l'acteur"} defaultValue={a.name} onChange={e => {
                        const name = e.target.value
                        setActors(currentActor => produce(currentActor, v => {
                            v[index].name = name
                        }))
                    }}/>
                    <input type="url" placeholder={"Photo"} defaultValue={a.photo} onChange={e => {
                        const photo = e.target.value
                        setActors(currentActor => produce(currentActor, v => {
                            v[index].photo = photo
                        }))
                    }}/>
                    <input type="text" placeholder={"Charactère"} defaultValue={a.character} onChange={e => {
                        const character = e.target.value
                        setActors(currentActor => produce(currentActor, v => {
                            v[index].character = character
                        }))
                    }}/>
                    <IoIosCloseCircle onClick={(e) => {
                        e.preventDefault()
                        setActors(currentActors => currentActors.filter(x => x.name !== a.name))
                    }}/>
                </div>

            )}
            <IoIosAddCircle onClick={newActor}/>
        </div>
    );
};

export default ActorsForm;