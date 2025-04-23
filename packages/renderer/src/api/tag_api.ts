import {stringifyPageableParams} from './api_helpers';
import {fetchApi} from './api';

export async function fetchTags(params?: PageableParams): Promise<TagList> {
    const json: any = await fetchApi(`tags?${stringifyPageableParams(params)}`);
    if (json) {
        return json.content as TagList;
    }
    return [];
}