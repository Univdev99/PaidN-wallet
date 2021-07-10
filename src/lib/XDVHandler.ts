import { Wallet } from "xdv-universal-wallet-core";

export default class XDVNodeProvider {

  async createWallet(accountName: string, passphrase: string, mnemonic: string): Promise<Wallet> {
    const xdvWallet = new Wallet();
    const url = "https://data-seed-prebsc-1-s1.binance.org:8545/";
    console.log("Account Name: ", accountName, 'passphrase',passphrase);
    await xdvWallet.open(accountName, passphrase);

    let walletid;

    const acct = (await xdvWallet.getAccount()) as any;

    if (acct.keystores.length === 0) {
      const options = { mnemonic };
      walletid = await xdvWallet.addWallet(options);
    } else {
      walletid = acct.keystores[0].walletId;
    }

    const walletEd25519 = await xdvWallet.createEd25519({
      rpcUrl: url,
      walletId: walletid,
    });

    const web3Prov = await xdvWallet.createWeb3Provider({
      rpcUrl: url,
      walletId: walletid
    });

    await walletEd25519.did.authenticate();

    return {walletEd25519, web3Prov} as any;
  }
}
