'use client';

import React, { useState } from 'react';
import PriceTable from '@/components/PriceTable';
import StockSelectModal from '@/components/StockSelectModal';

const Home: React.FC = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-100">
      <div className="w-full max-w-3xl bg-white rounded shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-4 text-center">Stock Prices</h1>
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={handleOpenModal}
            className="py-2 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            Select a Stock
          </button>
        </div>
        <StockSelectModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
        <PriceTable />
      </div>
    </main>
  );
};

export default Home;
