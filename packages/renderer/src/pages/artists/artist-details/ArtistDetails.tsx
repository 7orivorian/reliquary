import './ArtistDetails.scss';
import {useParams} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {fetchApi} from '../../../api/api';
import {usePreferences} from '../../../context/PreferenceContext';
import PaginatedList from '../../../components/pagination/PageinatedList/PaginatedList';
import {ArtworkCard} from '../../../components/cards/ArtworkCard/ArtworkCard';

export default function ArtistDetails() {
    const {preferences} = usePreferences();
    const {artistId} = useParams();

    const [artist, setArtist] = useState<Artist | null>(null);
    const [artworks, setArtworks] = useState<ArtworkList>([]);

    const [totalResults, setTotalResults] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);

    useEffect(() => {
        fetchApi(`artists/${artistId}`)
                .then(json => json as Artist)
                .then(setArtist)
                .catch(console.error);
    }, [artistId]);

    useEffect(() => {
        if (artist) {
            fetchApi(`artworks?artistIds=${artist.id}&page=${currentPage - 1}&size=${preferences.searchResultsPerPage}`)
                    .then(json => {
                        setTotalResults(json.totalElements);
                        setTotalPages(json.totalPages);
                        return json.content as ArtworkList;
                    })
                    .then(setArtworks)
                    .catch(console.error);
        }
    }, [artist, currentPage, preferences.searchResultsPerPage]);

    return (
            <div className="artist-details">
                <div className="artist-details__artist">
                    <div>
                        <h1>{artist?.name}</h1>
                        <div className="artist-details__aliases-container">
                            aka
                            {artist?.aliases?.map((alias: string, index: number) => {
                                return (
                                        <AliasCard key={alias} alias={alias} isLast={index >= artist?.aliases?.length - 1}/>
                                );
                            })}
                        </div>
                    </div>
                    <div className="artist-details__social-links">
                        {artist?.links?.map((link: string) => (
                                <SocialLink key={link} link={link}/>
                        ))}
                    </div>
                </div>
                <div className="section-divider"></div>
                <div className="artist-details__artworks">
                    {(!artworks || artworks.length === 0) && (
                            <div>Loading...</div>
                    ) || (
                            <PaginatedList
                                    totalResults={totalResults}
                                    totalPages={totalPages}
                                    currentPage={currentPage}
                                    setCurrentPage={setCurrentPage}
                            >
                                {artworks.map((artwork) => <ArtworkCard key={artwork.id} artwork={artwork}/>)}
                            </PaginatedList>
                    )}
                </div>
            </div>
    );
}

function SocialLink({link}: { link: string }) {
    const handleClick = () => {
        console.log(link);
    };
    return (
            <a className="artist-details__social-link"
               href={link}
               target="_blank"
               rel="noreferrer"
               onClick={handleClick}
            >{link}</a>
    );
}

function AliasCard({alias, isLast = false}: { alias: string; isLast?: boolean }) {
    return (
            <p className="artist-details__alias">{alias}<span>{`${isLast ? '' : ','}`}</span></p>
    );
}