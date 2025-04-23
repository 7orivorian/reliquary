import {fetchApi} from './api';
import {stringifyPageableParams, stringifyParams} from './api_helpers';
import {API_URL} from '@app/utils';

export async function searchArtworks(params?: QueryParam[], pageableParams?: PageableParams): Promise<ArtworkResult> {
    const json: any = await fetchApi(`artworks/search?${stringifyParams(params)}${stringifyPageableParams(pageableParams)}`);
    if (json) {
        return {
            artworks: json.content,
            totalElements: json.totalElements,
            totalPages: json.totalPages,
        };
    }
    return {
        artworks: [],
        totalElements: 0,
        totalPages: 0,
    };
}

export async function fetchArtworks(params?: PageableParams): Promise<ArtworkList> {
    const json: any = await fetchApi(`artworks?${stringifyPageableParams(params)}`);
    if (json) {
        return json.content as ArtworkList;
    }
    return [];
}

export async function postArtwork(file: File, metadata: ArtworkFormData): Promise<Artwork | null> {
    const formData = new FormData();
    formData.append('metadata', new Blob([JSON.stringify(metadata)], {type: 'application/json'}));
    formData.append('file', file);

    const response: Response = await fetch(`${API_URL}/artworks/add`, {
        method: 'POST',
        body: formData,
    });
    if (response.ok) {
        const json: any = await response.json();
        return json as Artwork;
    }
    console.error(`Failed to add artwork: ${response.status} ${response.statusText}`);
    return Promise.resolve(null);
}

export async function putArtwork(id: number, metadata: ArtworkFormData): Promise<Artwork | null> {
    const response: Response = await fetch(`${API_URL}/artworks/edit?id=${id}`, {
        method: 'POST',
        body: JSON.stringify(metadata),
    });
    if (response.ok) {
        const json: any = await response.json();
        return json as Artwork;
    }
    console.error(`Failed to edit artwork: ${response.status} ${response.statusText}`);
    return Promise.resolve(null);
}

export async function fetchArtworkApi(endpoint: string): Promise<any | null> {
    return fetchApi(`artworks/${endpoint}`);
}

export interface ArtworkResult extends PageableResult {
    artworks: ArtworkList;
}