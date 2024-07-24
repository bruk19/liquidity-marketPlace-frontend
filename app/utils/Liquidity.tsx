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


const LiquidityMarket: React.FC = () => {


  return (
    <div>
      <h1>Uniswap V3 Liquidity Manager</h1>
    </div>
  );
};

export default LiquidityMarket;