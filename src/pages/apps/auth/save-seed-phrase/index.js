import styles from "./styles.js";
import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Congratulations from "../congratulations-create/index";
import { goTo } from "react-chrome-extension-router";

function storage() {
  goTo(Congratulations);
}

function SaveSeedPhrase() {
  const [state, setState] = useState({
    seed_phrase: "",
  });
  const [validateSeedPhrase, setValidateSeedPhrase] = useState(true);

  const handleInput = (e) => {
    const { name, value } = e.target;

    setState({
      ...state,
      [name]: value,
    });
    let split_value = value.split(" ");
    let len = split_value.length;
    console.log(split_value[len - 1]);
    if (len === 12 && split_value[len - 1] !== "")
      //15 words, hardcoded, probably change this to maxwords, or whatever.
      setValidateSeedPhrase(false);
    else setValidateSeedPhrase(true);
    // console.log(name)
    // console.log(value)
    // if (state.passphrase.length === 11) {
    //     setState({
    //         ...state,
    //         [name]: value
    //     })
    //     setValidatePassphrase(false)
    // }
    // else if (state.passphrase.length < 11) {
    //     setValidatePassphrase(true)
    //     setState({
    //         ...state,
    //         [name]: value
    //     })
    // }
  };

  return (
    <div>
      {/* <NavBar /> */}

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
            Save your seed phrase in a safe place!
          </Typography>
        </div>
        <div style={{ marginTop: 5, width: "100%" }}>
          <TextField
            id="filled-read-only-input"
            label="New Seed phrase"
            multiline
            rows={4}
            style={{ width: "100%" }}
            variant="filled"
            name="seed_phrase"
            value={state.seed_phrase}
            onChange={(e) => handleInput(e)}
            error={validateSeedPhrase}
            helperText="Seed phrase must be 12 words long."
          />
        </div>
        <div style={{ marginTop: 20 }}>
          <Button
            onClick={() => storage()}
            style={styles.button}
            disabled={validateSeedPhrase}
          >
            Ready
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SaveSeedPhrase;
