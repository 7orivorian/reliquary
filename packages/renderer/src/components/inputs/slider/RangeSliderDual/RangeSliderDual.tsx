import "./RangeSliderDual.scss";
import React, {useEffect, useRef, useState} from "react";

interface Props {
    min?: number;
    max?: number;
    step?: number;
    minValue?: number;
    maxValue?: number;
    onChange: (min: number, max: number) => void;
}

export default function RangeSliderDual({
                                            min = 0,
                                            max = 100,
                                            step = 1,
                                            minValue = 50,
                                            maxValue = 50,
                                            onChange,
                                        }: Props) {
    const sliderRef = useRef<HTMLDivElement>(null);
    const [minThumb, setMinThumb] = useState(minValue);
    const [maxThumb, setMaxThumb] = useState(maxValue);

    useEffect(() => {
        setMinThumb(minValue);
        setMaxThumb(maxValue);
    }, [minValue, maxValue]);

    const getPercentage = (val: number) => ((val - min) / (max - min)) * 100;

    const updateValueFromEvent = (event: MouseEvent | TouchEvent, isMin: boolean) => {
        if (!sliderRef.current) {
            return;
        }
        const rect = sliderRef.current.getBoundingClientRect();
        const clientX = "touches" in event ? event.touches[0].clientX : event.clientX;
        const newPercentage = ((clientX - rect.left) / rect.width) * 100;
        let newValue = Math.round((newPercentage / 100) * (max - min) / step) * step + min;
        newValue = Math.min(max, Math.max(min, newValue));

        if (isMin) {
            if (newValue <= maxThumb) {
                setMinThumb(newValue);
                onChange(newValue, maxThumb);
            }
        } else {
            if (newValue >= minThumb) {
                setMaxThumb(newValue);
                onChange(minThumb, newValue);
            }
        }
    };

    const startDrag = (event: React.MouseEvent | React.TouchEvent, isMin: boolean) => {
        updateValueFromEvent(event.nativeEvent, isMin);
        const moveHandler = (e: MouseEvent | TouchEvent) => updateValueFromEvent(e, isMin);
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

    const handleTrackClick = (event: React.MouseEvent) => {
        if (!sliderRef.current) return;
        const rect = sliderRef.current.getBoundingClientRect();
        const clickPercentage = ((event.clientX - rect.left) / rect.width) * 100;
        let clickValue = Math.round((clickPercentage / 100) * (max - min) / step) * step + min;
        clickValue = Math.min(max, Math.max(min, clickValue));

        if (clickValue < minThumb) {
            setMinThumb(clickValue);
            onChange(clickValue, maxThumb);
        } else if (clickValue > maxThumb) {
            setMaxThumb(clickValue);
            onChange(minThumb, clickValue);
        }
    };

    return (
        <div className="range-slider-dual" ref={sliderRef} onClick={handleTrackClick}>
            <div className="range-slider-dual__track"></div>
            <div
                className="range-slider-dual__fill"
                style={{
                    left: `${getPercentage(minThumb)}%`,
                    width: `${getPercentage(maxThumb) - getPercentage(minThumb)}%`,
                }}
            ></div>

            {/* Min Thumb */}
            <div
                className="range-slider-dual__thumb"
                style={{left: `${getPercentage(minThumb)}%`}}
                onMouseDown={(e) => startDrag(e, true)}
                onTouchStart={(e) => startDrag(e, true)}
            >
                <div className="range-slider-dual__tooltip">{minThumb}</div>
            </div>

            {/* Max Thumb */}
            <div
                className="range-slider-dual__thumb"
                style={{left: `${getPercentage(maxThumb)}%`}}
                onMouseDown={(e) => startDrag(e, false)}
                onTouchStart={(e) => startDrag(e, false)}
            >
                <div className="range-slider-dual__tooltip">{maxThumb}</div>
            </div>
        </div>
    );
}