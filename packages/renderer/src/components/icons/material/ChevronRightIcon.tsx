export default function ChevronRightIcon({className, onClick}: Props) {
    return (
            <svg
                    className={className ? className : ""}
                    onClick={onClick}
                    xmlns="http://www.w3.org/2000/svg"
                    height="100%"
                    width="100%"
                    viewBox="0 -960 960 960"
                    fill="#FFFFFF">
                <path d="M506-481 341-646q-14-14-13.5-33t14.5-33q14-14 33.5-14t33.5 14l197 197q7 7 11 16t4 18q0 9-4 18t-11 16L408-249q-14 14-33 13.5T342-250q-14-14-14-33.5t14-33.5l164-164Z"/>
            </svg>
    );
}

type Props = {
    className?: string;
    onClick?: () => void;
};