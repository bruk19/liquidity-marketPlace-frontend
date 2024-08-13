"use client";
import React, { useState } from 'react';
import { ethers } from 'ethers';
import { liquidityContractAddress, liquiditydAbi } from '../constants';
import { provider, initContracts, liquidityContract } from '../utils/constant';

interface PoolInfo {
  address: string;
  token0: string;
  token1: string;
  fee: number;
}

interface AddLiquidityProps {
  pools: PoolInfo[];
  onClose: () => void;
}

const AddLiquidity: React.FC<AddLiquidityProps> = ({ pools, onClose }) => {
  const [selectedPool, setSelectedPool] = useState<string>('');
  const [liquidityAmount, setLiquidityAmount] = useState<string>('');
  const [approveAmount, setApproveAmount] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const handleAddLiquidity = async () => {
    try {
      await initContracts();
      const signer = await provider.getSigner();
      const pool = pools.find(p => p.address === selectedPool);
      if (!pool) {
        setMessage('Selected pool not found');
        return;
      }

      const token0Contract = new ethers.Contract(pool.token0, ['function approve(address spender, uint256 amount) public returns (bool)'], signer);
      const token1Contract = new ethers.Contract(pool.token1, ['function approve(address spender, uint256 amount) public returns (bool)'], signer);

      // Approve the liquidity contract to spend the specified amounts
      const approveTx0 = await token0Contract.approve(liquidityContractAddress, ethers.parseUnits(approveAmount, 18));
      await approveTx0.wait();

      const approveTx1 = await token1Contract.approve(liquidityContractAddress, ethers.parseUnits(approveAmount, 18));
      await approveTx1.wait();

      // Add liquidity
      const tx = await liquidityContract.addLiquidity(
        pool.token0,
        pool.token1,
        selectedPool,
        ethers.parseUnits(liquidityAmount, 18),
        { gasLimit: 3000000 }
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
      <h2>Add Liquidity</h2>
      <select
        value={selectedPool}
        onChange={(e) => setSelectedPool(e.target.value)}
        className="border p-2 rounded mb-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-400"
      >
        <option value="">Select a pool</option>
        {pools.map((pool) => (
          <option key={pool.address} value={pool.address}>
            {`${pool.token0} - ${pool.token1} (${pool.fee / 10000}%)`}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Liquidity Amount"
        value={liquidityAmount}
        onChange={(e) => setLiquidityAmount(e.target.value)}
        className="border p-2 rounded mb-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-400"
      />
      <input
        type="text"
        placeholder="Approve Amount"
        value={approveAmount}
        onChange={(e) => setApproveAmount(e.target.value)}
        className="border p-2 rounded mb-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-400"
      />
      <button onClick={handleAddLiquidity} className="bg-orange-400 text-white px-4 py-2 rounded mb-2 hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-400">
        Add Liquidity
      </button>
      <p>{message}</p>
    </div>
  );
};

export default AddLiquidity;