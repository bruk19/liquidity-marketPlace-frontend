import { ethers } from 'ethers';
import {
  icoMarketAbi,
  icoMarketContractAddress,
  liquidityContractAddress,
  liquidityMarketAbi,
  liquidityMarketContractAddress,
  liquiditydAbi,
} from '../constants';

// Check if window.ethereum is available
if (!window.ethereum) {
  throw new Error(
    'MetaMask is not installed. Please install it to use this application.'
  );
}

export const provider = new ethers.BrowserProvider(window.ethereum);

let liquidityMarketContract: ethers.Contract;
let liquidityContract: ethers.Contract;
let icoMarketContract: ethers.Contract;

export const initContracts = async () => {
  const signer = await provider.getSigner();

  liquidityMarketContract = new ethers.Contract(
    liquidityMarketContractAddress,
    liquidityMarketAbi,
    signer
  );

  liquidityContract = new ethers.Contract(
    liquidityContractAddress,
    liquiditydAbi,
    signer
  );

  icoMarketContract = new ethers.Contract(
    icoMarketContractAddress,
    icoMarketAbi,
    signer
  );
};

initContracts();

export { liquidityMarketContract, liquidityContract, icoMarketContract };
