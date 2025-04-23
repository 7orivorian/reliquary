import './FileUploadZone.scss';
import {ChangeEvent, useRef} from 'react';
import {useFiles} from '../../../context/FileContext';
import {useNavigate} from 'react-router-dom';

export default function FileUploadZone({accept}: {
    accept?: string;
}) {
    const navigate = useNavigate();
    const {setFiles} = useFiles();

    const hiddenFileInput = useRef<HTMLInputElement>(null);

    const handleClick = () => {
        hiddenFileInput?.current?.click();
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFiles(e.target.files);
        navigate('/upload');
    };

    return (
        <div className="upload-zone__container">
            <button className="upload-zone__button" onClick={handleClick}>Drop images here!</button>
            <input
                ref={hiddenFileInput}
                className="upload-zone__input"
                type="file"
                accept={accept}
                multiple
                onChange={handleChange}
            />
        </div>
    );
}