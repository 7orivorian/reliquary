import './TagInput.scss';
import {useEffect, useState} from 'react';
import {sanitizeTag} from '@app/utils';

interface Props {
    availableTags: string[];
    selectedTags: string[];
    placeholder?: string;
    initialDisplayLimit?: number;
    displayIncrement?: number;
    onChange: (value: string[]) => void;
}

export default function TagInput({
                                     availableTags,
                                     selectedTags,
                                     placeholder,
                                     initialDisplayLimit = 15, displayIncrement = 30,
                                     onChange,
                                 }: Props) {
    const [search, setSearch] = useState<string>('');
    const [displayLimit, setDisplayLimit] = useState<number>(initialDisplayLimit);
    const [filteredTags, setFilteredTags] = useState<string[]>([]);

    const increaseDisplayLimit = () => {
        if (displayLimit >= availableTags.length) {
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
        setSearch(sanitizeTag(e.target.value));
    };

    const handleSearchInputKeyDown = (e: any) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            selectTag(sanitizeTag(search.trim().toLowerCase()));
            setSearch('');
            /*if (filteredTags.length > 0) {
                selectTag(filteredTags[0]);
            }*/
        } else if (e.key === 'Escape') {
            setSearch('');
        }
    };

    const selectTag = (tag: string) => {
        if (!selectedTags.includes(tag)) {
            onChange(selectedTags.concat(tag));
        }
    };

    const deselectTag = (tag: string) => {
        if (selectedTags.includes(tag)) {
            onChange(selectedTags.filter(selectedTag => selectedTag !== tag));
        }
    };

    useEffect(() => {
        setFilteredTags(
                availableTags
                        .filter(tag => !selectedTags.includes(tag))
                        .filter(tag => tag.startsWith(search) || tag.includes(search))
                        .sort((a, b) => a.localeCompare(b))
                        .slice(0, displayLimit),
        );
    }, [search, availableTags, selectedTags, displayLimit]);

    return (
            <div className="tag-filter__container">
                {selectedTags.length > 0 && (
                        <div className="tag-filter__tags">
                            {selectedTags.map(tag => {
                                        const isNew = !availableTags.includes(tag);
                                        return (
                                                <button key={tag}
                                                        className={`tag-filter__tags__tag selected${isNew ? ' new' : ''}`}
                                                        onClick={(): void => deselectTag(tag)}
                                                >{tag}</button>
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
                                    onClick={(): void => selectTag(tag)}
                            >{tag}</button>,
                    )}
                </div>
                <div className="tag-filter__display-buttons">
                    <button className="tag-filter__display-buttons__button"
                            onClick={increaseDisplayLimit}
                            disabled={displayLimit >= availableTags.length}>Show More
                    </button>
                    <button className="tag-filter__display-buttons__button"
                            onClick={decreaseDisplayLimit}
                            disabled={displayLimit <= initialDisplayLimit}>Show Less
                    </button>
                </div>
            </div>
    );
}