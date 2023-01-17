import { type AppType } from "next/app";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultWallets,
  RainbowKitProvider,
  lightTheme,
} from "@rainbow-me/rainbowkit";
import { WagmiConfig, createClient, chain, configureChains } from "wagmi";
import { infuraProvider } from "wagmi/providers/infura";
import { publicProvider } from "wagmi/providers/public";
import { Provider } from "jotai";

import { trpc } from "../utils/trpc";

import Layout from "../components/layout/Layout";

import "../styles/globals.css";

const queryClient = new QueryClient();

export const apolloClient = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_LENS_API_URL,
  cache: new InMemoryCache(),
});

const MyApp: AppType = ({ Component, pageProps }) => {
  // configure chains
  const { chains, provider } = configureChains(
    [chain.polygon],
    [
      infuraProvider({
        apiKey: process.env.NEXT_PUBLIC_INFURA_API_KEY as string,
      }),
      publicProvider(),
    ]
  );

  // get connectors from rainbowkit
  const { connectors } = getDefaultWallets({
    appName: "LensLists",
    chains,
  });

  // Set up client
  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
  });

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        modalSize="compact"
        chains={chains}
        theme={lightTheme({
          accentColor: "#4F46E5",
          accentColorForeground: "white",
          borderRadius: "medium",
        })}
      >
        <QueryClientProvider client={queryClient}>
          <Provider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </Provider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default trpc.withTRPC(MyApp);
