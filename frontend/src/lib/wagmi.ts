import { createConfig } from "wagmi";
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
} from "viem/chains";
import { http } from "viem";

declare module "wagmi" {
  interface Register {
    config: typeof wagmiConfig;
  }
}

export const wagmiConfig = createConfig({
  multiInjectedProviderDiscovery: false,
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
