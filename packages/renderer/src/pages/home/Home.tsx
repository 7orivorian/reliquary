import './home.scss';
import {Suspense} from 'react';
import ImageComponent from '../../components/ImageComponent/ImageComponent';
import {useArtwork} from '../../context/ArtworkContext';

export default function Home() {
    const {recentlyViewedArtwork, favoriteArtwork, recentlyAddedArtwork} = useArtwork();

    return (
        <>
            <div className="home-section">
                <h2>Statistics</h2>
                <div className="home-section__inner">

                </div>
            </div>
            <div className="home-section">
                <h2>Recently Viewed</h2>
                <div className="home-section__inner">
                    <Suspense fallback={<div>Loading...</div>}>
                        <ArtworkCarousel artworks={recentlyViewedArtwork} />
                    </Suspense>
                </div>
            </div>
            <div className="home-section">
                <h2>Favorites</h2>
                <div className="home-section__inner">
                    <Suspense fallback={<div>Loading...</div>}>
                        <ArtworkCarousel artworks={favoriteArtwork} />
                    </Suspense>
                </div>
            </div>
            <div className="home-section">
                <h2>Recently Added</h2>
                <div className="home-section__inner">
                    <Suspense fallback={<div>Loading...</div>}>
                        <ArtworkCarousel artworks={recentlyAddedArtwork} />
                    </Suspense>
                </div>
            </div>
        </>
    );
}

function ArtworkCarousel({artworks}: {artworks: ArtworkList}) {
    return (
        <>
            {artworks.map((recent: Artwork) => (
                <ImageCard key={recent.id} artwork={recent} />
            ))}
        </>
    );
}

function ImageCard({artwork}: {artwork: Artwork}) {
    return (
        <div className="home__recent__image-card">
            <ImageComponent className="home__recent__image-card__img" src={artwork.imageUrl} alt={artwork.title} />
        </div>
    );
}