'use client';

import { useEffect, useRef } from 'react'
import { Provider } from 'react-redux'
import { store, AppStore } from './store'

export default function StoreProvider({
    children
}: {
    children: React.ReactNode
}) {
    const storeRef = useRef<AppStore | null>(null);
    if (!storeRef.current) {
        storeRef.current = store()
    }

    function saveState(state: any) {
        try {
            const serializedState = JSON.stringify(state);
            localStorage.setItem('reduxState', serializedState);
        } catch (err) {
            console.error('Error saving state to localStorage:', err);
        }
    }

    useEffect(() => {
        if (storeRef.current != null) {
            const unsubscribe = storeRef.current.subscribe(() => {
                saveState(storeRef.current!.getState());
            });

            return () => {
                unsubscribe();
            };
        }
    }, []);

    return <Provider store={storeRef.current ?? undefined}>{children}</Provider>
}