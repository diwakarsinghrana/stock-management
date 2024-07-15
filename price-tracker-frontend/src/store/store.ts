import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit'

interface PricesState {
    prices: any[];
    selectedStock: string;
}

const initialState: PricesState = {
    prices: [],
    selectedStock: 'bitcoin',
};

const pricesSlice = createSlice({
    name: 'prices',
    initialState,
    reducers: {
        setPrices: (state, action: PayloadAction<any[]>) => {
            state.prices = action.payload;
        },
        setSelectedStock: (state, action: PayloadAction<string>) => {
            state.selectedStock = action.payload;
        },
    },
});

export const { setPrices, setSelectedStock } = pricesSlice.actions;

function loadState() {
    try {
        const serializedState = localStorage.getItem('reduxState');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        console.error('Error loading state from localStorage:', err);
        return undefined;
    }
}
export const store = () => {
    return configureStore({
        reducer: pricesSlice.reducer,
        preloadedState: (typeof window !== 'undefined') ? loadState() : undefined,
    })
}

export type AppStore = ReturnType<typeof store>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']  