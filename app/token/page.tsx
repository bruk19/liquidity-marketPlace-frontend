"use client";
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { initContracts, provider, icoMarketContract } from '../utils/constant';
import Image from 'next/image';

const IcoMarket: React.FC = () => {
  const [tokenPrice, setTokenPrice] = useState<number>(0);
  const [tokensSold, setTokensSold] = useState<number>(0);
  const [balanceLeft, setBalanceLeft] = useState<number>(0);
  const [totalTokens, setTotalTokens] = useState<number>(0);
  const [tokensToBuy, setTokensToBuy] = useState<number>(0);
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    const initializeContract = async () => {
      try {
        await initContracts(); // Initialize contracts

        if (!icoMarketContract) {
          setMessage('ICO Market contract is not initialized.');
          return;
        }

        const tokenPriceWei = await icoMarketContract.tokenPrice();
        const tokenPrice = ethers.formatEther(tokenPriceWei);
        setTokenPrice(parseFloat(tokenPrice));

        const tokensSoldWei = await icoMarketContract.tokenSold();
        const tokensSold = ethers.formatEther(tokensSoldWei);
        setTokensSold(parseFloat(tokensSold));

        if (!provider) {
          setMessage('Provider is not initialized.');
          return;
        }

        const balanceLeftWei = await provider.getBalance(icoMarketContract.target);
        const balanceLeft = ethers.formatEther(balanceLeftWei);
        setBalanceLeft(parseFloat(balanceLeft));

        const totalTokensCalculated = parseFloat(balanceLeft) / parseFloat(tokenPrice) + parseFloat(tokensSold);
        setTotalTokens(totalTokensCalculated);
      } catch (error) {
        console.error('Error initializing contract:', error);
      }
    };

    initializeContract();
  }, []);

  const buyTokens = async () => {
    try {
      if (!icoMarketContract) {
        setMessage('ICO Market contract is not initialized.');
        return;
      }

      const tokensToBuyWei = ethers.parseEther(tokensToBuy.toString());
      const tx = await icoMarketContract.buyTokens({
        value: tokensToBuyWei,
      });
      await tx.wait();
      setMessage('Tokens bought successfully!');
      setTokensToBuy(0);
    } catch (error) {
      console.error('Error buying tokens:', error);
      setMessage('Error buying tokens. Please try again.');
    }
  };

  const endSale = async () => {
    try {
      if (!icoMarketContract) {
        setMessage('ICO Market contract is not initialized.');
        return;
      }

      const tx = await icoMarketContract.endSale();
      await tx.wait();
      setMessage('ICO sale ended successfully!');
    } catch (error) {
      console.error('Error ending sale:', error);
      setMessage('Error ending the sale. Please try again.');
    }
  };

  return (
    <div className='h-[98vh] bg-black'>
      {/* Rest of the component remains the same */}
    </div>
  );
};

export default IcoMarket;
