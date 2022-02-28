import Genres from "../utility/Genres";
import {Link, useParams} from "react-router-dom";
import '../styles/GenreBrowser.css';
import {useEffect, useState} from "react";

const GenreBrowser = () => {
    const [genre, setGenre] = useState('');
    const {code} = useParams();

    console.log("Code: " + code + " & CurGenre: " + genre);
    useEffect(() => {
        console.log("Genre changed");
        const checkCurrentGenre = () => {
            if(code == undefined) {
                setGenre('Trending');
            } else {
                if (code == Genres.ACTION) {
                    setGenre('Action');
                } else if (code == Genres.ROMANCE) {
                    setGenre('Romance');
                } else if (code == Genres.DOCS) {
                    setGenre('Documentaries');
                } else if (code == Genres.HORROR) {
                    setGenre('Horror');
                } else if (code == Genres.COMEDY) {
                    setGenre('Comedy');
                }
            }
        }
        checkCurrentGenre();
    }, [genre,code]);

    return(
        <>
            <div className='genre-container'>
                <ul className='genre-list'>
                    <li className='genre-item'>
                        <Link to={`/movies/genre/${Genres.ACTION}`} onClick={() => setGenre('Action')} className={genre === 'Action' ? 'genre-link active' : 'genre-link'}>Action</Link>
                    </li>
                    <li className='genre-item'>
                        <Link to={`/movies/genre/${Genres.COMEDY}`} onClick={() => setGenre('Comedy')} className={genre === 'Comedy' ? 'genre-link active' : 'genre-link'}>Comedy</Link>
                    </li>
                    <li className='genre-item'>
                        <Link to={`/movies/genre/${Genres.HORROR}`} onClick={() => setGenre('Horror')} className={genre === 'Horror' ? 'genre-link active' : 'genre-link'}>Horror</Link>
                    </li>
                    <li className='genre-item'>
                        <Link to={`/movies/genre/${Genres.DOCS}`} onClick={() => setGenre('Documentaries')} className={genre === 'Documentaries' ? 'genre-link active' : 'genre-link'}>Documentaries</Link>
                    </li>
                    <li className='genre-item'>
                        <Link to={`/movies/genre/${Genres.ROMANCE}`} onClick={() => setGenre('Romance')} className={genre === 'Romance' ? 'genre-link active' : 'genre-link'}>Romance</Link>
                    </li>
                    <li className='genre-item'>
                        <Link to={`/`} onClick={() => setGenre('Trending')} className={genre === 'Trending' ? 'genre-link active' : 'genre-link'}>Trending</Link>
                    </li>
                </ul>
                <div className='genre-header'>
                    <h1>{genre}</h1>
                </div>
            </div>

        </>
    )
}

export default GenreBrowser;