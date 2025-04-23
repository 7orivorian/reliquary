export function stringifyPageableParams(params?: PageableParams): string {
    if (!params) {
        return '';
    }
    let s: string = '';

    if (params.page) {
        s += `page=${params.page}&`;
    }
    if (params.size) {
        s += `size=${params.size}&`;
    }
    if (params.sort) {
        if (params.sort.property) {
            s += `sort=${params.sort.property},${params.sort.direction}&`;
        } else {
            s += `sort=${params.sort.property}&`;
        }
    }
    return s;
}

export function stringifyParams(params?: QueryParam[]): string {
    if (!params || params.length === 0) {
        return '';
    }
    let s: string = '';
    params.forEach((param: QueryParam) => {
        if (param.values !== undefined) {
            s += `${param.key}=${param.values.join(',')}&`;
        } else if (param.value !== undefined) {
            s += `${param.key}=${param.value}&`;
        } else {
            throw new Error(`Invalid query param '${param.key}'. Must have a value or values.`);
        }
    });
    return s;
}