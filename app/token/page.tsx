"use client"
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

        const tokenPriceWei = await icoMarketContract.tokenPrice();
        const tokenPrice = ethers.formatEther(tokenPriceWei);
        setTokenPrice(parseFloat(tokenPrice));

        const tokensSoldWei = await icoMarketContract.tokenSold();
        const tokensSold = ethers.formatEther(tokensSoldWei);
        setTokensSold(parseFloat(tokensSold));

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
      const tx = await icoMarketContract.endSale();
      await tx.wait();
      setMessage('ICO sale ended successfully!');
    } catch (error) {
      console.error('Error ending sale:', error);
      setMessage('Error ending the sale. Please try again.');
    }
  };

  return (
    <div className='h-[90vh] bg-black'>
      <div className='mt-15 flex '>
        <div className='w-[60%] my-5 mx-5'>
        <h1 className='text-white text-7xl'>Hurry to Invest in
           CruptoCurrency</h1>
        <p className='text-white mt-10'>The time to capitalize on the cryptocurrency revolution is now. This decentralized digital currency 
          is experiencing unprecedented mainstream adoption, offering early investors life-changing wealth potential. Don't miss your chance to secure a piece of this lucrative future - cryptocurrency's 
          explosive growth shows no signs of slowing, but the window of opportunity won't stay open forever.</p>
      </div>
      <div className='text-white mt-20'>
        <h2 className='text-white text-3xl'>Bir token for sale</h2>
        <Image className='my-10' src="/coin.jpg" alt="Site Logo" width={320} height={150} />
      <p>Token Price: {tokenPrice} ETH</p>
      <p>Tokens Sold: {tokensSold}</p>
      <p>Balance Left: {balanceLeft}</p>
      <p>Total Tokens: {totalTokens}</p>
      <input
        type="number"
        placeholder="Tokens to Buy"
        value={tokensToBuy}
        onChange={(e) => setTokensToBuy(parseFloat(e.target.value))}
      />
      <button onClick={buyTokens}>Buy Tokens</button>
      <button onClick={endSale}>End Sale</button>
      <p>{message}</p>
      </div>
      </div>
    </div>
  );
};

export default IcoMarket;