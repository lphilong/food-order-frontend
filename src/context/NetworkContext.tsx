import React, { createContext, useEffect, useState, ReactNode, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

interface NetworkContextType {
    isOnline: boolean;
}

const NetworkContext = createContext<NetworkContextType | undefined>(undefined);

interface NetworkProviderProps {
    children: ReactNode;
}

export const NetworkProvider: React.FC<NetworkProviderProps> = ({ children }) => {
    const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
    const navigate = useNavigate();

    useEffect(() => {
        const updateOnlineStatus = () => {
            const onlineStatus = navigator.onLine;
            setIsOnline(onlineStatus);

            if (!onlineStatus) {
                navigate('/offline');
            } else {
                navigate('/');
            }
        };
        window.addEventListener('online', updateOnlineStatus);
        window.addEventListener('offline', updateOnlineStatus);

        return () => {
            window.removeEventListener('online', updateOnlineStatus);
            window.removeEventListener('offline', updateOnlineStatus);
        };
    }, [navigate]);

    return <NetworkContext.Provider value={{ isOnline }}>{children}</NetworkContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useNetwork = (): NetworkContextType => {
    const context = useContext(NetworkContext);
    if (context === undefined) {
        throw new Error('useNetwork must be used within a NetworkProvider');
    }
    return context;
};
