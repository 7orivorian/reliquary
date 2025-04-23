import './TagForm.scss';
import React, {useState} from 'react';
import TagDisplay from '../../TagDisplay/TagDisplay';
import {unique} from '@app/utils';

export default function TagForm({tags, onSubmit}: {
    tags: string[];
    onSubmit: (tags: string[]) => void;
}) {
    const [tagList, setTagList] = useState<string[]>(unique(tags));
    const [hlTags, setHlTags] = useState<string[]>([]);
    const [tagInput, setTagInput] = useState<string>('');

    const addTag = (tag: string) => {
        setTagList(prev => unique([...prev, tag]));
        setTagInput('');

        setHlTags(prev => unique([...prev, tag]));
        setTimeout(() => {
            setHlTags(prev => prev.filter(hlTag => hlTag !== tag));
        }, 200);
    };

    const handleSave = () => {
        console.log('save', tagList);
        onSubmit(tagList);
    };

    const handleCancel = () => {
        console.log('cancel', tags);
        onSubmit(tags);
    };

    const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTagInput(e.target.value.trim().toLowerCase());
    };

    const handleTagInputKeyDown = (e: any) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            e.stopPropagation();
            if (tagInput.length > 0) {
                addTag(tagInput);
            }
        }
    };

    const handleTagClick = (tag: string) => {
        setTagList(prev => prev.filter(prevTag => prevTag !== tag));
    };

    return (
        <div className={'tag-form-container'}>
            <h2 className={'tag-form-header'}>Edit Tags</h2>
            <div className={'tag-form form dark'}>
                <label>Search or Create Tags</label>
                <input
                    type="text"
                    placeholder="tag"
                    value={tagInput}
                    onChange={handleTagInputChange}
                    onKeyDown={handleTagInputKeyDown}
                />
            </div>
            <TagDisplay tags={tagList} highlightedTags={hlTags} onClick={handleTagClick} />
            <div className={'tag-form-buttons'}>
                <button type="submit" className={'tag-form-submit tag-form-button'} onClick={handleSave}>Save</button>
                <button type="button"
                        className={'tag-form-cancel tag-form-button'}
                        onClick={handleCancel}>Cancel
                </button>
            </div>
        </div>
    );
}