[![Netlify Status](https://api.netlify.com/api/v1/badges/61802591-25ae-4f8b-85e5-5cf1b20f44c7/deploy-status)](https://app.netlify.com/sites/cocky-cray-06672d/deploys)

# `ethereum-boilerplate-MEGA-NFT-Marketplace`

This Project is a fork of Ethereum Boilerplate and demostrates how you can build your own NFT Marketplace. This project of course work on any EVM-compatible blockchain such as Polygon, Avalanche, Binance Smart Chain and other such chains.

![Preview](preview.gif)

# ⭐️ `Star us`
If this boilerplate helps you build Ethereum dapps faster - please star this project, every star makes us very happy!

# 🚀 Quick Start

📄 Clone or fork `ethereum-nft-marketplace-boilerplate`:
```sh
git clone https://github.com/ethereum-boilerplate/ethereum-nft-marketplace-boilerplate.git
```
💿 Install all dependencies:
```sh
cd ethereum-nft-marketplace-boilerplate
yarn install 
```
✏ Rename `.env.example` to `.env` in the main folder and provide your `appId` and `serverUrl` from Moralis ([How to start Moralis Server](https://docs.moralis.io/moralis-server/getting-started/create-a-moralis-server)) 
Example:
```jsx
REACT_APP_MORALIS_APPLICATION_ID = xxxxxxxxxxxx
REACT_APP_MORALIS_SERVER_URL = https://xxxxxx.grandmoralis.com:2053/server
```

🔎 Locate the MoralisDappProvider in `src/providers/MoralisDappProvider/MoralisDappProvider.js` and paste the deployed marketplace smart contract address and ABI
```jsx
const [contractABI, setContractABI] = useState();
const [marketAddress, setMarketAddress] = useState();
```

🔃 Sync the `MarketItemCreated` event `/src/contracts/marketplaceBoilerplate.sol` contract with your Moralis Server, making the tableName `MarketItems`
```jsx
event MarketItemCreated (
  uint indexed itemId,
  address indexed nftContract,
  uint256 indexed tokenId,
  address seller,
  address owner,
  uint256 price,
  bool sold
);
```


🚴‍♂️ Run your App:
```sh
yarn start
```


