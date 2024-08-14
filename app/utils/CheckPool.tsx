'use client';
import React, { useState } from 'react';
import { ethers } from 'ethers';
import { FeeAmount, FACTORY_ADDRESS } from '@uniswap/v3-sdk';
import { abi as IUniswapV3FactoryABI } from '@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Factory.sol/IUniswapV3Factory.json';
import { provider, initContracts } from '../utils/constant';

interface CheckPoolProps {
  onClose: () => void;
}

const CheckPool: React.FC<CheckPoolProps> = ({ onClose }) => {
  const [tokenA, setTokenA] = useState<string>('');
  const [tokenB, setTokenB] = useState<string>('');
  const [fee, setFee] = useState<FeeAmount>(FeeAmount.MEDIUM);
  const [poolAddress, setPoolAddress] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const checkPool = async () => {
    try {
      await initContracts();
      const factory = new ethers.Contract(
        FACTORY_ADDRESS,
        IUniswapV3FactoryABI,
        provider
      );
      const poolAddress = await factory.getPool(tokenA, tokenB, fee);

      if (poolAddress === '0x0000000000000000000000000000000000000000') {
        setMessage('Pool does not exist');
        setPoolAddress('');
      } else {
        setMessage('Pool exists');
        setPoolAddress(poolAddress);
      }
    } catch (error) {
      console.error('Error checking pool:', error);

      if (!tokenA) {
        setMessage('Please enter a valid Token A address.');
      } else if (!tokenB) {
        setMessage('Please enter a valid Token B address.');
      } else if (fee === undefined || fee === null) {
        setMessage('Please select a valid fee amount.');
      } else {
        setMessage('Error checking pool. Please try again later.');
        console.error('Token A:', tokenA);
        console.error('Token B:', tokenB);
        console.error('Fee:', fee);
        console.error('Error:', error);
      }
      setPoolAddress('');
    }
  };

  return (
    <div>
      <h2>Check Pool</h2>
      <input
        type="text"
        placeholder="Token A Address"
        value={tokenA}
        onChange={(e) => setTokenA(e.target.value)}
        className="border p-2 rounded mb-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-400"
      />
      <input
        type="text"
        placeholder="Token B Address"
        value={tokenB}
        onChange={(e) => setTokenB(e.target.value)}
        className="border p-2 rounded mb-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-400"
      />
      <select
        value={fee}
        onChange={(e) => setFee(Number(e.target.value) as FeeAmount)}
        className="border p-2 rounded mb-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-400"
      >
        <option value={FeeAmount.LOW}>0.05%</option>
        <option value={FeeAmount.MEDIUM}>0.3%</option>
        <option value={FeeAmount.HIGH}>1%</option>
      </select>
      <button
        onClick={checkPool}
        className="bg-orange-400 text-white px-4 py-2 rounded mb-2 hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-400"
      >
        Check Pool
      </button>
      {poolAddress && <p>Pool Address: {poolAddress}</p>}
      <p>{message}</p>
    </div>
  );
};

export default CheckPool;
