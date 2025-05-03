export default function ImageComponent({className, src, alt}: Props) {
    return (
            <img className={className} src={src} alt={alt}/>
    );
}

interface Props {
    className?: string;
    src: string;
    alt: string;
}