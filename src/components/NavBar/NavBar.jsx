import React from 'react';
import {Link} from "react-router-dom";

const NavBar = () => {
    return (
        <nav>
            <ol>
                <Link to={"/"}>MoviesBoard</Link>
                <Link to={"/ajout-d-un-film"}>Ajouter d'un film </Link>
            </ol>
        </nav>
    );
};

export default NavBar;