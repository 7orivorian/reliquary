import './ArtistInput.scss';
import {useEffect, useState} from 'react';
import {sanitizeArtistName} from '@app/utils';

interface Props {
    availableArtists: ArtistList;
    selectedArtists: string[];
    placeholder?: string;
    initialDisplayLimit?: number;
    displayIncrement?: number;
    onChange: (value: string[]) => void;
}

export default function ArtistInput({
                                        availableArtists,
                                        selectedArtists,
                                        placeholder,
                                        initialDisplayLimit = 15, displayIncrement = 30,
                                        onChange,
                                    }: Props) {
    const [search, setSearch] = useState<string>('');
    const [displayLimit, setDisplayLimit] = useState<number>(initialDisplayLimit);
    const [filteredTags, setFilteredTags] = useState<string[]>([]);

    const increaseDisplayLimit = () => {
        if (displayLimit >= availableArtists.length) {
            return;
        }
        setDisplayLimit(prev => prev + displayIncrement);
    };

    const decreaseDisplayLimit = () => {
        if (displayLimit <= initialDisplayLimit) {
            return;
        }
        setDisplayLimit(prev => Math.max(prev - displayIncrement, initialDisplayLimit));
    };

    const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value.trimStart());
    };

    const handleSearchInputKeyDown = (e: any) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            selectArtist(sanitizeArtistName(search.trim()));
            setSearch('');
        } else if (e.key === 'Escape') {
            setSearch('');
        }
    };

    const selectArtist = (name: string) => {
        if (!selectedArtists.includes(name)) {
            onChange(selectedArtists.concat(name));
        }
    };

    const deselectArtist = (name: string) => {
        if (selectedArtists.includes(name)) {
            onChange(selectedArtists.filter(selectedTag => selectedTag !== name));
        }
    };

    useEffect(() => {
        setFilteredTags(
            availableArtists
                .map(artist => artist.name)
                .filter(name => !selectedArtists.includes(name))
                .filter(name => name.startsWith(search) || name.includes(search))
                .sort((a, b) => a.localeCompare(b))
                .slice(0, displayLimit),
        );
    }, [search, availableArtists, selectedArtists, displayLimit]);

    return (
        <div className="tag-filter__container">
            {selectedArtists.length > 0 && (
                <div className="tag-filter__tags">
                    {selectedArtists.map((artist: string) => {
                            const isNew: boolean = !availableArtists
                                .map((artist: Artist): string => artist.name)
                                .includes(artist);
                            return (
                                <button key={artist}
                                        className={`tag-filter__tags__tag selected${isNew ? ' new' : ''}`}
                                        onClick={(): void => deselectArtist(artist)}
                                >{artist}</button>
                            );
                        },
                    )}
                </div>
            )}
            <div className="tag-filter__input-container">
                <input
                    className="tag-filter__input"
                    type="text"
                    placeholder={placeholder}
                    value={search}
                    onChange={handleSearchInputChange}
                    onKeyDown={handleSearchInputKeyDown}
                />
            </div>
            <div className="tag-filter__tags">
                {filteredTags.map(tag =>
                    <button key={tag}
                            className="tag-filter__tags__tag"
                            onClick={(): void => selectArtist(tag)}
                    >{tag}</button>,
                )}
            </div>
            <div className="tag-filter__display-buttons">
                <button className="tag-filter__display-buttons__button"
                        onClick={increaseDisplayLimit}
                        disabled={displayLimit >= availableArtists.length}>Show More
                </button>
                <button className="tag-filter__display-buttons__button"
                        onClick={decreaseDisplayLimit}
                        disabled={displayLimit <= initialDisplayLimit}>Show Less
                </button>
            </div>
        </div>
    );
}