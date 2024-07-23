"use client"
import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { liquidityMarketAbi, liquidityMarketContractAddress } from '../constants'
import { getWeb3, setUpWeb3 } from '../web3';

export type WalletContext = {
  wallet: string | null;
  contract: ethers.Contract | undefined;
  chainId: number | undefined;
  connectWallet: () => Promise<void>;
};

const WalletProviderContext = createContext<WalletContext>({} as WalletContext);

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [contract, setContract] = useState<ethers.Contract | undefined>(undefined)
  const [walletAddress, setWalletAddress] = useState<string | null>(null)
  const [chainId, setChainId] = useState<number | undefined>(undefined)


  const connectWallet = async () => {
    try {
        await setUpWeb3();
        const web3Instance = getWeb3();
        const signer = await web3Instance.getSigner();
        const contractInstance = new ethers.Contract(
            liquidityMarketContractAddress,
            liquidityMarketAbi,
            signer
        );
        setContract(contractInstance);

        const wallet = await signer.getAddress();
        setWalletAddress(wallet);


        const network = await web3Instance.getNetwork();
        setChainId(Number(network.chainId));
    } catch (error) {
        console.error('Error connecting to MetaMask:', error);
        setWalletAddress(null);
        setChainId(undefined);
    }
};
console.log("WalletProvider:", { walletAddress, contract, chainId, connectWallet });
  return (
    <WalletProviderContext.Provider
      value={{
        wallet: walletAddress,
        contract,
        chainId,
        connectWallet
      }}
    >
      {children}
    </WalletProviderContext.Provider>
  )
}
export const useWalletProviderContext = () => {
  const context = useContext(WalletProviderContext);
  if (!context) {
    throw new Error('useWalletProviderContext must be used within a WalletProvider');
  }
  return context;
};