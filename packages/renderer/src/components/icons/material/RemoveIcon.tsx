export default function RemoveIcon({className, onClick}: Props) {
    return (
            <svg
                    className={className ? className : ""}
                    onClick={onClick}
                    xmlns="http://www.w3.org/2000/svg"
                    height="100%"
                    width="100%"
                    viewBox="0 -960 960 960"
                    fill="#FFFFFF">
                <path d="M222-433q-19.75 0-33.37-13.68Q175-460.35 175-480.18q0-19.82 13.63-33.32Q202.25-527 222-527h516q19.75 0 33.88 13.68Q786-499.65 786-479.82q0 19.82-14.12 33.32Q757.75-433 738-433H222Z"/>
            </svg>
    );
}

type Props = {
    className?: string;
    onClick?: () => void;
};