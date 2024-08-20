"use client";
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { FeeAmount, FACTORY_ADDRESS } from '@uniswap/v3-sdk';
import { abi as IUniswapV3FactoryABI } from '@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Factory.sol/IUniswapV3Factory.json';
import { provider, initContracts } from '../utils/constant';

interface CheckPoolProps {
  onClose: () => void;
}

const ERC20_ABI = [
  'function name() view returns (string)',
  'function symbol() view returns (string)'
];

const CheckPool: React.FC<CheckPoolProps> = ({ onClose }) => {
  const [tokenA, setTokenA] = useState<string>('');
  const [tokenB, setTokenB] = useState<string>('');
  const [tokenAName, setTokenAName] = useState<string>('');
  const [tokenBName, setTokenBName] = useState<string>('');
  const [fee, setFee] = useState<FeeAmount>(FeeAmount.MEDIUM);
  const [poolAddress, setPoolAddress] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    if (ethers.isAddress(tokenA)) {
      getTokenName(tokenA, setTokenAName);
    } else {
      setTokenAName('');
    }
  }, [tokenA]);

  useEffect(() => {
    if (ethers.isAddress(tokenB)) {
      getTokenName(tokenB, setTokenBName);
    } else {
      setTokenBName('');
    }
  }, [tokenB]);

  const checkNetwork = async () => {
  try {
    const network = await provider.getNetwork();
    console.log('Current network:', network.name, 'Chain ID:', network.chainId);
  } catch (error) {
    console.error('Error checking network:', error);
  }
};

useEffect(() => {
  checkNetwork();
}, []);

 const getTokenName = async (tokenAddress: string, setTokenName: React.Dispatch<React.SetStateAction<string>>) => {
  try {
    const tokenContract = new ethers.Contract(tokenAddress, ERC20_ABI, provider);
    
    try {
      const name = await tokenContract.name();
      setTokenName(name);
    } catch (nameError) {
      console.error('Error getting token name:', nameError);
      
      // If name() fails, try symbol() as a fallback
      try {
        const symbol = await tokenContract.symbol();
        setTokenName(`Symbol: ${symbol}`);
      } catch (symbolError) {
        console.error('Error getting token symbol:', symbolError);
        setTokenName('Error: Could not retrieve token info');
      }
    }
  } catch (error) {
    console.error('Error creating token contract:', error);
    if (error instanceof Error) {
      setTokenName(`Error: ${error.message}`);
    } else {
      setTokenName('Error: Unknown error occurred');
    }
  }
};

  const checkPool = async () => {
    try {
      await initContracts();
      const factory = new ethers.Contract(FACTORY_ADDRESS, IUniswapV3FactoryABI, provider);
      
      if (!ethers.isAddress(tokenA) || !ethers.isAddress(tokenB)) {
        setMessage('Please enter valid token addresses.');
        return;
      }

      const poolAddress = await factory.getPool(tokenA, tokenB, fee);

      if (poolAddress === '0x0000000000000000000000000000000000000000') {
        setMessage('Pool does not exist on Uniswap');
        setPoolAddress('');
      } else {
        setMessage('Pool exists on Uniswap');
        setPoolAddress(poolAddress);
      }
    } catch (error) {
      console.error('Error checking pool:', error);
      setMessage('Error checking pool. Please try again later.');
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
      {tokenAName && <p>Token A Name: {tokenAName}</p>}
      <input
        type="text"
        placeholder="Token B Address"
        value={tokenB}
        onChange={(e) => setTokenB(e.target.value)}
        className="border p-2 rounded mb-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-400"
      />
      {tokenBName && <p>Token B Name: {tokenBName}</p>}
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