import React, {createContext, ReactNode, useContext, useEffect, useState} from 'react';

import {fetchArtists} from '../api/artist_api';

type ProviderProps = {
    children: ReactNode;
};

export interface ContextData {
    artists: ArtistList;
}

const ArtistContext = createContext<ContextData>({
    artists: [],
});

export const ArtistProvider: React.FC<ProviderProps> = ({children}: ProviderProps) => {
    const [artists, setArtists] = useState<ArtistList>([]);

    useEffect(() => {
        fetchArtists().then(setArtists).catch(console.error);
    }, []);

    return (
            <ArtistContext.Provider value={{artists}}>
                {children}
            </ArtistContext.Provider>
    );
};

// Hook for easier usage of the context
export const useArtists = (): ContextData => {
    const context = useContext(ArtistContext);
    if (!context) {
        throw new Error('useArtists must be used within a ArtistProvider');
    }
    return context;
};