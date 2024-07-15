import React from 'react';
import { useDispatch } from 'react-redux';
import { setSelectedStock } from '@/store/store';

interface StockSelectProps {
    onClose: () => void;
}

const StockSelect: React.FC<StockSelectProps> = ({ onClose }) => {
    const dispatch = useDispatch();

    const handleChangeStock = (e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(setSelectedStock(e.target.value));
        onClose()
    };

    return (
        <div className="flex items-center justify-between mb-4">
            <label htmlFor="stock-select" className="mr-4 font-semibold">Select a Stock:</label>
            <select
                id="stock-select"
                onChange={handleChangeStock}
                className="py-2 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
                <option value="bitcoin">Bitcoin</option>
                <option value="ethereum">Ethereum</option>
                <option value="tether">Tether</option>
                <option value="solana">Solana</option>
            </select>
        </div>
    );
};

export default StockSelect;
