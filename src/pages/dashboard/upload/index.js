import styles from "./styles.js";
// import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import NavBar from '../../../components/layout/NavBar/index';
import NTFDetails from '../details-ntf/index';

import { DIDManager } from "xdv-universal-wallet-core";
import { IPFSManager } from "../IPFSManager";
import { ethers } from "ethers";
import { DID } from "dids";
import Web3 from "web3";

import {
    goBack,
    goTo,
    popToTop,
    Link,
    Router,
    getCurrent,
    getComponentStack,
} from 'react-chrome-extension-router';

import { Web } from "@material-ui/icons";

const KLIP = require("../../../contracts/KLIP.sol/KLIP.json");
const MockCoin = require("../../../contracts/MockCoin.sol/MockCoin");

const useStyles = makeStyles((theme) => ({
    root: {
        width: '80%',
        maxHeight: '60%',
        padding: 30,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflowY: 'scroll',
        boxSizing: 'content-box',
    },
    form: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    button: {
        margin: theme.spacing(1),
    },
    input: {
        display: 'none',
    },
}));

let videoFile = null;
let transactionStatus='';
let ipfsId = '';
let localAddress = null;
let ethersInstance = null;
let web3 = null;
let ethersContract = null;
let contract = null;
let mockContract;
let daiContract = null;
let ipfs = null;
let did = null;
let didManager = null;
let transationAddress = null;
let indexes = null;


async function bindContracts() {
    console.log('Beginning of BINDCONTRACTS()');
    ethersInstance = new ethers.providers.Web3Provider(
        web3.givenProvider
    );
    const contractAddress = "0x03659591c344e90fD926cf9E4b463C5530422698";
    const mockContractAddress = "0xeB398229cDBB348E6076fd89d488FD14a05cA3B8";
    contract = new web3.eth.Contract(KLIP.abi, contractAddress);
    mockContract = new web3.eth.Contract(
        MockCoin.abi,
        mockContractAddress
    );
    ethersContract = new ethers.Contract(
        contractAddress,
        KLIP.abi,
        ethersInstance.getSigner(0)
    );

    console.log('End of BINDCONTRACTS()');
};

async function createDocumentNode(file) {

    console.log('Beginning of CREATEDOCUMENTNODE()');

    try {
        videoFile = new File([""], file);

        debugger
        const ipfs = new IPFSManager();
        await ipfs.start();
        indexes = await ipfs.addVideoObject(did, videoFile);

        console.log("files", videoFile);
        transactionStatus = "Creating transaction on the blockchain...";
        const bob = contract.defaultAccount;

        await daiContract.methods
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
            web3.utils.fromUtf8(this.indexes),
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
        //videoBase64 = root.value.content;

        // this.loading = false;
        // this.canUpload = false;
        // this.close();
        console.log(txmint);
        // this.showTransactionCancelBtn = true;
        transationAddress = txmint.transactionHash;
        ipfsId = indexes;
        transactionStatus = "";
      //await this.fetchDocuments();

        // this.instanceVideoPlayer(
        //     "https://ipfs.io/ipfs/" + root.value.metadata.videourl.toString()
        // );


    } catch (e) {
        transactionStatus = "An error has occurred";
        console.log("confirmation error", e);
    }
}

function Upload() {
    const uploadInputRef = useRef(null);
    const history = useHistory();
    const classes = useStyles();
    console.log('Beginning of UPLOAD() component');
    web3 = new Web3();
    web3.eth.defaultAccount = '';

    bindContracts();

    ipfs = new IPFSManager();
    didManager = new DIDManager();
    
    return (
        <>
        <NavBar />
            <div style={styles.content}>
                <Card className={classes.root}>
                    <Typography style={{textAlign: 'center'}} gutterBottom variant="h4" component="h2">
                        Browse File
                    </Typography>
                    <div style={{marginTop: 20, display: 'flex', justifyContent: 'center', flexDirection: 'row'}}>
                        <input
                            ref={uploadInputRef}
                            accept="video/*"
                            className={classes.input}
                            id="contained-button-file"
                            multiple
                            type="file"
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
                        <TextField
                            id="filled-read-only-input"
                            label="Video"
                            InputProps={{
                                readOnly: true,
                            }}
                            variant="filled"
                        />
                    </div>
                    <div style={{marginTop: 20, width: '100%'}}>
                        <TextField id="outlined-search" style={{width: '100%'}} label="Name" type="text" variant="outlined" />
                    </div>
                    <div style={{marginTop: 20, width: '100%'}}>
                        <TextField
                            id="outlined-multiline-static"
                            label="Description"
                            multiline
                            rows={4}
                            style={{width: '100%'}}
                            variant="outlined"
                        />
                    </div>
                    <div style={{marginTop: 20}}>
                        <button onClick={() =>  createDocumentNode(uploadInputRef.current.value)} style={{ backgroundColor: "#62d7c5", height: 50, width: 150, border: '1px solid #62d7c5', color: 'white', borderRadius: 5, fontFamily: 'Roboto', fontSize: 16}}>
                            CONTINUE
                        </button>
                    </div>
                </Card>
            </div>
        </>
    );
}

export default Upload;
