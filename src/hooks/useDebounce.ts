import { useState, useEffect } from 'react';

export const useDebounce = (callback: () => void, delay: number) => {
    const [ready, setReady] = useState(true);

    useEffect(() => {
        if (!ready) {
            const handler = setTimeout(() => setReady(true), delay);
            return () => clearTimeout(handler);
        }
    }, [ready, delay]);

    const debouncedCallback = () => {
        if (ready) {
            callback();
            setReady(false);
        }
    };

    return debouncedCallback;
};
