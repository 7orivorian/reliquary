import './ArtworkCard.scss';
import {useNavigate} from 'react-router-dom';
import {navigateToArtwork} from '@app/utils';

type Props = {
    artwork: Artwork;
};

export function ArtworkCard({artwork}: Props) {
    const navigate = useNavigate();
    const handleClick = () => {
        navigateToArtwork(artwork.id, navigate);
    };
    return (
        <button className="artwork-card" onClick={handleClick}>
            <img src={artwork.imageUrl} alt={artwork.title} />
            <p className="artwork-card__info artwork-card__top-left">{artwork.title}</p>
            <p className="artwork-card__info artwork-card__top-right">{artwork.artists.map((artist: Artist): string => artist.name).join(', ')}</p>
            <p className="artwork-card__info artwork-card__bottom-left">{artwork.format}</p>
            <p className="artwork-card__info artwork-card__bottom-right">{artwork.width}x{artwork.height}</p>
            {artwork.relevance && (
                <p className="artwork-card__info artwork-card__center">{artwork.relevance}</p>
            )}
        </button>
    );
}