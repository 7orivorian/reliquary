export default function ChevronLeftIcon({className, onClick}: Props) {
    return (
        <svg
            className={className ? className : ""}
            onClick={onClick}
            xmlns="http://www.w3.org/2000/svg"
            height="100%"
            width="100%"
            viewBox="0 -960 960 960"
            fill="#FFFFFF">
            <path d="m430-481 165 165q14 14 13.5 33T594-250q-14 14-33.5 14T527-250L330-447q-7-7-11-16t-4-18q0-9 4-18t11-16l198-198q14-14 33.5-14t33.5 14q14 14 14 33.5T595-646L430-481Z"/>
        </svg>
    );
}

type Props = {
    className?: string;
    onClick?: () => void;
};