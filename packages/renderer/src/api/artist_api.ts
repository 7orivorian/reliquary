import {stringifyPageableParams, stringifyParams} from './api_helpers';
import {fetchApi} from './api';

export async function searchArtists(params?: QueryParam[], pageableParams?: PageableParams): Promise<ArtistResult> {
    const json: any = await fetchArtistApi(`search?${stringifyParams(params)}${stringifyPageableParams(pageableParams)}`);
    if (json) {
        return {
            artists: json.content,
            totalElements: json.totalElements,
            totalPages: json.totalPages,
        };
    }
    return {
        artists: [],
        totalElements: 0,
        totalPages: 0,
    };
}

export async function fetchArtists(pageableParams?: PageableParams): Promise<ArtistList> {
    const json: any = await fetchApi(`artists?${stringifyPageableParams(pageableParams)}`);
    if (json) {
        return json.content;
    }
    return [];
}

export async function fetchArtistApi(endpoint: string): Promise<any | null> {
    return fetchApi(`artists/${endpoint}`);
}

export interface ArtistResult extends PageableResult {
    artists: ArtistList;
}