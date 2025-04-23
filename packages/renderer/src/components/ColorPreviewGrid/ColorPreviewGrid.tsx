import './ColorPreviewGrid.scss';
import CopyContentIcon from '../icons/material/CopyContentIcon';
import {Color} from '@app/utils';

const prefix: string = 'color-preview-grid__';

type Props = {
    colors: Color[];
}

export default function ColorPreviewGrid({colors}: Props) {
    return (
        <div className={`${prefix}container`}>
            {
                colors.map((color: Color, index: number) => {
                    return (
                        <ColorDetails key={index} color={color} />
                    );
                })
            }
        </div>
    );
}

function ColorDetails({color}: {
    color: Color;
}) {
    const hex: string = color.hex;
    const hsl: string = `hsl(${(color.hsl.hue * 360).toFixed(0)}, ${(color.hsl.saturation * 100).toFixed(0)}%, ${(color.hsl.lightness * 100).toFixed(0)}%)`;
    const rgb: string = `rgb(${color.rgb.red}, ${color.rgb.green}, ${color.rgb.blue})`;
    const luminance: string = `luminance ${(color.luminance * 100).toFixed(0)}%`;

    return (
        <div
            className={`${prefix}color__container`}
            style={{'--sample-color': hex} as React.CSSProperties}
        >
            <div className={`${prefix}color__sample`}>
            </div>
            <div className={`${prefix}color__row`}>
                <p>{hex}</p>
                <CopyContentIcon
                    className={`${prefix}color__row__copy-icon`}
                    onClick={() => {
                        navigator.clipboard.writeText(hex).catch(console.error);
                    }}
                />
            </div>
            <div className={`${prefix}color__row`}>
                <p>{hsl}</p>
                <CopyContentIcon
                    className={`${prefix}color__row__copy-icon`}
                    onClick={() => {
                        navigator.clipboard.writeText(hsl).catch(console.error);
                    }}
                />
            </div>
            <div className={`${prefix}color__row`}>
                <p>{rgb}</p>
                <CopyContentIcon
                    className={`${prefix}color__row__copy-icon`}
                    onClick={() => {
                        navigator.clipboard.writeText(rgb).catch(console.error);
                    }}
                />
            </div>
            <div className={`${prefix}color__row`}>
                <p>{luminance}</p>
                <CopyContentIcon
                    className={`${prefix}color__row__copy-icon`}
                    onClick={() => {
                        navigator.clipboard.writeText(String(color.luminance)).catch(console.error);
                    }}
                />
            </div>
        </div>
    );
}