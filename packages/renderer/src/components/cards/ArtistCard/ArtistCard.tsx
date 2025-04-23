import './ArtistCard.scss';
import {useNavigate} from 'react-router-dom';
import {navigateToArtist} from '@app/utils';

type Props = {
    artist: Artist;
};

export function ArtistCard({artist}: Props) {
    const navigate = useNavigate();
    const handleClick = () => {
        navigateToArtist(artist.id, navigate);
    };
    return (
        <div className="artist-card" onClick={handleClick}>
            <h3>{artist.name}</h3>
        </div>
    );
}