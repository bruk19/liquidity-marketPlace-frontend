import { ethers } from 'ethers';

declare global {
  interface Window {
    ethereum: any;
  }
}

let provider: ethers.BrowserProvider | null = null;
let signer: ethers.Signer | null = null;

export async function setUpWeb3() {
  if (window.ethereum == null) {
    console.log('MetaMask is not installed');
    return; // Exit if MetaMask is not installed
  } else {
    provider = new ethers.BrowserProvider(window.ethereum);
    await window.ethereum.request({ method: 'eth_requestAccounts' }); // Request accounts first
    signer = await provider.getSigner();

    const network = await provider.getNetwork();
    if (network.chainId !== BigInt(11155111)) {
      // Sepolia testnet chainId
      window.alert('Please switch to the Sepolia testnet network');
      return; // Exit if the network is not correct
    }
  }
}

export function getProvider() {
  return provider;
}

export function getSigner() {
  return signer;
}
