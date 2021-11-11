import React, {useState} from 'react';
import Title from "../components/Title/Title";
import Form from "../components/Form/Form";
import AddForm from "../components/Form/AddForm";

const Add = () => {
    const [movie, setMovie] = useState()

    function getData(data) {
        setMovie(data)
    }

    return (
        <div id={"addMovie"}>
            <Title title={"Ajouter un film"}/>
            {/* Si le premier formulaire est validé, alors les deuxième formulaire s'affiche avec les champs préremplis */}
            {movie ? <Form movie={movie}/> : <AddForm data={getData}/>}
        </div>
    );
};

export default Add;