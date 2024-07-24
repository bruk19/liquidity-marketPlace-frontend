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

  
  

  return (
    <div>
      <h1>Uniswap V3 Liquidity Manager</h1>
    </div>
  );
};

export default LiquidityMarket;