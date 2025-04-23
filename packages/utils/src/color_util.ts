export type Color = {
    hex: string;
    luminance: number;
    hsl: HSL;
    rgb: RGB;
};

export type HSL = {
    hue: number;
    saturation: number;
    lightness: number;
};

export type RGB = {
    red: number;
    green: number;
    blue: number;
};

export function colorsFromHexs(hexs: string[]): Color[] {
    return hexs.map(hex => colorFromHex(hex));
}

export function colorFromHex(hex: string): Color {
    const rgb: RGB = hexToRgb(hex);
    const hsl: HSL = rgbToHsl(rgb);
    return {
        hex,
        rgb,
        hsl,
        luminance: getLuminance(rgb),
    };
}

function hexToRgb(hex: string): RGB {
    const bigint = parseInt(hex.slice(1), 16);
    return {
        red: (bigint >> 16) & 255,
        green: (bigint >> 8) & 255,
        blue: bigint & 255
    };
}

function rgbToHsl(rgb: RGB): HSL {
    let r: number = rgb.red,
        g: number = rgb.green,
        b: number = rgb.blue;

    r /= 255;
    g /= 255;
    b /= 255;

    const max: number = Math.max(r, g, b),
        min: number = Math.min(r, g, b);
    let h: number, s: number;
    const l: number = (max + min) / 2;

    if (max == min) {
        h = s = 0; // achromatic
    } else {
        const d: number = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
            default:
                throw new Error("Invalid color");
        }

        h /= 6;
    }

    return {hue: h, saturation: s, lightness: l};
}

function getLuminance(rgb: RGB): number {
    const toLinear = (c: number) => (c / 255 <= 0.03928) ? c / 255 / 12.92 : ((c / 255 + 0.055) / 1.055) ** 2.4;
    return 0.2126 * toLinear(rgb.red) + 0.7152 * toLinear(rgb.green) + 0.0722 * toLinear(rgb.blue);
}