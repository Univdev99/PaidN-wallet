import styles from "./styles.js";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Visor from "../visor/index.js";
import { goTo } from "react-chrome-extension-router";
import { IPFSManager } from "../../../../lib/IPFSManager";
import { ethers } from "ethers";
import Web3 from "web3";
import { DIDManager } from "xdv-universal-wallet-core";

const KLIP = require("../../../../contracts/KLIP.sol/KLIP.json");
const MockCoin = require("../../../../contracts/MockCoin.sol/MockCoin");

let contract = null;
let did = null;
let videoFile = null;
let indexes = null;
let walletAddress = "";
let transactionStatus = "";
let ethersContract = null;
let mockContract;
let transationAddress = null;
let ethersInstance = null;
let ipfs = null;
let ipfsId = "";
let localAddress = null;
let web3 = null;
let didManager = null;

const useStyles = makeStyles((theme) => ({
  root: {
    width: "80%",
    maxHeight: "60%",
    padding: 30,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    overflowY: "scroll",
    boxSizing: "content-box",
  },
  form: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  button: {
    margin: theme.spacing(1),
    width: 150,
  },
  input: {
    display: "none",
  },
}));

async function bindContracts(web3Prov) {
  console.log("Beginning of BINDCONTRACTS()");
  ethersInstance = new ethers.providers.Web3Provider(
    web3Prov.web3.givenProvider
  );
  const contractAddress = "0x7Ae751E890464648b222fE9D45e0DA190AaD16ca";
  const mockContractAddress = "0x301Fe0CF20d1819D8F7eBAF3Ba80C805587d693D";
  contract = new web3Prov.web3.eth.Contract(KLIP.abi, contractAddress);
  mockContract = new web3Prov.web3.eth.Contract(
    MockCoin.abi,
    mockContractAddress
  );
  ethersContract = new ethers.Contract(
    contractAddress,
    KLIP.abi,
    ethersInstance.getSigner(0)
  );
  console.log("End of BINDCONTRACTS()");
}

async function createDocumentNode(file, web3) {
  console.log("Beginning of CREATEDOCUMENTNODE()");
  console.log("Local Account Adress", contract.defaultAccount);
  try {
    videoFile = file[0];
    debugger;
    const ipfs = new IPFSManager();
    await ipfs.start();
    indexes = await ipfs.addVideoObject(did, videoFile);

    console.log("files", videoFile);
    transactionStatus = "Creating transaction on the blockchain...";
    const bob = contract.defaultAccount;
    await mockContract.methods
      .approve(contract._address, "1000000000000000000")
      .send({
        gasPrice: "22000000000",
        gas: 400000,
        from: contract.defaultAccount,
      });

    const txmint = await contract.methods
      .mint(
        "1", // qty
        bob,
        did.id, //
        web3.utils.fromUtf8(indexes),
        false, // encrypted
        "xdv",
        did.id
      )
      .send({
        gasPrice: "22000000000",
        gas: 4000000,
        from: contract.defaultAccount,
      });

    //await txmint.wait(1);
    const filter = contract.getPastEvents("DocumentAnchored", {
      toBlock: "latest",
      fromBlock: 0,
      filter: { user: localAddress },
    });

    const response = await filter;
    const blockItem = response.reverse()[0];
    const root = await ipfs.getObject(
      web3.utils.hexToUtf8(blockItem.returnValues.documentURI)
    );
    const document = root.value;
    console.log("ROOT VALUE", root.value);
    console.log("document", document);
    console.log("metadata", document.metadata);
    console.log("url", document.metadata.videourl);

    //videoBase64 = root.value.content;

    console.log(txmint);
    // this.showTransactionCancelBtn = true;
    transationAddress = txmint.transactionHash;
    ipfsId = indexes;
    transactionStatus = "";
    let urlVideo = "https://ipfs.io/ipfs/" + document.metadata.videourl;
    goTo(Visor, { urlVideo });
    //await this.fetchDocuments();
    // this.instanceVideoPlayer(
    //     "https://ipfs.io/ipfs/" + root.value.metadata.videourl.toString()
    // );
  } catch (e) {
    transactionStatus = "An error has occurred";
    console.log("confirmation error", e);
  }
}

const onFileUpload = (files) => {
  console.log(files);
};

function Upload(message) {
  const classes = useStyles();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [copied, setCopy] = useState(false);

  const copy = () => {
    const el = document.createElement("input");
    el.value = walletAddress;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    setCopy(true);
  };

  web3 = new Web3();
  message.web3Prov.web3.eth.defaultAccount =
    message.web3Prov.web3.defaultAccount;

  console.log("Result Received", message);
  bindContracts(message.web3Prov);
  did = message.wallet.did;
  walletAddress = contract.defaultAccount;
  ipfs = new IPFSManager();
  didManager = new DIDManager();

  return (
    <div>
      <Typography
        style={{ textAlign: "center", color: "#444cea" }}
        gutterBottom
        variant="h4"
        component="h4"
      >
        Address
      </Typography>
      <div style={styles.content}>
        <div
          style={{
            marginTop: 20,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div style={{}}>
            <span style={{ textOverflow: "ellipsis", width: "50%" }}>
              {walletAddress}
            </span>
            <Button
              startIcon={<LibraryBooksIcon />}
              style={styles.button}
              onClick={() => copy()}
            >
              {copied ? "Copied!" : "Copy"}
            </Button>
          </div>
        </div>
        <Typography
          style={{ textAlign: "center", color: "#444cea" }}
          gutterBottom
          variant="h4"
          component="h2"
        >
          Upload Content
        </Typography>
        <div
          style={{
            marginTop: 20,
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <input
            accept="video/mp4"
            className={classes.input}
            multiple
            id="contained-button-file"
            type="file"
            onChange={(e) => setSelectedFiles(e.target.files)}
          />
          <label htmlFor="contained-button-file">
            <Button
              variant="contained"
              color="default"
              className={classes.button}
              component="span"
              startIcon={<CloudUploadIcon />}
            >
              Upload
            </Button>
          </label>
        </div>
        <div style={{ marginTop: 50, width: "100%" }}>
          <TextField
            id="filled-read-only-input"
            label="Title for the video"
            style={{ width: "100%" }}
            variant="filled"
          />
        </div>
        <div style={{ marginTop: 20, width: "100%" }}>
          <TextField
            id="filled-read-only-input"
            label="Insert a description for the video"
            multiline
            rows={3}
            style={{ width: "100%" }}
            variant="filled"
          />
        </div>
        <div style={{ marginTop: 20 }}>
          <Button
            onClick={() =>
              createDocumentNode(selectedFiles, message.web3Prov.web3)
            }
            style={styles.button}
          >
            Upload
          </Button>
        </div>
        <div style={{ marginTop: 40 }}>
          <Typography
            style={{ textAlign: "center", color: "#adadad" }}
            gutterBottom
            variant="h6"
            component="h6"
          >
            See a list of{" "}
            <span style={{ color: "#444cea", fontWeight: "bold" }}>
              allowed file types
            </span>
          </Typography>
        </div>
      </div>
    </div>
  );
}

export default Upload;
