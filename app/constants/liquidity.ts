export const liquidityContractAddress = "0x2bDaDB67c984A3b2d972f80F430e366960191C90";
export const liquiditydAbi = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [],
      "name": "CanotSendZeroAmount",
      "type": "error"
    },
    {
      "inputs": [],
      "name": "YourAreNotAdmin",
      "type": "error"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_tokenA",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_tokenB",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_tokenA_Address",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_tokenB_Address",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_poolAddress",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_network",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_transactionHash",
          "type": "string"
        }
      ],
      "name": "AddLiquidity",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "admin",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_address",
          "type": "address"
        }
      ],
      "name": "getAllLiquidity",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "owner",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "tokenA",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "tokenB",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "tokenA_Address",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "tokenB_Address",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "poolAddress",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "network",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "transactionHash",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "timeCreated",
              "type": "uint256"
            }
          ],
          "internalType": "struct Liquidity.liquidityInfo[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "liquidities",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "tokenA",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "tokenB",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "tokenA_Address",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "tokenB_Address",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "poolAddress",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "network",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "transactionHash",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "timeCreated",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "liquidityId",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "transferEther",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    }
  ]