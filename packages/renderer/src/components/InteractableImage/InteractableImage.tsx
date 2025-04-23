import './InteractableImage.scss';
import {useState} from 'react';

interface InteractableImageProps {
    src: string;
    alt?: string;
}

export default function InteractableImage({src, alt}: InteractableImageProps) {
    const [isZoomed, setIsZoomed] = useState(false);

    const toggleZoom = () => {
        setIsZoomed((prev) => !prev);
    };

    return (
        <div className={`image-container ${isZoomed ? 'zoomed' : ''}`} onClick={toggleZoom}>
            <img src={src} alt={alt} className="zoomable-image" />
        </div>
    );
}