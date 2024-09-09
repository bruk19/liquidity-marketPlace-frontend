# ICO Market Frontend

> This is a decentralized ICO (Initial Coin Offering) market application built with Next.js and Solidity Ethereum smart contracts. It allows users to buy tokens during an ICO and provides functionality for the owner to manage the sale, add liquidity, and create pools.

## Features
- Features

- Connect with MetaMask wallet to interact with the application.
- Owner can initialize the ICO and set token parameters:
  - Token price
  - Total tokens available
- Users can purchase tokens during the ICO.
- Owner can end the ICO sale at any time.
- Owners can add liquidity to the pool.
- Owners can create new liquidity pools for different token pairs.
- Display token price, tokens sold, balance left, and total tokens available.


## Technologies Used
#### Frontend:
Next.js 13 (with app directory)
React 18
TypeScript
Tailwind CSS for styling


#### Backend:
Solidity for smart contracts
Ethers.js for interacting with Ethereum blockchain
Web3.js for additional Ethereum interactions


#### Development Tools:
Hardhat (for smart contract development)

## Live Demo ()

[Live Demo Link]()

## Prerequisites

- Node.js (version 14 or later recommended)
- MetaMask browser extension
- Basic understanding of React, Next.js, and Ethereum blockchain

## Getting Started
1. Clone the repository:
Copy code `https://github.com/bruk19/liquidity-marketPlace-frontend.git`
`cd liquidity-marketPlace-frontend`

2. Install dependencies:
Copy code `npm install`
# or
`yarn install`

3. Set up environment variables:

Create a .env.local file in the root directory.
Add the following variables:
Copy codeNEXT_PUBLIC_CONTRACT_ADDRESS=your_contract_address
Replace your_contract_address with the deployed Liquidity MarketPlace smart contract address.


4. Run the development server:
Copy code `npm run dev`
# or
`yarn dev`

5. Open http://localhost:3000 in your browser to see the application.


## Usage
1. Connect your MetaMask wallet to the application.
Create a new voting system:

2. If you're the owner:
- Initialize the ICO by setting the token price and total tokens.
- End the ICO sale when desired.
- Add liquidity to the pool for token trading.
- Create new liquidity pools for different token pairs.


3. For users:
- Buy tokens during the ICO.
- View the token price, tokens sold, balance left, and total tokens available.


4. For anyone:
Track a product's current stage and history using its ID


## Smart Contract
The application interacts with a Solidity smart contract named ICOMarket. The contract's ABI and address are imported from the constants file. Ensure your smart contract is deployed on a compatible Ethereum network (e.g., Sepolia testnet) and update the contract address in the .env.local file.

### Prerequisites
- Have a computer and internet connection
- Have a basic knowledge of TypeScript
- Have a basic knowledge of Solidity
- Have a general understanding of what testing is
- Have visual-studio code or any other code editor installed on your computer.

### Smart Contract
The application interacts with a Solidity smart contract named Liquidity marketPlace. Ensure that your smart contract is deployed on a compatible Ethereum network and update the contract address in the .env.local file.

### Setup
- Open your terminal in the folder where you want to have the project and run `https://github.com/bruk19/liquidity-marketPlace-frontend.git` to clone the project.
- Run `liquidity-marketPlace-frontend` to move to the project directory.

### 🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

### License
This project is open-source and available under the MIT License.

### Acknowledgements
- The Ethereum community for providing tools and resources.
- Next.js and React communities for the fantastic frameworks.

## Author
👤 **Bruk Teshome**

- GitHub: [@githubhandle](https://github.com/bruk19)
- Twitter: [@twitterhandle](https://twitter.com/Bruktesh)
- LinkedIn: [LinkedIn](https://linkedin.com/in/bruk-teshome)


Feel free to check the [issues page](https://github.com/bruk19/liquidity-marketPlace-frontend/issues).

## Show your support

Give a ⭐️ if you like this project!


## 📝 License

This project is [MIT](./LICENSE) licensed.

_NOTE: we recommend using the [MIT license](https://choosealicense.com/licenses/mit/) - you can set it up quickly by [using templates available on GitHub](https://docs.github.com/en/communities/setting-up-your-project-for-healthy-contributions/adding-a-license-to-a-repository). You can also use [any other license](https://choosealicense.com/licenses/) if you wish._
