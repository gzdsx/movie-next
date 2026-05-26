'use client';

import React, {createContext, useContext, useState, useCallback} from 'react';
import MediaLibrary, {MediaType} from "@/components/backend/MediaLibrary";
import {App} from "antd";

interface MediaLibraryOptions {
    multiple?: boolean;
    onSelect: (medias: MediaType[]) => void;
}

interface BackendAppContextType {
    mediaLibrary: {
        open: (options: MediaLibraryOptions) => void;
        close: () => void;
    },
    administrator: any;
}

const BackendAppContext = createContext<BackendAppContextType | undefined>(undefined);

export function BackendAppProvider({children, administrator}: { children: React.ReactNode, administrator: any }) {
    const [mediaLibraryOpen, setMediaLibraryOpen] = useState(false);
    const [mediaLibraryOptions, setMediaLibraryOptions] = useState<MediaLibraryOptions | null>(null);

    const openMediaLibrary = useCallback((options: MediaLibraryOptions) => {
        setMediaLibraryOpen(true);
        setMediaLibraryOptions(options);
    }, []);

    const closeMediaLibrary = useCallback(() => {
        setMediaLibraryOpen(false);
    }, []);

    const contextValue: BackendAppContextType = {
        mediaLibrary: {
            open: openMediaLibrary,
            close: closeMediaLibrary,
        },
        administrator,
    };

    return (
        <BackendAppContext.Provider value={contextValue}>
            {children}
            {
                mediaLibraryOpen && (
                    <MediaLibrary
                        {...mediaLibraryOptions}
                        open={true}
                        onClose={closeMediaLibrary}
                    />
                )
            }
        </BackendAppContext.Provider>
    )
}

export function useBackendApp() {
    const context = useContext(BackendAppContext);
    if (!context) {
        throw new Error('useBackendApp must be used inside BackendAppProvider');
    }
    return context;
}

export function useMediaLibrary() {
    const {mediaLibrary} = useBackendApp();
    return mediaLibrary;
}

export function useMessage() {
    const {message} = App.useApp();
    return message;
}

export function useAdministrator() {
    const {administrator} = useBackendApp();
    return administrator;
}