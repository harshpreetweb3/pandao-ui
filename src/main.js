import {
    DataRequestBuilder,
    RadixDappToolkit,
    RadixNetwork,
  } from "@radixdlt/radix-dapp-toolkit";


  const rdt = RadixDappToolkit({
    dAppDefinitionAddress: dAppDefinitionAddress,
    networkId: RadixNetwork.Stokenet,
    applicationName: "Hello",
    applicationVersion: "1.0.0",
  });

  rdt.walletApi.setRequestData(DataRequestBuilder.accounts().exactly(1));

  const accountAddress = rdt.walletApi.getWalletData().accounts[0].address;

  const result = await rdt.walletApi.sendTransaction({
    transactionManifest: manifest,
    version: 1,
  });