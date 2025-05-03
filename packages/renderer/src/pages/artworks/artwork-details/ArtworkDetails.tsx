import './ArtworkDetails.scss';
import {useEffect, useState} from 'react';
import {fetchApi} from '../../../api/api';
import ColorPreviewGrid from '../../../components/ColorPreviewGrid/ColorPreviewGrid';
import TagDisplay from '../../../components/TagDisplay/TagDisplay';
import InteractableImage from '../../../components/InteractableImage/InteractableImage';
import {useNavigate, useParams} from 'react-router-dom';
import {colorsFromHexs, navigateToArtist} from '@app/utils';

export default function ArtworkDetails() {
    const {artworkId} = useParams();

    const [artwork, setArtwork] = useState<Artwork | null>(null);
    const [artists, setArtists] = useState<ArtistList>([]);

    useEffect(() => {
        fetchApi(`artworks/${artworkId}`)
                .then(json => json as Artwork)
                .then(artwork => {
                    return artwork;
                })
                .then(setArtwork)
                .catch(console.error);
    }, [artworkId]);

    useEffect(() => {
        if (artwork != null) {
            fetchApi(`artists?ids=${artwork.artists.map(artist => artist.id).join(',')}`)
                    .then(json => {
                        return json.content as ArtistList;
                    })
                    .then(artist => {
                        return artist;
                    })
                    .then(setArtists)
                    .catch(console.error);
        } else {
            setArtists([]);
        }
    }, [artwork]);

    const navigate = useNavigate();
    const handleArtistClicked = (artistId: number) => {
        navigateToArtist(artistId, navigate);
    };

    return (
            artwork && artists && (
                    <div className="artwork-details">
                        <div className="artwork-details__image">
                            <InteractableImage src={artwork.imageUrl} alt={artwork.title}/>
                        </div>
                        <div className="artwork-details__section artwork-details__title">
                            <h1>{artwork.title}</h1>
                            <p>by {artists.map((artist: Artist) => {
                                return (
                                        <button
                                                key={artist.id}
                                                className="to-artist-btn"
                                                onClick={(): void => handleArtistClicked(artist.id)}
                                        >{artist.name}</button>
                                );
                            })}</p>
                        </div>
                        <div className="artwork-details__section-grid">
                            <div className="artwork-details__section">
                                <h3>Description</h3>
                                <div className="artwork-details__section-inner  artwork-details__description">
                                    <p>{artwork.description}</p>
                                </div>
                            </div>
                            <div className="artwork-details__section artwork-details__tags">
                                <h3>Tags</h3>
                                <TagDisplay tags={artwork.tags as unknown as string[]}/>
                            </div>
                            <div className="artwork-details__section artwork-details__info">
                                <h3>Details</h3>
                                <div className="artwork-details__section-inner">
                                    <p>{artwork.rating}</p>
                                    <p>{artwork.width}x{artwork.height}, {artwork.format}</p>
                                </div>
                            </div>
                            <div className="artwork-details__section artwork-details__colors">
                                <h3>Colors</h3>
                                <ColorPreviewGrid colors={colorsFromHexs(artwork.colors)}/>
                            </div>
                        </div>
                    </div>
            ) || (
                    <div>Loading...</div>
            )
    );
}