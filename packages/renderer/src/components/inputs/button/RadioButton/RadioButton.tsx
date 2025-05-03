import './RadioButton.scss';

export type RadioButtonOption = {
    label: string;
    value: string;
    disabled?: boolean;
};

type Props = {
    value: string;
    options: RadioButtonOption[];
    onChange: (value: string) => void;
};

export default function RadioButton({value, options, onChange}: Props) {
    const handleClick = (value: string) => {
        onChange(value);
    };

    return (
            <div className="radio-button">
                {options.map((btn: RadioButtonOption) => {
                    return (
                            <button
                                    key={btn.value}
                                    className={`radio-button__btn${value === btn.value ? " active" : ""}`}
                                    disabled={btn.disabled}
                                    onClick={(): void => {
                                        handleClick(btn.value);
                                    }}
                            >{btn.label}</button>
                    )
                })}
            </div>
    );
}