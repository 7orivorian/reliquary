import {createContext, FC, ReactNode, useContext, useEffect, useState} from 'react';

import {fetchTags} from '../api/tag_api';

type ProviderProps = {
    children: ReactNode;
};

export interface ContextData {
    tags: TagList;
    createTags: (tags: string[]) => void;
}

const TagContext = createContext<ContextData>({
    tags: [],
    createTags: () => {
        throw new Error('createTags function must be overridden by a provider');
    },
});

export const TagProvider: FC<ProviderProps> = ({children}: ProviderProps) => {
    const [tags, setTags] = useState<TagList>([]);

    useEffect(() => {
        fetchTags().then(setTags).catch(console.error);
    }, []);

    //TODO make a request to create all the given tags
    const createTags = (_tags: string[]) => {

    };

    return (
            <TagContext.Provider value={{tags, createTags}}>
                {children}
            </TagContext.Provider>
    );
};

// Hook for easier usage of the context
export const useTags = (): ContextData => {
    const context = useContext(TagContext);
    if (!context) {
        throw new Error('useTags must be used within a TagProvider');
    }
    return context;
};