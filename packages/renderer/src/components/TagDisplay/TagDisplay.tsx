import './TagDisplay.scss';

const prefix: string = 'tag-display__';

type Props = {
    tags: string[];
    highlightedTags?: string[];
    onClick?: (tag: string) => void;
};

export default function TagDisplay({tags, highlightedTags, onClick}: Props) {
    return (
        <div className={`${prefix}container`}>
            {
                tags.map((tag: string) => {
                    const handleClick = () => {
                        if (onClick) {
                            onClick(tag);
                        }
                    };
                    return (
                        <button
                            key={tag}
                            type="button"
                            className={`${prefix}tag${highlightedTags?.includes(tag) ? ' highlighted' : ''}`}
                            onClick={handleClick}
                        >{tag}</button>
                    );
                })
            }
        </div>
    );
}