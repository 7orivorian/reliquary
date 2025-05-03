import React, {Context, createContext, ReactNode, useContext, useEffect, useState} from 'react';
import {usePreferences} from './PreferenceContext';

import {fetchArtworks, postArtwork, putArtwork} from '../api/artwork_api';

type ProviderProps = {
    children: ReactNode;
};

type ContextType = {
    artwork: ArtworkList;
    addArtwork: (file: File, metadata: ArtworkFormData) => Promise<boolean>;
    updateArtwork: (id: number, metadata: ArtworkFormData) => Promise<boolean>;
    recentlyViewedArtwork: ArtworkList;
    refreshRecentlyViewed: () => void;
    favoriteArtwork: ArtworkList;
    refreshFavorites: () => void;
    recentlyAddedArtwork: ArtworkList;
    refreshRecentlyAdded: () => void;
}

const ArtworkContext: Context<ContextType> = createContext<ContextType>({
    artwork: [],
    addArtwork: (): Promise<boolean> => {
        throw new Error('addArtwork function must be overridden by a provider');
    },
    updateArtwork: (): Promise<boolean> => {
        throw new Error('updateArtwork function must be overridden by a provider');
    },
    recentlyViewedArtwork: [],
    refreshRecentlyViewed: (): void => {
        throw new Error('refreshRecentlyViewed function must be overridden by a provider');
    },
    favoriteArtwork: [],
    refreshFavorites: (): void => {
        throw new Error('refreshFavoriteArtwork function must be overridden by a provider');
    },
    recentlyAddedArtwork: [],
    refreshRecentlyAdded: (): void => {
        throw new Error('refreshRecentlyAdded function must be overridden by a provider');
    },
});

export const ArtworkProvider: React.FC<ProviderProps> = ({children}: ProviderProps) => {
    const {preferences} = usePreferences();

    const [recentlyViewedArtwork, setRecentlyViewedArtwork] = useState<ArtworkList>([]);
    const refreshRecentlyViewed = (): void => {
        fetchArtworks({
            page: 0,
            size: 10,
            sort: {
                property: 'dateViewed',
                direction: 'DESC',
            },
        }).then(
                (artworks: ArtworkList) => setRecentlyViewedArtwork(artworks),
        ).catch((err: Error): void => {
            console.error('Error fetching recently viewed artworks:', err);
            setRecentlyViewedArtwork([]);
        });
    };

    const [favoriteArtwork, setFavoriteArtwork] = useState<ArtworkList>([]);
    const refreshFavorites = (): void => {
        fetchArtworks({
            page: 0,
            size: 10,
            sort: {
                property: 'rating',
                direction: 'DESC',
            },
        }).then(
                (artworks: ArtworkList): ArtworkList => artworks.filter((artwork: Artwork): boolean => artwork.rating >= preferences.favoriteRating),
        ).then(
                (filteredArtworks: ArtworkList): void => setFavoriteArtwork(filteredArtworks),
        ).catch((err: Error): void => {
            console.error('Error fetching favorite artworks:', err);
            setFavoriteArtwork([]);
        });
    };

    const [recentlyAddedArtwork, setRecentlyAddedArtwork] = useState<ArtworkList>([]);
    const refreshRecentlyAdded = (): void => {
        fetchArtworks({
            sort: {
                property: 'dateAdded',
                direction: 'DESC',
            },
            page: 0,
            size: 10,
        }).then(
                (artworks: ArtworkList): void => setRecentlyAddedArtwork(artworks),
        ).catch((err: Error): void => {
            console.error('Error fetching recently added artworks:', err);
            setRecentlyAddedArtwork([]);
        });
    };

    useEffect(() => {
        refreshRecentlyViewed();
        refreshFavorites();
        refreshRecentlyAdded();
    }, []);

    useEffect(() => {
        refreshFavorites();
    }, [preferences.favoriteRating]);

    const [artwork, setArtwork] = useState<ArtworkList>([]);

    const fetchAllArtworks = async (): Promise<ArtworkList> => {
        try {
            const artwork: ArtworkList = await fetchArtworks();
            setArtwork(artwork);
            return artwork;
        } catch (err) {
            console.error('Error fetching all artwork', err);
            return [];
        }
    };

    const addArtwork = async (file: File, metadata: ArtworkFormData): Promise<boolean> => {
        try {
            const res: Artwork | null = await postArtwork(file, metadata);
            if (res != null) {
                await fetchAllArtworks();
                return true;
            }
        } catch (err) {
            console.error('Error adding artwork:', err);
            return false;
        }
        console.error('Unknown error adding artwork');
        return false;
    };

    const updateArtwork = async (id: number, metadata: ArtworkFormData): Promise<boolean> => {
        try {
            const res: Artwork | null = await putArtwork(id, metadata);
            if (res != null) {
                await fetchAllArtworks();
                return true;
            }
        } catch (err) {
            console.error('Error updating artwork:', err);
            return false;
        }
        console.error('Unknown error updating artwork');
        return false;
    };

    return (
            <ArtworkContext.Provider value={{
                artwork, addArtwork, updateArtwork,
                recentlyViewedArtwork, refreshRecentlyViewed,
                favoriteArtwork, refreshFavorites,
                recentlyAddedArtwork, refreshRecentlyAdded,
            }}>
                {children}
            </ArtworkContext.Provider>
    );
};

// Hook for easier usage of the context
export const useArtwork = (): ContextType => {
    const context: ContextType = useContext(ArtworkContext);
    if (!context) {
        throw new Error('useArtwork must be used within a ArtworkProvider');
    }
    return context;
};