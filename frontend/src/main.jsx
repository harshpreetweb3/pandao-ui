import { GatewayApiClient } from "@radixdlt/babylon-gateway-api-sdk";
import { RadixDappToolkit, RadixNetwork } from "@radixdlt/radix-dapp-toolkit";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import './index.css'
import { GatewayApiProvider } from "./context/GatewayApiProvider.jsx";
import { RdtProvider } from "./context/RdtProvider.jsx";
import { AccountProvider } from "./AccountContext.jsx";
import { Toaster } from "./components/ui/sonner.jsx";



const dappConfig = {
  networkId: RadixNetwork.Stokenet,
  applicationVersion: "1.0.0",
  applicationName: "Pandao",
  applicationDappDefinitionAddress: "account_tdx_2_128wx75khgz5rstma5aapejz3656eluz43v3jruz2s3kv3n0urr8m23",
};
const rdt = RadixDappToolkit(dappConfig);
console.log("dApp Toolkit: ", rdt);
const gatewayApi = GatewayApiClient.initialize(dappConfig);
console.log("gatewayApi: ", gatewayApi);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RdtProvider value={rdt}>
      <GatewayApiProvider value={gatewayApi}>
        <AccountProvider>
          <App />
          <Toaster />
        </AccountProvider>
      </GatewayApiProvider>
    </RdtProvider>
  </React.StrictMode>
);
