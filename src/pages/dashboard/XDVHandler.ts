import { Wallet } from "xdv-universal-wallet-core";

export default class XDVNodeProvider {
  //@ts-ignore
  async createWallet(accountName: string, passphrase: string): Promise <Wallet> {
    //account name standar en el react
    const xdvWallet = new Wallet({ isWeb: true});
    console.log('Account Name: ', accountName);
    await xdvWallet.open(accountName, passphrase);
    //enroll account must be deprecated 

    await xdvWallet.enrollAccount({
      passphrase,
      accountName,
    });

    let walletid;

    const acct = await xdvWallet.getAccount() as any;

    if (acct.keystores.length === 0){
      walletid = await xdvWallet.addWallet()
    } else {
      walletid = acct.keystores[0].walletId;
    }
    // const wallet = await xdvWallet.createEd25519({
      //   walletId: acct.walletId,
      // })
      
    const wallet = await xdvWallet.createEd25519({
      passphrase: passphrase,
      walletId: walletid,
    })

    return wallet as any;
    
  }

}