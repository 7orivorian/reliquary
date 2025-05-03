declare global {
    /*
    Artwork
    */
    type ArtworkList = Artwork[];
    type Artwork = {
        id: number;
        imageUrl: string;
        title: string;
        description: string;
        tags: TagList;
        colors: string[];
        aiGenerated: AIGenStatus;
        dateAdded: Date;
        dateModified: Date;
        dateViewed: Date;
        rating: number;
        format: string;
        width: number;
        height: number;
        artists: ArtistList
        relevance?: number;
        _links?: {
            artist: {
                href: string;
            };
            tags: {
                href: string;
            };
        }
    }
    type ArtworkFormData = {
        title: string;
        description: string;
        tags: string[];
        aiGenerated: AIGenStatus;
        rating: number;
        artists: ArtistFormData[];
    }
    type ArtworkParams = {
        title: string;
        description: string;
        ratingEq: number;
        ratingGt: number;
        ratingLt: number;
        widthEq: number;
        widthGt: number;
        widthLt: number;
        heightEq: number;
        heightGt: number;
        heightLt: number;
        aiGenerated: AIGenStatus;
        dateAddedBefore: Date;
        dateAddedAfter: Date;
    }

    /*
    Artist
    */
    type ArtistList = Artist[];
    type Artist = {
        id: number;
        name: string;
        aliases: string[];
        rating: number;
        links: string[];
        entries: number;
        _links?: {
            artworks: {
                href: string;
            };
        }
    }
    type ArtistFormData = {
        name?: string;
        aliases?: string[];
        links?: string[];
    }

    /*
    Tag
    */
    type TagList = Tag[];
    type Tag = {
        id: number;
        name: string;
        entries: number;
        artworks: number[];
    };

    /*
    Pageable
    */
    type PageableParams = {
        page?: number;
        size?: number;
        sort?: Sort;
        sorts?: Sort[];
    }
    type Sort = {
        property: string;
        direction?: SortDirection;
    }
    type SortDirection = 'ASC' | 'DESC';

    /*
    Other
    */
    type AIGenStatus = 'NO' | 'POSSIBLY' | 'LIKELY' | 'YES';

    type QueryParam = {
        key: string;
        value?: string | number | boolean;
        values?: string[] | number[] | boolean[];
    };

    interface PageableResult {
        totalElements: number;
        totalPages: number;
    }
}

export {};