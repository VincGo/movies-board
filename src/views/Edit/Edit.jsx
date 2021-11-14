import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import moviesService from "../../services/moviesService";
import Form from "../../components/Form/Form";
import Title from "../../components/Title/Title";

const Edit = () => {
    const {id} = useParams()
    const [movie, setMovie] = useState([])

    useEffect(() => {
        moviesService.show(id)
            .then((data) => setMovie(data))
            .catch((err) => console.log(err))
    }, [id])

    return (
        <>
            <div id={"addMovie"}>
                <Title title={"Modifier un film"}/>
                <Form movie={movie}/>
            </div>
        </>
    );
};

export default Edit;