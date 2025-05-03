import {NavigateFunction} from 'react-router-dom';

export function navigateToArtwork(artworkId: number, navigate: NavigateFunction): void {
    navigate(`/artworks/${artworkId}`);
}

export function navigateToArtist(artistId: number, navigate: NavigateFunction): void {
    navigate(`/artists/${artistId}`);
}

export function getLastLocationSegment(location: {pathname: string}): string {
    const pathSegments: string[] = location.pathname.split('/');
    return pathSegments[pathSegments.length - 1] || '';
}