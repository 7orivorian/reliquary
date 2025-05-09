export default function HomeIcon({className, onClick}: Props) {
    return (
            <svg
                    className={className ? className : ""}
                    onClick={onClick}
                    xmlns="http://www.w3.org/2000/svg"
                    height="100%"
                    width="100%"
                    viewBox="0 -960 960 960"
                    fill="#FFFFFF">
                <path d="M135-189v-377q0-22.25 9.38-42 9.37-19.75 27.62-33l251-189q24.68-19 56.84-19Q512-849 537-830l251 189q18.25 13.25 28.13 33 9.87 19.75 9.87 42v377q0 39.75-27.62 66.87Q770.75-95 731-95H613q-19.75 0-33.37-13.63Q566-122.25 566-142v-217q0-19.75-13.62-33.38Q538.75-406 519-406h-78q-19.75 0-33.37 13.62Q394-378.75 394-359v217q0 19.75-13.62 33.37Q366.75-95 347-95H229q-39.75 0-66.87-27.13Q135-149.25 135-189Z"/>
            </svg>
    );
}

type Props = {
    className?: string;
    onClick?: () => void;
};