export default function FavoriteIcon({className, onClick}: Props) {
    return (
        <svg
            className={className ? className : ""}
            onClick={onClick}
            xmlns="http://www.w3.org/2000/svg"
            height="100%"
            width="100%"
            viewBox="0 -960 960 960"
            fill="#FFFFFF">
            <path d="M479-118q-18 0-34.5-6T415-143l-54-51Q238-306 146.5-413.5T55-643q0-101 67-169t167-68q50 0 99 21.5t91 73.5q47-52 93-73.5t97-21.5q101 0 169 68t68 169q0 122-93 229.5T598-193l-54 50q-13 13-30 19t-35 6Z"/>
        </svg>
    );
}

type Props = {
    className?: string;
    onClick?: () => void;
};