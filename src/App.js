import './App.css';
import Home from "./views/Home";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Movie from "./views/Movie";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<Home/>}/>
                <Route path={"/movies/:id"} element={<Movie/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
