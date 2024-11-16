import { http, createConfig } from "wagmi";
import {
  sepolia,
  flowTestnet,
  baseSepolia,
  arbitrumSepolia,
  mantleSepoliaTestnet,
  auroraTestnet,
  polygonZkEvmTestnet,
  worldchainSepolia,
  rootstockTestnet,
} from "wagmi/chains";
import { injected, walletConnect } from "wagmi/connectors";

export const wagmiConfig = createConfig({
  chains: [
    sepolia,
    flowTestnet,
    baseSepolia,
    arbitrumSepolia,
    mantleSepoliaTestnet,
    auroraTestnet,
    polygonZkEvmTestnet,
    worldchainSepolia,
    rootstockTestnet,
  ],
  transports: {
    [sepolia.id]: http(),
    [flowTestnet.id]: http(),
    [baseSepolia.id]: http(),
    [arbitrumSepolia.id]: http(),
    [mantleSepoliaTestnet.id]: http(),
    [auroraTestnet.id]: http(),
    [polygonZkEvmTestnet.id]: http(),
    [worldchainSepolia.id]: http(),
    [rootstockTestnet.id]: http(),
  },
  // connectors: [injected()],
});
