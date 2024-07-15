import { setPrices } from '@/store/store';
import { fetchPrices } from '@/utils/api';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const PriceTable: React.FC = () => {
    const dispatch = useDispatch();
    const prices = useSelector((state: any) => state.prices);
    const selectedStock = useSelector((state: any) => state.selectedStock);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAndSetPrices = async () => {
            try {
                setIsLoading(true);
                const data = await fetchPrices(selectedStock);
                dispatch(setPrices(data));
            } catch (error) {
                console.error('Error fetching prices:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAndSetPrices();

        const intervalId = setInterval(fetchAndSetPrices, 20000);

        return () => clearInterval(intervalId);
    }, [selectedStock, dispatch]);

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price (USD)</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {isLoading ? (
                        <tr>
                            <td colSpan={3} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">Loading...</td>
                        </tr>
                    ) : (
                        prices.map((price: any, index: number) => (
                            <tr key={price.id || index} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{price.name.charAt(0).toUpperCase() + price.name.slice(1)}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${price.price.toFixed(2)}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(price.timestamp).toLocaleString()}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default PriceTable;
