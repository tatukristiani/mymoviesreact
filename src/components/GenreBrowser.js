import Genres from "../utility/Genres";
import {Link} from "react-router-dom";
import '../styles/GenreBrowser.css';

const GenreBrowser = () => {
    return(
        <div className='genre-container'>
            <ul className='genre-list'>
                <li className='genre-item'>
                    <Link to={`/movies/genre/${Genres.ACTION}`} className='genre-link'>Action</Link>
                </li>
                <li className='genre-item'>
                    <Link to={`/movies/genre/${Genres.COMEDY}`} className='genre-link'>Comedy</Link>
                </li>
                <li className='genre-item'>
                    <Link to={`/movies/genre/${Genres.HORROR}`} className='genre-link'>Horror</Link>
                </li>
                <li className='genre-item'>
                    <Link to={`/movies/genre/${Genres.DOCS}`} className='genre-link'>Documentaries</Link>
                </li>
                <li className='genre-item'>
                    <Link to={`/movies/genre/${Genres.ROMANCE}`} className='genre-link'>Romance</Link>
                </li>
            </ul>

        </div>
    )
}

export default GenreBrowser;