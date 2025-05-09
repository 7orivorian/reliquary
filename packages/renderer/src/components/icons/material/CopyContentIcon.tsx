export default function CopyContentIcon({className, onClick}: Props) {
    return (
            <svg
                    className={className ? className : ""}
                    onClick={onClick}
                    xmlns="http://www.w3.org/2000/svg"
                    height="100%"
                    width="100%"
                    viewBox="0 -960 960 960"
                    fill="#FFFFFF">
                <path d="M326-192q-39.05 0-66.52-27.48Q232-246.95 232-286v-542q0-39.46 27.48-67.23Q286.95-923 326-923h422q39.46 0 67.23 27.77Q843-867.46 843-828v542q0 39.05-27.77 66.52Q787.46-192 748-192H326ZM172-37q-39.46 0-67.23-27.77Q77-92.54 77-132v-589q0-20 13.5-33.5t34-13.5q20.5 0 34 13.5T172-721v589h469q20 0 33.5 13.5t13.5 34q0 20.5-13.5 34T641-37H172Z"/>
            </svg>
    );
}

type Props = {
    className?: string;
    onClick?: () => void;
};