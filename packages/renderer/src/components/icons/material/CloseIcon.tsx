export default function CloseIcon({className, onClick}: Props) {
    return (
            <svg
                    className={className ? className : ""}
                    onClick={onClick}
                    xmlns="http://www.w3.org/2000/svg"
                    height="100%"
                    width="100%"
                    viewBox="0 -960 960 960"
                    fill="#FFFFFF">
                <path d="M480-414 282-216q-14 14-33 14t-33-14q-14-14-14-33t14-33l198-198-198-198q-14-14-14-33t14-33q14-14 33-14t33 14l198 198 198-198q14-14 33-14t33 14q14 14 14 33t-14 33L546-480l198 198q14 14 14 33t-14 33q-14 14-33 14t-33-14L480-414Z"/>
            </svg>
    );
}

type Props = {
    className?: string;
    onClick?: () => void;
};