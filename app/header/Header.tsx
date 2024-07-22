"use client";

import React from 'react'
import { useWalletProviderContext } from './wallet'

function Header() {
  const { wallet, connectWallet } = useWalletProviderContext()
  return (
    <div className='bg-black'>
      <div className='flex justify-between px-8 py-4 text-white font-serif'>
        <div className='ml-6 font-serif text-lg'>Wooox</div>
        <div className='flex mr-4'>
          <ul className='flex gap-8 mr-8'>
            <li>Home</li>
            <li>Add Pool</li>
            <li>Add Liquidity</li>
            <li>Coin Market</li>
            <li>Buy Woox Token</li>
          </ul>
          <button onClick={connectWallet}>
            {wallet ? (
              <span>Connected: {wallet.slice(0, 6)}...{wallet.slice(-4)}</span>
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