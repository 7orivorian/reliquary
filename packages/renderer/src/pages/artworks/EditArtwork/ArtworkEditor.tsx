import './ArtworkEditor.scss';
import {useEffect, useState} from 'react';
import {useTags} from '../../../context/TagContext';
import RangeSlider from '../../../components/inputs/slider/RangeSlider/RangeSlider';
import RadioButton, {RadioButtonOption} from '../../../components/inputs/button/RadioButton/RadioButton';
import TagInput from '../../../components/inputs/tag/TagInput/TagInput';
import {useArtists} from '../../../context/ArtistContext';
import ArtistInput from '../../../components/inputs/artist/ArtistInput/ArtistInput';

type Props = {
    initialTitle?: string;
    initialDescription?: string;
    initialRating?: number;
    initialMadeWithAi?: AIGenStatus;
    initialTags?: string[];
    initialArtists?: string[];
    submit: (data: ArtworkFormData, file: File) => void;
    cancel: () => void;
    imgFile: File;
};

export default function ArtworkEditor({
                                          initialTitle = '',
                                          initialDescription = '',
                                          initialRating = 5,
                                          initialMadeWithAi = 'NO',
                                          initialTags = [],
                                          initialArtists = [],
                                          submit,
                                          cancel,
                                          imgFile,
                                      }: Props) {
    const [displayImg, setDisplayImg] = useState<string>(URL.createObjectURL(imgFile));
    useEffect(() => {
        setDisplayImg(URL.createObjectURL(imgFile));
    }, [imgFile]);

    const [title, setTitle] = useState<string>(initialTitle);
    const [description, setDescription] = useState<string>(initialDescription);

    const [rating, setRating] = useState<number>(initialRating);

    const [madeWithAi, setMadeWithAi] = useState<AIGenStatus>(initialMadeWithAi);
    const handleMadeWithAiChange = (value: string) => {
        switch (value) {
            case 'NO':
            case 'POSSIBLY':
            case 'LIKELY':
            case 'YES':
                setMadeWithAi(value);
                break;
            default:
                throw new Error('Invalid value for AI status');
        }
    };

    const {tags} = useTags();
    const [availableTags, setAvailableTags] = useState<string[]>(tags.map(tag => tag.name));
    const [selectedTags, setSelectedTags] = useState<string[]>(initialTags);
    useEffect(() => {
        setAvailableTags(tags.map(tag => tag.name));
    }, [tags]);

    const {artists} = useArtists();
    const [selectedArtists, setSelectedArtists] = useState<string[]>(initialArtists);

    const submitForm = () => {
        if (title.length === 0) {
            return;
        }
        submit({
            title,
            description,
            rating,
            aiGenerated: madeWithAi,
            tags: selectedTags,
            artists: selectedArtists.map((artist: string): ArtistFormData => ({
                name: artist,
                aliases: [],
                links: [],
            })),
        }, imgFile);
    };

    return (
        <div className="save-artwork">
            <div className="save-artwork__header">
                <p className="save-artwork__header-text">Save Artwork</p>
            </div>
            <div className="save-artwork__buttons">
                <button className="save-artwork__button save" onClick={submitForm}>Save</button>
                <button className="save-artwork__button cancel" onClick={cancel}>Cancel</button>
            </div>
            <div className="save-artwork__img-container">
                <img className="save-artwork__img"
                     src={displayImg}
                     alt="img_preview"
                />
            </div>
            <div className="save-artwork__form-container">
                <div className="save-artwork__form-part">
                    <label htmlFor="title" className="save-artwork__form-label">Title</label>
                    <input id="title"
                           className="save-artwork__form-input"
                           type="text"
                           placeholder="e.g. Aloy at Dawn"
                           autoFocus
                           value={title}
                           onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="save-artwork__form-part">
                    <label htmlFor="description" className="save-artwork__form-label">Description</label>
                    <textarea id="description"
                              className="save-artwork__form-input"
                              placeholder="e.g. Splash art of Horizon Zero Dawn"
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className="save-artwork__form-part">
                    <label htmlFor="rating" className="save-artwork__form-label">Rating</label>
                    <RangeSlider min={0} max={10} value={rating} onChange={setRating} />
                </div>
                <div className="save-artwork__form-part">
                    <label htmlFor="radio-button" className="save-artwork__form-label">Made with AI</label>
                    <RadioButton value={madeWithAi} options={aiOptions} onChange={handleMadeWithAiChange} />
                </div>
                <div className="save-artwork__form-part">
                    <label htmlFor="tag-input" className="save-artwork__form-label">Tags</label>
                    <TagInput
                        placeholder="e.g. abstract"
                        availableTags={availableTags}
                        selectedTags={selectedTags}
                        onChange={setSelectedTags}
                    />
                </div>
                <div className="save-artwork__form-part">
                    <label htmlFor="artist-input" className="save-artwork__form-label">Artists</label>
                    <ArtistInput
                        placeholder="e.g. AkramBham"
                        availableArtists={artists}
                        selectedArtists={selectedArtists}
                        onChange={setSelectedArtists}
                    />
                </div>
            </div>
        </div>
    );
}

const aiOptions: RadioButtonOption[] = [
    {label: 'No', value: 'NO'},
    {label: 'Possibly', value: 'POSSIBLY'},
    {label: 'Likely', value: 'LIKELY'},
    {label: 'Yes', value: 'YES'},
];