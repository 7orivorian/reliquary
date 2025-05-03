export function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function unique(arr: string[]): string[] {
    return Array.from(new Set(arr));
}

export function sanitizeTag(str: string): string {
    return sanitize(str).toLowerCase().trim();
}

export function sanitizeArtistName(str: string): string {
    return str.trim();
}

export function sanitize(str: string): string {
    return str.replace(/[^a-zA-Z0-9_-]/g, '');
}

export function sanitizeKeepWhitespace(str: string): string {
    return str.replace(/[^a-zA-Z0-9\s_-]/g, '');
}
