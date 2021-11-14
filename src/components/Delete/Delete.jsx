import React, {useState} from 'react';
import moviesService from "../../services/moviesService";
import {useNavigate} from "react-router-dom";
import { IoIosCheckmarkCircle, IoIosCloseCircle } from "react-icons/io";

const Delete = ({id, delete_id}) => {
    const navigate = useNavigate()
    const [popUp, setPopUp] = useState([{
        show: false
    }])

    function removeMovie(e) {
        e.preventDefault()
        setPopUp({show: true})
    }

    function deleteFalse(e) {
        e.preventDefault()
        setPopUp({show:false})
    }

    function deleteTrue(e) {
        e.preventDefault()
        const pathName = window.location.pathname
        moviesService.removeMovie(id)
            .then(() => {
                if(pathName !== "/") {
                    navigate("/")
                } else {
                    delete_id(id)
                }
            })
            .catch((err) => console.log(err))
        setPopUp({show:false})
    }

    return (
        <div className={'delete'}>
            {!popUp.show && <IoIosCloseCircle onClick={removeMovie} />}
            {popUp.show &&  <IoIosCheckmarkCircle onClick={deleteTrue}/>}
            {popUp.show &&  <IoIosCloseCircle onClick={deleteFalse}/>}
        </div>
    );
};

export default Delete;