import { useWeb3 } from "@3rdweb/hooks";
import { useCallback, useMemo, useEffect, useState } from "react";
import { ThirdwebSDK } from "@3rdweb/sdk";
import { ethers } from "ethers";
import React from "react";

const AuctionComponent = () => {
  const { provider } = useWeb3();

  // We won't always have a provider, and so we need to be sure to
  // instantiate the ThirdwebSDK with a provider *only if we have one*
  const sdk = useMemo(
    () =>
      provider ? new ThirdwebSDK(provider.getSigner()) : new ThirdwebSDK(),
    [provider]
  );
  // const sdk = useMemo(() => {

  // We should use the `useMemo` to ensure that the `market` is always
  // initiated with the latest `sdk` variable
  const market = useMemo(
    () =>
      sdk.getMarketplaceModule("0xa4b7B4E1f513cdeF73890AF40DB4197251442157"),
    [sdk]
  );

  // Declaring the nft smart contract address
  const nftSmartContractAddress = "0x1f04Db0a845d599D1Bb1FA9c539F3990093cf056";
  const currencySmartContractAddress =
    "0x0d5fb8942eEa62093944F3e91C6Ac4e584336741";

  const [tokenId, setTokenId] = React.useState("");
  const [tokenIdOffer, setTokenIdOffer] = React.useState("");

  function auctionListingTokenId(event) {
    setTokenId(event.target.value);
  }
  function auctionListingTokenIdOffer(event) {
    setTokenIdOffer(event.target.value);
  }
  function submitAuctionListing(event) {
    event.preventDefault();
    createAuctionListing();
  }

  const [listId, setListId] = React.useState("");
  const [listIdBid, setListIdOffer] = React.useState("");

  function auctionListingListId(event) {
    setListId(event.target.value);
  }
  function auctionListingListIdQuantity(event) {
    setListIdOffer(event.target.value);
  }
  function submitAuctionListingOffer(event) {
    event.preventDefault();
    makeBid();
  }

  //setting the minimum bid as 100th of the buyout price
  const tokenIdReserve = tokenIdOffer / 1000;
  const tokenIdReservePrice = tokenIdReserve.toString();

  // We should use the `useCallback` to ensure that the `buy`
  // function is always initiated with the latest `market` variable

  const createAuctionListing = useCallback(async () => {
    await market.createAuctionListing({
      assetContractAddress: nftSmartContractAddress,
      buyoutPricePerToken: ethers.utils.parseUnits(tokenIdOffer, 18),
      currencyContractAddress: currencySmartContractAddress,
      startTimeInSeconds: Math.floor(Date.now() / 1000),
      listingDurationInSeconds: 60 * 2,
      tokenId: tokenId,
      quantity: 1,
      reservePricePerToken: ethers.utils.parseUnits(tokenIdReservePrice, 18),
    });
  }, [market, tokenId, tokenIdOffer, tokenIdReservePrice]);

  const makeBid = useCallback(
    async (listingId) => {
      await market.makeAuctionListingBid({
        listingId: listId,
        pricePerToken: ethers.utils.parseUnits(listIdBid, 18),
      });
    },
    [listId, listIdBid, market]
  );

  return (
    <div>
      <form onSubmit={submitAuctionListing}>
        <input
          type="text"
          placeholder="enter token ID to list AUCTION"
          onChange={auctionListingTokenId}
        />
        <input
          type="text"
          placeholder="enter offer for the listing AUCTION"
          onChange={auctionListingTokenIdOffer}
        />
        <button>Submit Token ID for Auction Listing</button>
      </form>
      <form onSubmit={submitAuctionListingOffer}>
        <input
          type="text"
          placeholder="enter AUCTION listing ID"
          onChange={auctionListingListId}
        />
        <input
          type="text"
          placeholder="enter bid for AUCTION"
          onChange={auctionListingListIdQuantity}
        />
        <button>Make a Bid</button>
      </form>
      <button
        style={{
          padding: "10px 20px",
          textAlign: "center",
          backgroundColor: "#44014C",
          color: "white",
        }}
        class="btn"
        onClick={createAuctionListing}
      >
        Create auction listing!
      </button>
      <br />
    </div>
  );
};
export default AuctionComponent;


