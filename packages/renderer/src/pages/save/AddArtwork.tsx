import './AddArtwork.scss';
import ArtworkEditor from '../artworks/EditArtwork/ArtworkEditor';
import {useArtwork} from '../../context/ArtworkContext';
import {useState} from 'react';

export default function AddArtwork() {
    const {addArtwork} = useArtwork();
    const [imgFiles, setImgFiles] = useState<FileList | null>(null);

    const submit = async (data: ArtworkFormData, file: File) => {
        const success: boolean = await addArtwork(file, data);
        if (success) {
            setImgFiles(_prev => {
                return null;
            });
        }
    };
    const cancel = () => {
        setImgFiles(null);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImgFiles(e.target.files);
        }
    };
    if (!imgFiles || imgFiles.length === 0) {
        return (
            <input type="file" multiple onChange={handleFileChange} />
        );
    }
    return (
        <ArtworkEditor submit={submit} cancel={cancel} imgFile={imgFiles[0]} />
    );
}