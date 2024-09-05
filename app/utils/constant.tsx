import { ethers } from 'ethers';
import {
  icoMarketAbi,
  icoMarketContractAddress,
  liquidityContractAddress,
  liquidityMarketAbi,
  liquidityMarketContractAddress,
  liquiditydAbi,
} from '../constants';

export let provider: ethers.BrowserProvider | null = null;

export const initProvider = () => {
  if (typeof window !== 'undefined' && window.ethereum) {
    provider = new ethers.BrowserProvider(window.ethereum);
  } else {
    console.error(
      'MetaMask is not installed. Please install it to use this application.'
    );
    provider = null; // Handle this case as needed
  }
};

// Explicitly declare contract variables with initial type of null
let liquidityMarketContract: ethers.Contract | null = null;
let liquidityContract: ethers.Contract | null = null;
let icoMarketContract: ethers.Contract | null = null;

export const initContracts = async () => {
  if (!provider) {
    throw new Error('Provider is not initialized. Ensure MetaMask is installed.');
  }

  const signer = await provider.getSigner();

  liquidityMarketContract = new ethers.Contract(
    liquidityMarketContractAddress,
    liquidityMarketAbi,
    signer
  );

  liquidityContract = new ethers.Contract(
    liquidityContractAddress,
    liquiditydAbi, // Ensure this is spelled correctly
    signer
  );

  icoMarketContract = new ethers.Contract(
    icoMarketContractAddress,
    icoMarketAbi,
    signer
  );
};

// Initialize provider and contracts
initProvider();
initContracts().catch(error => {
  console.error('Error initializing contracts:', error);
});

// Export contracts
export { liquidityMarketContract, liquidityContract, icoMarketContract };
