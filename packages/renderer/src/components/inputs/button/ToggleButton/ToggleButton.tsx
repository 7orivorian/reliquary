import {useState} from 'react';

type Props = {
    className?: string;
    text?: string;
    onText?: string;
    offText?: string;
    value?: boolean;
    disabled?: boolean;
    onClick?: (state: boolean) => boolean;
}

export default function ToggleButton({className, text, onText, offText, value, disabled, onClick}: Props) {
    const [val, setVal] = useState<boolean>(value === undefined ? false : value);

    const handleClick = () => {
        if (disabled) {
            return;
        }
        setVal((prev: boolean): boolean => {
            if (onClick) {
                return onClick(!prev);
            }
            return !prev;
        });
    };

    return (
        <button
            className={`${className} ${val ? 'on' : 'off'}`}
            disabled={disabled}
            onClick={handleClick}
        >{text ? text : (val ? onText : offText)}</button>
    );
}