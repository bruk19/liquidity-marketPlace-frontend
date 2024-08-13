// src/components/LiquidityMarket.tsx
"use client";
import React, { useState, useEffect } from 'react';
import Modal from './Modal'; 
import CheckPool from './CheckPool'; 
import AddLiquidity from './AddLiquidity'; 
import { fetchPools } from '../utils/uniswapClient';
import Image from 'next/image';

interface PoolInfo {
  address: string;
  token0: string;
  token1: string;
  fee: number;
}

const LiquidityMarket: React.FC = () => {
  const [isPoolModalOpen, setIsPoolModalOpen] = useState(false);
  const [isLiquidityModalOpen, setIsLiquidityModalOpen] = useState(false);
  const [pools, setPools] = useState<PoolInfo[]>([]); // State to hold fetched pools

  useEffect(() => {
    const fetchAndSetPools = async () => {
      try {
        const fetchedPools = await fetchPools(1000, 0); // Fetch the first 1000 pools
        setPools(fetchedPools); // Update state with fetched pools
      } catch (error) {
        console.error('Error fetching pools:', error);
      }
    };
    fetchAndSetPools(); // Call the fetch function
  }, []);

  return (
    <div>
      <div className="relative h-[100vh]">
        <div
          className="absolute inset-0 bg-[url('/cryp.jpg')] bg-cover bg-center opacity-95"
        ></div>
        <div className="relative flex flex-col justify-center pt-8 items-center h-full px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-normal font-serif mt-6 text-orange-400">Coin Market</h3>
          <h1 className="text-6xl font-medium text-orange-400 font-serif text-white my-10">Create Liquidity Market Place</h1>
          <p className="text-white w-full max-w-3xl text-center">
            Looking to capitalize on market opportunities and increase the liquidity
            of your assets? Our platform provides the perfect environment for
            investment and market access.
          </p>
          <div>
            
          </div>
          <div className='flex items-center mt-8 gap-5'>
            <button className='text-orange-400 text-[20px] max-h-[60px] border-[2px] border-orange-400 px-4 py-2 rounded-lg' onClick={() => setIsPoolModalOpen(true)}>
              Add Pool
            </button>
            <Image className='mt-10' src="/buyS.png" alt="crypto" width={320} height={120} />
            <button className='text-orange-400 text-[20px] border-[2px] border-orange-400 px-4 py-2 rounded-lg' onClick={() => setIsLiquidityModalOpen(true)}>
              Add Liquidity
            </button>
          </div>
        </div>
      </div>

      {/* Modal for Check Pool */}
      <Modal isOpen={isPoolModalOpen} onClose={() => setIsPoolModalOpen(false)} title="Check Pool">
        <CheckPool onClose={() => setIsPoolModalOpen(false)} /> {/* Pass onClose to CheckPool */}
      </Modal>

      {/* Modal for Add Liquidity */}
      <Modal isOpen={isLiquidityModalOpen} onClose={() => setIsLiquidityModalOpen(false)} title="Add Liquidity">
        <AddLiquidity pools={pools} onClose={() => setIsLiquidityModalOpen(false)} /> {/* Pass the pools prop and onClose to AddLiquidity */}
      </Modal>
    </div>
  );
};

export default LiquidityMarket;