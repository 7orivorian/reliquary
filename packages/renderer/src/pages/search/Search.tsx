import './search.scss';
import {Outlet, useLocation, useNavigate} from 'react-router-dom';
import {getLastLocationSegment} from '@app/utils';

export default function Search() {
    const location = useLocation();
    const lastSegment: string = getLastLocationSegment(location);

    const navigate = useNavigate();

    const navToArtworkSearch = () => {
        navigate('/search/artworks');
    };
    const navToArtistSearch = () => {
        navigate('/search/artists');
    };

    return (
            <>
                <div className="search__nav">
                    <button className={`search__nav-item${lastSegment === 'artworks' ? ' active' : ''}`}
                            onClick={navToArtworkSearch}>Artwork
                    </button>
                    <button className={`search__nav-item${lastSegment === 'artists' ? ' active' : ''}`}
                            onClick={navToArtistSearch}>Artists
                    </button>
                </div>
                <Outlet/>
            </>
    );
}