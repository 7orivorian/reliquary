import {API_URL} from '@app/utils';

export async function fetchApi(endpoint: string): Promise<any | null> {
    const url: string = `${API_URL}/${endpoint}`;
    const response: Response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (response.ok) {
        return await response.json();
    } else {
        console.error(`Failed to fetch API: ${response.status} ${response.statusText}`);
    }
    return Promise.resolve(null);
}