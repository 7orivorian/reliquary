import React, {useState} from "react";
import "./SizeInput.scss";

interface SizeInputProps {
    width: number;
    height: number;
    min?: number;
    max?: number;
    step?: number;
    onChange: (width: number, height: number) => void;
}

const SizeInput: React.FC<SizeInputProps> = ({
                                                 width: initialWidth,
                                                 height: initialHeight,
                                                 min = 1,
                                                 max = 10000,
                                                 step = 1,
                                                 onChange,
                                             }) => {
    const [width, setWidth] = useState(initialWidth);
    const [height, setHeight] = useState(initialHeight);

    const clamp = (value: number) => Math.min(max, Math.max(min, value));

    const handleChange = (value: string, isWidth: boolean) => {
        const newValue: number = clamp(parseInt(value) || min);
        if (isWidth) {
            setWidth(newValue);
            onChange(newValue, height);
        } else {
            setHeight(newValue);
            onChange(width, newValue);
        }
    };

    return (
            <div className="size-input">
                <input
                        type="number"
                        className="size-input__field"
                        value={width}
                        min={min}
                        max={max}
                        step={step}
                        onChange={(e) => handleChange(e.target.value, true)}
                />
                <span className="size-input__separator">×</span>
                <input
                        type="number"
                        className="size-input__field"
                        value={height}
                        min={min}
                        max={max}
                        step={step}
                        onChange={(e) => handleChange(e.target.value, false)}
                />
            </div>
    );
};

export default SizeInput;