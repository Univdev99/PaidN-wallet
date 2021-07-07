import { Wallet } from "xdv-universal-wallet-core";
import Web3Provider from "./Web3ProviderHelper";

export default class XDVNodeProvider {
  //@ts-ignore
  async createWallet(accountName: string, passphrase: string): Promise<Wallet> {
    //account name standar en el react
    const xdvWallet = new Wallet();
    const web3Provider = new Web3Provider();
    const url = "https://data-seed-prebsc-1-s1.binance.org:8545/";
    console.log("Account Name: ", accountName);
    await xdvWallet.open(accountName, passphrase);

    let walletid;

    const acct = (await xdvWallet.getAccount()) as any;

    if (acct.keystores.length === 0) {
      walletid = await xdvWallet.addWallet();
    } else {
      walletid = acct.keystores[0].walletId;
    }

    const result = await xdvWallet.createEd25519({
      rpcUrl: url,
      walletId: walletid,
    });

    //const web3Prov = await web3Provider.createWeb3Provider(result);

    debugger;
    await result.did.authenticate();

    return result as any;
  }
}
