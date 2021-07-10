import styles from "./styles.js";
import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import UploadNTF from "../../dashboard/upload/index";
import XDVNodeProvider from "../../../../lib/XDVHandler";
import { goTo } from "react-chrome-extension-router";

function CreateWallet() {
  const [state, setState] = useState({
    passphrase: "",
    confirmPassphrase: "",
  });
  const [validateConfirmPassphrase, setValidateConfirmPassphrase] =
    useState(true);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });

    if (name === "confirmPassphrase") {
      if (value === state.passphrase) setValidateConfirmPassphrase(true);
      else setValidateConfirmPassphrase(false);
    } else {
      if (value === state.confirmPassphrase) setValidateConfirmPassphrase(true);
      else setValidateConfirmPassphrase(false);
    }
  };

  async function _createWallet() {
    console.log("Inicio de CREATEWALLET()");
    console.log(validateConfirmPassphrase);
    if (validateConfirmPassphrase) {
      var inputValue = state.passphrase;
      console.log("Input Value Del Componente: ", inputValue);
      const xdvProvider = new XDVNodeProvider();
      const result = await xdvProvider.createWallet("mywallet1", inputValue);

      console.log("WALLET", result.wallet);
      console.log("Output al finalizar CREATE WALLET", result);

      localStorage.setItem("walletEd25519", result.walletEd25519);
      localStorage.setItem("web3Prov", result.web3Prov);
      localStorage.setItem("passphrase", inputValue);

      //TODO: fix NFT name
      goTo(UploadNTF, {
        wallet: result.walletEd25519,
        web3Prov: result.web3Prov,
      });
    }
  }

  return (
    <div>
      <div style={styles.content}>
        <Typography
          style={{ textAlign: "center", color: "#444cea" }}
          gutterBottom
          variant="h4"
          component="h2"
        >
          Create Wallet
        </Typography>
        <div style={{ marginTop: 20, width: "100%" }}>
          <Typography
            style={{ textAlign: "center", color: "#afafaf" }}
            gutterBottom
            variant="h6"
            component="h6"
          >
            Choose a password
          </Typography>
        </div>
        <div style={{ marginTop: 5, width: "100%" }}>
          <TextField
            id="filled-read-only-input"
            label="New Password"
            style={{ width: "100%" }}
            variant="filled"
            name="passphrase"
            value={state.passphrase}
            onChange={(e) => handleInput(e)}
          />
        </div>
        <div style={{ marginTop: 5, width: "100%" }}>
          <TextField
            id="filled-read-only-input2"
            label="Confirm Password"
            style={{ width: "100%" }}
            variant="filled"
            name="confirmPassphrase"
            value={state.confirmPassphrase}
            onChange={(e) => handleInput(e)}
            error={!validateConfirmPassphrase}
          />
        </div>
        <div style={{ marginTop: 20 }}>
          <Button
            onClick={() => _createWallet()}
            style={styles.button}
            disabled={!validateConfirmPassphrase}
          >
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CreateWallet;
