import './TagFilter.scss';
import React, {useEffect, useState} from "react";

interface Props {
    availableTags: string[];
    includedTags: string[];
    excludedTags: string[];
    initialDisplayLimit?: number;
    displayIncrement?: number;
    onChange: (included: string[], excluded: string[]) => void;
}

export default function TagFilter({
                                      availableTags, includedTags, excludedTags,
                                      initialDisplayLimit = 15, displayIncrement = 30,
                                      onChange
                                  }: Props) {
    const [search, setSearch] = useState<string>("");
    const [displayLimit, setDisplayLimit] = useState<number>(initialDisplayLimit);
    const [filteredTags, setFilteredTags] = useState<string[]>([]);

    const [included, setIncluded] = useState(includedTags);
    const [excluded, setExcluded] = useState(excludedTags);

    useEffect(() => {
        setIncluded(included);
        setExcluded(excluded);
    }, [includedTags, excludedTags]);

    useEffect(() => {
        onChange(included, excluded);
    }, [included, excluded]);

    const handleMoreClick = () => {
        if (displayLimit >= availableTags.length) {
            return;
        }
        setDisplayLimit(prev => prev + displayIncrement);
    };

    const handleLessClick = () => {
        if (displayLimit <= initialDisplayLimit) {
            return;
        }
        setDisplayLimit(prev => Math.max(prev - displayIncrement, initialDisplayLimit));
    };

    const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value.toLowerCase().trim());
    };

    const handleSearchInputKeyDown = (e: any) => {
        if (e.key === "Enter") {
            e.preventDefault();
            if (filteredTags.length > 0) {
                updateTagState(0, filteredTags[0], 'none');
            }
        } else if (e.key === "Escape") {
            setSearch("");
        }
    };

    const handleTagClick = (e: any, tag: string, state: 'included' | 'excluded' | 'none') => {
        updateTagState(e.nativeEvent.button, tag, state);
    };

    const updateTagState = (button: number, tag: string, state: 'included' | 'excluded' | 'none') => {
        if (tag.length === 0) {
            return;
        }
        switch (state) {
            case 'included':
                setIncluded(prev => prev.filter(t => t !== tag));
                if (button == 2) {
                    if (!excluded.includes(tag)) {
                        setExcluded(prev => [...prev, tag]);
                    }
                }
                break;
            case 'excluded':
                setExcluded(prev => prev.filter(t => t !== tag));
                break;
            case 'none':
                if (button == 2) {
                    if (!excluded.includes(tag)) {
                        setExcluded(prev => [...prev, tag]);
                    }
                } else {
                    if (!included.includes(tag)) {
                        setIncluded(prev => [...prev, tag]);
                    }
                }
                break;
        }
    };

    useEffect(() => {
        setFilteredTags(
                availableTags
                        .filter(tag => !included.includes(tag))
                        .filter(tag => !excluded.includes(tag))
                        .filter(tag => tag.startsWith(search) || tag.includes(search))
                        .sort((a, b) => a.localeCompare(b))
                        .slice(0, displayLimit)
        );
    }, [search, availableTags, included, excluded, displayLimit]);

    return (
            <div className="tag-filter__container">
                {(included.length > 0 || excluded.length > 0) && (
                        <div className="tag-filter__tags">
                            {included.map(tag =>
                                    <Tag
                                            key={tag}
                                            tag={tag}
                                            state={'included'}
                                            onClick={handleTagClick}
                                    />
                            )}
                            {excluded.map(tag =>
                                    <Tag
                                            key={tag}
                                            tag={tag}
                                            state={'excluded'}
                                            onClick={handleTagClick}
                                    />
                            )}
                        </div>
                )}

                <div className="tag-filter__input-container">
                    <input
                            className="tag-filter__input"
                            type="text"
                            placeholder="Search tags"
                            value={search}
                            onChange={handleSearchInputChange}
                            onKeyDown={handleSearchInputKeyDown}
                    />
                </div>
                <div className="tag-filter__tags">
                    {filteredTags.map(tag => <Tag key={tag} tag={tag} onClick={handleTagClick}/>)}
                </div>
                <div className="tag-filter__display-buttons">
                    <button className="tag-filter__display-buttons__button"
                            onClick={handleMoreClick}
                            disabled={displayLimit >= availableTags.length}>Show More
                    </button>
                    <button className="tag-filter__display-buttons__button"
                            onClick={handleLessClick}
                            disabled={displayLimit <= initialDisplayLimit}>Show Less
                    </button>
                </div>
            </div>
    );
}

function Tag({tag, count = 0, state = 'none', onClick}: {
    tag: string;
    count?: number;
    state?: 'included' | 'excluded' | 'none';
    onClick: (e: any, tag: string, state: 'included' | 'excluded' | 'none') => void;
}) {
    return (
            <div className={`tag-filter__tag ${state}`}
                 onClick={(e) => onClick(e, tag, state)}
                 onContextMenu={(e) => onClick(e, tag, state)}
            >{tag + (count > 0 ? ` • ${count}` : "")}</div>
    );
}