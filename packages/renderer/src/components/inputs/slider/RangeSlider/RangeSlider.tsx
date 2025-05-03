import React, {useEffect, useRef, useState} from "react";
import "./RangeSlider.scss";

interface RangeSliderProps {
    min?: number;
    max?: number;
    step?: number;
    value?: number;
    onChange: (val: number) => void;
}

const RangeSlider: React.FC<RangeSliderProps> = ({
                                                     min = 0,
                                                     max = 100,
                                                     step = 1,
                                                     value = 50,
                                                     onChange,
                                                 }) => {
    const sliderRef = useRef<HTMLDivElement>(null);
    const [internalValue, setInternalValue] = useState(value);

    useEffect(() => {
        setInternalValue(value);
    }, [value]);

    const getPercentage = (val: number) => ((val - min) / (max - min)) * 100;

    const updateValueFromEvent = (event: MouseEvent | TouchEvent) => {
        if (!sliderRef.current) {
            return;
        }
        const rect = sliderRef.current.getBoundingClientRect();
        const clientX = "touches" in event ? event.touches[0].clientX : event.clientX;
        const newPercentage = ((clientX - rect.left) / rect.width) * 100;

        // Snap to step values
        let newValue = Math.round((newPercentage / 100) * (max - min) / step) * step + min;
        newValue = Math.min(max, Math.max(min, newValue));

        setInternalValue(newValue);
        onChange(newValue);
    };

    const startDrag = (event: React.MouseEvent | React.TouchEvent) => {
        updateValueFromEvent(event.nativeEvent);
        const moveHandler = (e: MouseEvent | TouchEvent) => updateValueFromEvent(e);
        const stopHandler = () => {
            document.removeEventListener("mousemove", moveHandler);
            document.removeEventListener("touchmove", moveHandler);
            document.removeEventListener("mouseup", stopHandler);
            document.removeEventListener("touchend", stopHandler);
        };

        document.addEventListener("mousemove", moveHandler);
        document.addEventListener("touchmove", moveHandler);
        document.addEventListener("mouseup", stopHandler);
        document.addEventListener("touchend", stopHandler);
    };

    return (
            <div className="range-slider" ref={sliderRef} onMouseDown={startDrag} onTouchStart={startDrag}>
                <div className="range-slider__track"></div>
                <div className="range-slider__fill" style={{width: `${getPercentage(internalValue)}%`}}></div>
                <div className="range-slider__thumb" style={{left: `${getPercentage(internalValue)}%`}}>
                    <div className="range-slider__tooltip">{internalValue}</div>
                </div>
            </div>
    );
};

export default RangeSlider;