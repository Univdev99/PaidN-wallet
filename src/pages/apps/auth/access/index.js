import styles from "./styles.js";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import NewWallet from "../create-wallet/index";
import ImportWallet from "../import-wallet/index";
import Unlock from "../unlock/index";
import { goTo } from "react-chrome-extension-router";

function Login() {
  var wallet = localStorage.getItem("walletEd25519");
  var web3Prov = localStorage.getItem("web3Prov");
  var passphrase = localStorage.getItem("passphrase");

  var array = { wallet, web3Prov, passphrase };

  if (wallet !== undefined && web3Prov !== undefined) {
    goTo(Unlock, { array });
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
          Are you new in 🎥?
        </Typography>
        <div style={{ marginTop: 20, width: "100%" }}>
          <Typography
            style={{ textAlign: "center", color: "#afafaf" }}
            gutterBottom
            variant="h5"
            component="h5"
          >
            Connect to the descentralized web
          </Typography>
        </div>
        <div style={{ marginTop: 40, width: "100%" }}>
          <Typography
            style={{ textAlign: "center", color: "#afafaf" }}
            gutterBottom
            variant="h5"
            component="h5"
          >
            How do you wish to start?
          </Typography>
        </div>
        <div style={{ marginTop: 20 }}>
          <Button onClick={() => goTo(ImportWallet)} style={styles.button}>
            Import Wallet
          </Button>
        </div>
        <div style={{ marginTop: 20 }}>
          <Button onClick={() => goTo(NewWallet)} style={styles.button}>
            Create Wallet
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Login;
