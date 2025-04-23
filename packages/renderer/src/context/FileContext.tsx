import React, {createContext, ReactNode, useContext, useState} from 'react';

type ProviderProps = {
    children: ReactNode;
};

export interface ContextData {
    files: FileList | null;
    setFiles: (files: FileList | null) => void;
    clearFiles: () => void;
}

const FileContext = createContext<ContextData>({
    files: null,
    setFiles: () => {
        throw new Error('setFiles function must be overridden by a provider');
    },
    clearFiles: () => {
        throw new Error('clearFiles function must be overridden by a provider');
    },
});

export const FileProvider: React.FC<ProviderProps> = ({children}: ProviderProps) => {
    const [files, setFiles] = useState<FileList | null>(null);

    const clearFiles = () => {
        setFiles(null);
    };

    return (
        <FileContext.Provider value={{files, setFiles, clearFiles}}>
            {children}
        </FileContext.Provider>
    );
};

// Hook for easier usage of the context
export const useFiles = (): ContextData => {
    const context = useContext(FileContext);
    if (!context) {
        throw new Error('useFiles must be used within a FileProvider');
    }
    return context;
};