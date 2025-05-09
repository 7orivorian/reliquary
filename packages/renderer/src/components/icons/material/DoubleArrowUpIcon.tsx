export default function DoubleArrowUpIcon({className, onClick}: Props) {
    return (
            <svg
                    className={className ? className : ""}
                    onClick={onClick}
                    xmlns="http://www.w3.org/2000/svg"
                    height="100%"
                    viewBox="0 -960 960 960"
                    width="100%"
                    fill="#FFFFFF">
                <path d="M480-388 315-222q-14 14-33 13.5T249-223q-14-14-14-33t14-33l197-197q7-7 16-11t18-4q9 0 18 4t16 11l197 197q14 14 14 33t-14 33q-14 15-33 15t-34-15L480-388Zm0-276L315-498q-14 14-33 13.5T249-498q-14-14-14-33t14-33l197-198q7-7 16-11t18-4q9 0 18 4t16 11l197 198q14 14 14 33t-14 33q-14 14-33 14t-33-14L480-664Z"/>
            </svg>
    );
}

type Props = {
    className?: string;
    onClick?: () => void;
};