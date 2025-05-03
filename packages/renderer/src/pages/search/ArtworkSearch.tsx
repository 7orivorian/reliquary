import {useEffect, useState} from 'react';
import RangeSliderDual from '../../components/inputs/slider/RangeSliderDual/RangeSliderDual';
import SizeInput from '../../components/inputs/SizeInput/SizeInput';
import TriStateMultiChoice from '../../components/inputs/TriStateMultiChoice/TriStateMultiChoice';
import TagFilter from '../../components/inputs/tag/TagFilter/TagFilter';
import {fetchApi} from '../../api/api';
import {usePreferences} from '../../context/PreferenceContext';
import {useTags} from '../../context/TagContext';
import PaginatedList from '../../components/pagination/PageinatedList/PaginatedList';
import {ArtworkCard} from '../../components/cards/ArtworkCard/ArtworkCard';
import {searchArtworks} from '../../api/artwork_api';
import {useArtists} from '../../context/ArtistContext';

export default function ArtworkSearch() {
    const {preferences} = usePreferences();

    const [count, setCount] = useState(0);
    useEffect(() => {
        fetchApi('artworks/count').then((json) => setCount(json)).catch(console.error);
    }, []);

    const {tags} = useTags();
    const {artists} = useArtists();

    // Filters
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [minRating, setMinRating] = useState<number>(0);
    const [maxRating, setMaxRating] = useState<number>(10);
    const [minDimensions, setMinDimensions] = useState({width: 1, height: 1});
    const [maxDimensions, setMaxDimensions] = useState({width: 16000, height: 16000});
    const [includedAi, setIncludedAi] = useState<string[]>(['No']);
    const [excludedAi, setExcludedAi] = useState<string[]>(['Possibly', 'Likely', 'Yes']);
    const [includedTags, setIncludedTags] = useState<string[]>([]);
    const [excludedTags, setExcludedTags] = useState<string[]>([]);
    const [includedArtists, setIncludedArtists] = useState<string[]>([]);
    const [excludedArtists, setExcludedArtists] = useState<string[]>([]);

    // Results
    const [searchResults, setSearchResults] = useState<ArtworkList>([]);
    const [totalResults, setTotalResults] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        if (currentPage > totalPages && totalPages > 0) {
            setCurrentPage(totalPages);
        }
    }, [totalPages]);

    const doSearch = () => {
        searchArtworks(
                [
                    {key: 'title', value: searchTerm},
                    {key: 'description', value: searchTerm},
                    {key: 'ratingMin', value: minRating},
                    {key: 'ratingMax', value: maxRating},
                    {key: 'widthMin', value: minDimensions.width},
                    {key: 'heightMin', value: minDimensions.height},
                    {key: 'heightMax', value: maxDimensions.width},
                    {key: 'heightMax', value: maxDimensions.height},
                    {key: 'includedAiStatuses', values: includedAi},
                    {key: 'excludedAiStatuses', values: excludedAi},
                    {key: 'dateAddedBefore', value: '2030-01-01T00:00:00.000Z'},
                    {key: 'dateAddedAfter', value: '2000-01-01T00:00:00.000Z'},
                    {key: 'dateViewedBefore', value: '2030-01-01T00:00:00.000Z'},
                    {key: 'dateViewedAfter', value: '2000-01-01T00:00:00.000Z'},
                    {key: 'includedTags', values: includedTags},
                    {key: 'excludedTags', values: excludedTags},
                    {key: 'includedArtists', values: includedArtists},
                    {key: 'excludedArtists', values: excludedArtists},
                ],
                {page: (currentPage - 1), size: preferences.searchResultsPerPage},
        ).then((result) => {
            setSearchResults(result.artworks);
            setTotalResults(result.totalElements);
            setTotalPages(result.totalPages);
        }).catch((error) => {
            console.error('Error while fetching artworks:', error);
        });
    };

    useEffect(() => {
        doSearch();
    }, [
        currentPage, preferences.searchResultsPerPage,
        searchTerm,
        minRating, maxRating,
        minDimensions, maxDimensions,
        includedAi, excludedAi,
        includedTags, excludedTags,
    ]);

    const hasResults: boolean = searchResults && searchResults.length > 0;

    return (
            <div className="search">
                <div className="filter-section">
                    <div className="search__header-container">
                        <h1 className="search__header">Search {count} Artworks</h1>
                    </div>
                    <div className="search-bar__container">
                        <input className="search-bar__input"
                               type="text"
                               placeholder="Search title or description"
                               value={searchTerm}
                               onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button className="search-bar__button" onClick={doSearch}>Search</button>
                    </div>
                    <div className="options__container">
                        <p className="options__header">Filters</p>
                        <div className="options__slice">
                            <div className="options__section">
                                <p className="options__section-header">Rating</p>
                                <RangeSliderDual
                                        min={0}
                                        max={10}
                                        minValue={minRating}
                                        maxValue={maxRating}
                                        onChange={(min, max) => {
                                            setMinRating(min);
                                            setMaxRating(max);
                                        }}
                                />
                            </div>
                            <div className="options__section">
                                <p className="options__section-header">AI Generated</p>
                                <TriStateMultiChoice
                                        options={['No', 'Possibly', 'Likely', 'Yes']}
                                        included={includedAi}
                                        excluded={excludedAi}
                                        onChange={(included, excluded) => {
                                            setIncludedAi(included);
                                            setExcludedAi(excluded);
                                        }}
                                />
                            </div>
                            <div className="options__section">
                                <p className="options__section-header">Minimum Dimensions</p>
                                <div className="options__section__dimensions">
                                    <SizeInput
                                            width={minDimensions.width}
                                            height={minDimensions.height}
                                            min={1}
                                            max={16000}
                                            onChange={(w, h) => {
                                                setMinDimensions({width: w, height: h});
                                            }}
                                    />
                                </div>
                            </div>
                            <div className="options__section">
                                <p className="options__section-header">Maximum Dimensions</p>
                                <div className="options__section__dimensions">
                                    <SizeInput
                                            width={maxDimensions.width}
                                            height={maxDimensions.height}
                                            min={1}
                                            max={16000}
                                            onChange={(w, h) => {
                                                setMaxDimensions({width: w, height: h});
                                            }}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="options__slice">
                            <div className="options__section">
                                <p className="options__section-header">Tags</p>
                                <TagFilter
                                        availableTags={tags.map((tag: Tag): string => tag.name)}
                                        includedTags={includedTags}
                                        excludedTags={excludedTags}
                                        onChange={(included, excluded) => {
                                            setIncludedTags(included);
                                            setExcludedTags(excluded);
                                        }}/>
                            </div>
                            <div className="options__section">
                                <p className="options__section-header">Artists</p>
                                <TagFilter
                                        availableTags={artists.map((artist: Artist): string => artist.name)}
                                        includedTags={includedArtists}
                                        excludedTags={excludedArtists}
                                        onChange={(included, excluded) => {
                                            setIncludedArtists(included);
                                            setExcludedArtists(excluded);
                                        }}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="section-divider"></div>
                <PaginatedList
                        totalResults={totalResults}
                        totalPages={totalPages}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                >
                    {hasResults && searchResults.map((artwork) => <ArtworkCard key={artwork.id} artwork={artwork}/>)}
                </PaginatedList>
            </div>
    );
}