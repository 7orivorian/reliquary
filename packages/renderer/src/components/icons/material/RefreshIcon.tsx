export default function RefreshIcon({className, onClick}: Props) {
    return (
            <svg
                    className={className ? className : ""}
                    onClick={onClick}
                    xmlns="http://www.w3.org/2000/svg"
                    height="100%"
                    width="100%"
                    viewBox="0 -960 960 960"
                    fill="#FFFFFF">
                <path d="M477-135q-143 0-244-101T132-480q0-143 101-244.5T477-826q91 0 160.5 36.5T757-687v-103q0-15.4 9.8-25.7Q776.6-826 793-826q15.4 0 25.7 10.3Q829-805.4 829-790v208q0 20-14 33.5T781-535H572q-14.97 0-24.99-10.3Q537-555.6 537-571q0-14.97 10.3-24.99Q557.6-606 573-606h128q-39-56-94.09-90.5Q551.83-731 477-731q-105 0-178 73t-73 178q0 105 73 178t178 73q67 0 126-33.5t92-91.5q10.62-16.16 28.81-23.08Q742-384 759.74-376 778-369 785-352.5t-1 32.5q-44 85-126.5 135T477-135Z"/>
            </svg>
    );
}

type Props = {
    className?: string;
    onClick?: () => void;
};