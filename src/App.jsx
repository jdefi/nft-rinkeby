import { ThirdwebProvider, ConnectWallet } from '@3rdweb/react';
import './index.css';

//import component for claim button
import AuctionComponent from './AuctionListing';

const supportedChainIds = [1, 4, 137, 250, 43114, 80001];
const connectors = {
  injected: {},

  walletconnect: {},
  walletlink: {
    appName: "nft-rinkeby - demo",
    url: "https://allswap.xyz",
    darkMode: false,
  },
};

function App() {
  return (
    <ThirdwebProvider
      connectors={connectors}
      supportedChainIds={supportedChainIds}
    >
      <ConnectWallet />
      <AuctionComponent /> {/*render the claim button*/}
    </ThirdwebProvider>
  );
}
export default App;
