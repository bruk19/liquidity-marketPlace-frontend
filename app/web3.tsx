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

  if(window.ethereum == null) {
    console.log("MetaMask in installed")
    provider = ethers.getDefaultProvider()
  }
  else 
  web3 = new ethers.BrowserProvider(window.ethereum)
  signer = await web3.getSigner()

  const networkId = (await web3.getNetwork()).chainId;
  if(Number(networkId) != 11155111) {
    window.alert("Please Switch to Sepolia estnet Network")
  }
  await window.ethereum.request({method: "eth_requestAccounts"})
}

export function getWeb3() {
  return web3;
}