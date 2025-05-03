import {useEffect, useState} from 'react';
import {usePreferences} from '../../context/PreferenceContext';
import {fetchArtistApi, searchArtists} from '../../api/artist_api';
import PaginatedList from '../../components/pagination/PageinatedList/PaginatedList';
import {ArtistCard} from '../../components/cards/ArtistCard/ArtistCard';

export default function ArtistSearch() {
    const {preferences} = usePreferences();

    const [count, setCount] = useState(0);
    useEffect(() => {
        fetchArtistApi('count').then(setCount).catch(console.error);
    }, []);

    // Filters
    const [searchTerm, setSearchTerm] = useState<string>('');

    // Results
    const [searchResults, setSearchResults] = useState<ArtistList>([]);
    const [totalResults, setTotalResults] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(totalPages);
        }
    }, [totalPages]);

    const doSearch = () => {
        searchArtists(
                [
                    {key: 'name', value: searchTerm},
                ],
                {page: (currentPage - 1), size: preferences.searchResultsPerPage},
        ).then((result) => {
            setSearchResults(result.artists);
            setTotalResults(result.totalElements);
            setTotalPages(result.totalPages);
        }).catch((error) => {
            console.error('Error while fetching artworks:', error);
        });
    };

    useEffect(() => {
        doSearch();
    }, [currentPage, preferences.searchResultsPerPage, searchTerm]);

    return (
            <div className="search">
                <div className="filter-section">
                    <div className="search__header-container">
                        <h1 className="search__header">Search {count} Artists</h1>
                    </div>
                    <div className="search-bar__container">
                        <input className="search-bar__input"
                               type="text"
                               placeholder="Search name or alias"
                               value={searchTerm}
                               onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button className="search-bar__button" onClick={doSearch}>Search</button>
                    </div>
                </div>
                <div className="section-divider"></div>
                <PaginatedList
                        totalResults={totalResults}
                        totalPages={totalPages}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                >
                    {searchResults.map((artist) => <ArtistCard key={artist.id} artist={artist}/>)}
                </PaginatedList>
            </div>
    );
}