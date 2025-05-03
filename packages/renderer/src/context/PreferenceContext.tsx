import React, {createContext, ReactNode, useContext} from 'react';
import useLocalStorage from "../hooks/LocalStorageHook";

type ProviderProps = {
    children: ReactNode;
};

interface Preferences {
    imageDirectory: string;
    favoriteRating: number;
    searchResultsPerPage: number;
}

interface PreferenceContextType {
    preferences: Preferences;
    setSearchResultsPerPage: (value: number) => void;
}

const PreferenceContext = createContext<PreferenceContextType | undefined>(undefined);

export const PreferenceProvider: React.FC<ProviderProps> = ({children}: ProviderProps) => {
    const [imageDirectory, _setImageDirectory] = useLocalStorage<string>('imageDirectory', '');
    const [favoriteRating, _setFavoriteRating] = useLocalStorage<number>('favoriteRating', 9);
    const [searchResultsPerPage, setSearchResultsPerPage] = useLocalStorage<number>('searchResultsPerPage', 20);

    const preferences: Preferences = {
        imageDirectory,
        favoriteRating,
        searchResultsPerPage,
    };

    return (
            <PreferenceContext.Provider
                    value={{
                        preferences,
                        setSearchResultsPerPage
                    }}
            >{children}</PreferenceContext.Provider>
    );
};

// Hook for easier usage of the context
export const usePreferences = (): PreferenceContextType => {
    const context = useContext(PreferenceContext);
    if (!context) {
        throw new Error('usePreferences must be used within a PreferenceProvider');
    }
    return context;
};

export type {Preferences};