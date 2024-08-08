"use client"
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { FeeAmount, FACTORY_ADDRESS } from '@uniswap/v3-sdk';
import { Contract } from '@ethersproject/contracts';
import { abi as IUniswapV3PoolABI } from '@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json';
import { abi as IUniswapV3FactoryABI } from '@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Factory.sol/IUniswapV3Factory.json';
import { getProvider, getSigner, setUpWeb3 } from '../web3';
import Image from 'next/image';

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

  const addLiquidity = async () => {
  try {
    const signer = getSigner();
    const provider = getProvider();
    if (!signer || !provider) {
      setMessage('Web3 not initialized');
      return;
    }

    const liquidityContract = new ethers.Contract(liquidityContractAddress, liquiditydAbi, signer);

    // First, approve the tokens
    const pool = pools.find(p => p.address === selectedPool);
    if (!pool) {
      setMessage('Selected pool not found');
      return;
    }

    const token0Contract = new ethers.Contract(pool.token0, ['function approve(address spender, uint256 amount) public returns (bool)', 'function symbol() public view returns (string)'], signer);
    const token1Contract = new ethers.Contract(pool.token1, ['function approve(address spender, uint256 amount) public returns (bool)', 'function symbol() public view returns (string)'], signer);

    await token0Contract.approve(liquidityContractAddress, approveAmount);
    await token1Contract.approve(liquidityContractAddress, approveAmount);

    // Now add liquidity
    const tx = await liquidityContract.AddLiquidity(
      await token0Contract.symbol(),
      await token1Contract.symbol(),
      pool.token0,
      pool.token1,
      selectedPool,
      (await provider.getNetwork()).chainId.toString(),
      ethers.ZeroHash // You might want to pass the actual transaction hash here
    );

    await tx.wait();
    setMessage('Liquidity added successfully');
  } catch (error) {
    console.error('Error adding liquidity:', error);
    setMessage('Error adding liquidity');
  }
};

  return (
  <div>
    <div className="relative h-[89vh]">
      <div
        className="absolute inset-0 bg-[url('/cryp.jpg')] bg-cover bg-center opacity-95"
      ></div>
      <div className="relative z-10 flex flex-col justify-center items-center h-full px-4 sm:px-6 lg:px-8">
        <h3 className="text-2xl font-normal font-serif mt-6 text-white">Coin Market</h3>
        <h1 className="text-6xl font-medium text-orange-400 font-serif text-white my-10">Create Liquidty Market Place</h1>
        <p className="text-white w-full max-w-3xl text-center">
          Looking to capitalize on market opportunities and increase the liquidity
          of your assets? Our platform provides the perfect environment for
          investment and market access.
        </p>
        <button className='text-orange-400 text-[20px] border-[2px] border-orange-400 px-4 py-2 rounded-lg mt-12'>
          Get Birr Token Now
        </button>
      </div>
    </div>
    <div>
      <section>
        <h2>Check Pool</h2>
        <input
          type="text"
          placeholder="Token A Address"
          value={tokenA}
          onChange={(e) => setTokenA(e.target.value)}
        />
        <input
          type="text"
          placeholder="Token B Address"
          value={tokenB}
          onChange={(e) => setTokenB(e.target.value)}
        />
        <select
          value={fee}
          onChange={(e) => setFee(Number(e.target.value) as FeeAmount)}
        >
          <option value={FeeAmount.LOW}>0.05%</option>
          <option value={FeeAmount.MEDIUM}>0.3%</option>
          <option value={FeeAmount.HIGH}>1%</option>
        </select>
        <button onClick={checkPool}>Check Pool</button>
        {poolAddress && <p>Pool Address: {poolAddress}</p>}
        <p>{message}</p>
      </section>
    </div>

    <div>
      <section>
        <h2>Add Liquidity</h2>
        <select
          value={selectedPool}
          onChange={(e) => setSelectedPool(e.target.value)}
        >
          <option value="">Select a pool</option>
          {pools.map((pool, index) => (
            <option key={index} value={pool.address}>
              {`${pool.token0} - ${pool.token1} (${pool.fee / 10000}%)`}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Liquidity Amount"
          value={liquidityAmount}
          onChange={(e) => setLiquidityAmount(e.target.value)}
        />
        <input
          type="text"
          placeholder="Approve Amount"
          value={approveAmount}
          onChange={(e) => setApproveAmount(e.target.value)}
        />
        <button onClick={addLiquidity}>Add Liquidity</button>
        <p>{message}</p>
      </section>
    </div>
  </div>
);
};

export default LiquidityMarket;