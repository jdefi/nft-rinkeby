// Importing libraries
import { ThirdwebSDK } from "@3rdweb/sdk"
import { ethers } from "ethers"

//Importing private key
require('dotenv').config()

//Instantiate 3rdweb SDK
const sdk = new ThirdwebSDK(
    new ethers.Wallet(
        // Your wallet private key
        process.env.PRIVATE_KEY as string,
        // RPC URL
        ethers.getDefaultProvider(process.env.ALCHEMY_API_URL)
    )
);

// Initialize market module by passing in the module address
const marketModuleAddress = "0xa4b7B4E1f513cdeF73890AF40DB4197251442157"
const market = sdk.getMarketplaceModule(marketModuleAddress);

// Declaring the NFT Collection module address
const nftCollectionModuleAddress = "0x1f04Db0a845d599D1Bb1FA9c539F3990093cf056"

// Declaring the token module adress if you want to use your own tokens
const tokenModuleAddress = "0x0d5fb8942eEa62093944F3e91C6Ac4e584336741";

// the listingId of the listing you want to fetch data for
const tokenId = "1";
const tokenIdOffer = 1

// market.createDirectListing({
    //  assetContractAddress: nftCollectionModuleAddress,
    //  buyoutPricePerToken: ethers.utils.parseUnits(tokenIdOffer, 18),
    //  currencyContractAddress: tokenModuleAddress,
    //  startTimeInSeconds: Math.floor(Date.now() / 1000),
  //    listingDurationInSeconds: 60 * 60 * 24,
    //  tokenId: tokenId,
  //    quantity: 1,
  //  });

// Get all the listings
market.getAllListings();
