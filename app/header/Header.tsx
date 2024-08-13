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

  const pools: PoolInfo[] = [];

  const handleConnectWallet = async () => {
    try {
      await connectWallet();
    } catch (error) {
      console.error('Error connecting to wallet:', error);
    }
  };

  return (
    <div className='bg-black'>
      <div className='flex justify-between items-center px-12 py-4 text-white font-serif'>
        <div className='ml-6 font-serif text-lg'>BIRR</div>
        <div className='flex mr-9 items-center'>
          <ul className='flex gap-12 mr-8'>
            <li><a href="/">Home </a></li>
            <li><a href="/token"> Coin Market </a></li>
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
        <CheckPool onClose={() => setIsPoolModalOpen(false)} />
      </Modal>

      {/* Modal for Add Liquidity */}
      <Modal isOpen={isLiquidityModalOpen} onClose={() => setIsLiquidityModalOpen(false)} title="Add Liquidity">
        <AddLiquidity pools={pools} onClose={() => setIsLiquidityModalOpen(false)} />
      </Modal>
    </div>
  );
}

export default Header;