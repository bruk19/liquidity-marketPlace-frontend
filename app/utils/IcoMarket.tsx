"use client"
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { initContracts, provider, icoMarketContract } from '../utils/constant';

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
    <div>
      <h2>ICO Market</h2>
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
  );
};

export default IcoMarket;