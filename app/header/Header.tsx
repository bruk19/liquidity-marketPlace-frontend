// Header.tsx
"use client";
import React, { useState } from 'react';
import { useWalletProviderContext } from './wallet';
import Modal from '../utils/Modal';
import CheckPool from '../utils/CheckPool';
import AddLiquidity from '../utils/AddLiquidity';

interface PoolInfo {
  address: string;
  token0: string;
  token1: string;
  fee: number;
}

const Header: React.FC = () => {
  const { wallet, connectWallet } = useWalletProviderContext();
  const [isPoolModalOpen, setIsPoolModalOpen] = useState(false);
  const [isLiquidityModalOpen, setIsLiquidityModalOpen] = useState(false);

  // Example pools data (replace with actual data as needed)
  const pools: PoolInfo[] = [
    { address: '0xPoolAddress1', token0: 'TokenA', token1: 'TokenB', fee: 3000 },
    { address: '0xPoolAddress2', token0: 'TokenC', token1: 'TokenD', fee: 500 },
    // Add more pools as needed
  ];

  const handleConnectWallet = async () => {
    try {
      await connectWallet();
    } catch (error) {
      console.error('Error connecting to wallet:', error);
    }
  };

  return (
    <div className='bg-black'>
      <div className='flex justify-between items-center px-8 py-4 text-white font-serif'>
        <div className='ml-6 font-serif text-lg'>Wooox</div>
        <div className='flex mr-4 items-center'>
          <ul className='flex gap-8 mr-8'>
            <li>Home</li>
            <li onClick={() => setIsPoolModalOpen(true)} className="cursor-pointer">Add Pool</li>
            <li onClick={() => setIsLiquidityModalOpen(true)} className="cursor-pointer">Add Liquidity</li>
            <li>Coin Market</li>
            <li>Buy Woox Token</li>
          </ul>
          <button className='text-orange-400 border-[2px] border-orange-400 px-4 py-2 rounded-lg' onClick={handleConnectWallet}>
            {wallet ? (
              <span>{wallet.slice(0, 6)}...{wallet.slice(-4)}</span>
            ) : (
              <span>Connect Wallet</span>
            )}
          </button>
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
}

export default Header;