import Web3 from "web3";
// import { ec } from 'elliptic';
import { getWeb3 } from "xdv-universal-wallet-core/src/utils/web3factory";

export default class Web3Provider {
  async createWeb3Provider(wallet: any) {
    let web3: Web3;
    let ks: any;
    let account = await wallet.getAccount();

    web3 = getWeb3(wallet.rpcUrl);
    //open an existing wallet
    ks = account
      .get("keystores")
      .find((w: any) => w.walletId === wallet.walletId);
    if (!ks) throw new Error("No wallet selected");

    const privateKey = "0x" + ks.keypairs.ES256K;
    web3.eth.accounts.wallet.add(privateKey);
    const address = web3.eth.accounts.privateKeyToAccount(privateKey).address;
    web3.defaultAccount = address;

    return {
      web3,
      address,
    };
  }
}
