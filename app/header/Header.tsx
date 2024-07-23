"use client";

import React from 'react'
import { useWalletProviderContext } from './wallet'

function Header() {
  const { wallet, connectWallet } = useWalletProviderContext()

  const handleConnectWallet = async () => {
    try {
      await connectWallet()
    } catch (error) {
      console.error('Error connecting to wallet:', error)
    }
  }
  console.log("Header:", { wallet, connectWallet });

  return (
    <div className='bg-black'>
      <div className='flex justify-between items-center px-8 py-4 text-white font-serif'>
        <div className='ml-6 font-serif text-lg'>Wooox</div>
        <div className='flex mr-4 items-center'>
          <ul className='flex gap-8 mr-8'>
            <li>Home</li>
            <li>Add Pool</li>
            <li>Add Liquidity</li>
            <li>Coin Market</li>
            <li>Buy Woox Token</li>
          </ul>
          <button className='text-orange-400 border-[2px] border-orange-400 px-4 py-2 rounded-lg' onClick={handleConnectWallet}>
            {wallet ? (
              <span>{wallet.slice(0, 6)}...{wallet.slice(-4)}</span>
            ) : (
              <span>Connect Wallet</span>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Header