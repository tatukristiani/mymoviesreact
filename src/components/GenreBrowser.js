import Genres from "../utility/Genres";
import {Link} from "react-router-dom";
import '../styles/GenreBrowser.css';
import {useState} from "react";

const GenreBrowser = () => {
    const [genre, setGenre] = useState('Trending');

    return(
        <>
            <div className='genre-container'>
                <ul className='genre-list'>
                    <li className='genre-item'>
                        <Link to={`/movies/genre/${Genres.ACTION}/1`} onClick={() => setGenre('Action')} className='genre-link'>Action</Link>
                    </li>
                    <li className='genre-item'>
                        <Link to={`/movies/genre/${Genres.COMEDY}/1`} onClick={() => setGenre('Comedy')} className='genre-link'>Comedy</Link>
                    </li>
                    <li className='genre-item'>
                        <Link to={`/movies/genre/${Genres.HORROR}/1`} onClick={() => setGenre('Horror')} className='genre-link'>Horror</Link>
                    </li>
                    <li className='genre-item'>
                        <Link to={`/movies/genre/${Genres.DOCS}/1`} onClick={() => setGenre('Documentaries')} className='genre-link'>Documentaries</Link>
                    </li>
                    <li className='genre-item'>
                        <Link to={`/movies/genre/${Genres.ROMANCE}/1`} onClick={() => setGenre('Romance')} className='genre-link'>Romance</Link>
                    </li>
                </ul>
            </div>
            <div className='genre-header'>
                <h1>{genre}</h1>
            </div>
        </>
    )
}

export default GenreBrowser;