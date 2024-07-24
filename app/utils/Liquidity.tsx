"use client"
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { FeeAmount, FACTORY_ADDRESS } from '@uniswap/v3-sdk';
import { Contract } from '@ethersproject/contracts';
import { abi as IUniswapV3PoolABI } from '@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json';
import { abi as IUniswapV3FactoryABI } from '@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Factory.sol/IUniswapV3Factory.json';
import { getProvider, getSigner, setUpWeb3 } from '../web3';

// Import your Liquidity contract ABI and address
import { liquidityContractAddress, liquiditydAbi } from '../constants';

interface PoolInfo {
  address: string;
  token0: string;
  token1: string;
  fee: number;
}

const LiquidityMarket: React.FC = () => {
  const [tokenA, setTokenA] = useState<string>('');
  const [tokenB, setTokenB] = useState<string>('');
  const [fee, setFee] = useState<FeeAmount>(FeeAmount.MEDIUM);
  const [poolAddress, setPoolAddress] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [pools, setPools] = useState<PoolInfo[]>([]);
  const [selectedPool, setSelectedPool] = useState<string>('');
  const [liquidityAmount, setLiquidityAmount] = useState<string>('');
  const [approveAmount, setApproveAmount] = useState<string>('');

  useEffect(() => {
    setUpWeb3();
  }, []);

  const checkPool = async () => {
    try {
      const provider = getProvider();
      if (!provider) {
        setMessage('Web3 not initialized');
        return;
      }

      const factory = new ethers.Contract(FACTORY_ADDRESS, IUniswapV3FactoryABI, provider);
      const poolAddress = await factory.getPool(tokenA, tokenB, fee);

      if (poolAddress === ethers.ZeroAddress) {
        setMessage('Pool does not exist');
        setPoolAddress('');
      } else {
        setMessage('Pool exists');
        setPoolAddress(poolAddress);
        setPools(prev => {
          if (!prev.some(p => p.address === poolAddress)) {
            return [...prev, { address: poolAddress, token0: tokenA, token1: tokenB, fee }];
          }
          return prev;
        });
      }
    } catch (error) {
      console.error('Error checking pool:', error);
      setMessage('Error checking pool');
    }
  };

  

  return (
    <div>
      <h1>Uniswap V3 Liquidity Manager</h1>
    </div>
  );
};

export default LiquidityMarket;