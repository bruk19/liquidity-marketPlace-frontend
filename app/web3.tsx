import { AbstractProvider } from "ethers";
import { BrowserProvider } from "ethers";
import { ethers } from "ethers";

declare global {
  interface Window {
    ethereum: any
  }
}

let provider: AbstractProvider;
let web3: BrowserProvider;

export async function setUpWeb3() {
    let signer = null;

    if (window.ethereum == null) {
        console.log("MetaMask is not installed");
        return; // Exit if MetaMask is not installed
    } else {
        web3 = new ethers.BrowserProvider(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" }); // Request accounts first
        signer = await web3.getSigner();
        
        const networkId = (await web3.getNetwork()).chainId;
        if (Number(networkId) !== 11155111) {
            window.alert("Please switch to the Sepolia testnet network");
            return; // Exit if the network is not correct
        }
    }
}

export function getWeb3() {
  return web3;
}