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
      <div className='mt-15 flex '>
        <div className='w-[60%] my-5 mx-5'>
          <h1 className='text-white text-7xl mt-8'>Hurry to Invest in
           Cryptocurrency</h1>
          <p className='text-white w-5/6 mt-10'>The time to capitalize on the cryptocurrency revolution is now. This decentralized digital currency 
          is experiencing unprecedented mainstream adoption, offering early investors life-changing wealth potential. Don't miss your chance to secure a piece of this lucrative future - cryptocurrency's 
          explosive growth shows no signs of slowing, but the window of opportunity won't stay open forever.</p>
          <div className='flex'>
            <Image className='mt-10' src="/cyptoT.jpg" alt="crypto" width={120} height={40} />
            <div className='text-white mt-14'>
              <p className='text-5xl text-orange-400'>5000000000+</p>
              <p>BIRR</p>
            </div>
          </div>
        </div>
        <div className='text-white mt-20'>
          <h2 className='text-white text-3xl text-center'>Bir token for sale</h2>
          <Image className='my-10' src="/coin.jpg" alt="crypto" width={320} height={150} />
          <div className="bg-gray-900 text-white p-8 rounded-lg shadow-lg">
            <div className="mb-4">
              <p className="text-lg">Token Price: {tokenPrice} ETH</p>
              <p className="text-lg">Tokens Sold: {tokensSold}</p>
            </div>
            <div className="mb-4">
              <input
                type="number"
                placeholder="Tokens to Buy"
                value={tokensToBuy}
                onChange={(e) => setTokensToBuy(parseFloat(e.target.value))}
                className="bg-gray-800 border-gray-700 text-white px-4 py-2 rounded-md w-full mb-2"
              />
              <div className="flex justify-between items-center">
                <div className="flex space-x-4">
                  <button
                    onClick={buyTokens}
                    className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md"
                  >
                    Buy Tokens
                  </button>
                  <button
                    onClick={endSale}
                    className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md"
                  >
                    End Sale
                  </button>
                </div>
              </div>
              <div className='flex justify-between gap-8 mt-4'>
                {balanceLeft > 0 && (
                  <p className="text-lg">Balance Left: {balanceLeft}</p>
                )}
                <p className="text-lg">Total Tokens: {totalTokens}</p>
              </div>
            </div>
            <p className="text-lg text-center">{message}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IcoMarket;