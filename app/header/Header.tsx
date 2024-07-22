import React from 'react'

function Header() {
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
          <button>fff</button>
        </div>
      </div>
    </div>
  )
}

export default Header