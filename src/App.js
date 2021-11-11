import './App.css';
import Home from "./views/Home/Home";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Movie from "./views/Movie";
import Add from "./views/Add";
import NavBar from "./components/NavBar/NavBar";

function App() {
    return (
        <BrowserRouter>
            <NavBar />
            <main>
                <Routes>
                    <Route path={"/"} element={<Home/>}/>
                    <Route path={"/movies/:id"} element={<Movie/>}/>
                    <Route path={"/ajout-d-un-film"} element={<Add/>}/>
                </Routes>
            </main>
        </BrowserRouter>
    );
}

export default App;
