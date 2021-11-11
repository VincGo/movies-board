import './App.css';
import Home from "./views/Home";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Movie from "./views/Movie";
import Add from "./views/Add";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<Home/>}/>
                <Route path={"/movies/:id"} element={<Movie/>}/>
                <Route path={"/ajout-d-un-film"} element={<Add/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
