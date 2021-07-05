import styles from "./styles.js";
// import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import NavBar from '../../../components/layout/NavBar/index';
import UploadNTF from '../../dashboard/upload/index';
import XDVNodeProvider from '../../dashboard/XDVHandler';
import DIDManager from '../../dashboard/DIDManager';
import {
    goBack,
    goTo,
    popToTop,
    Link,
    Router,
    getCurrent,
    getComponentStack,
  } from 'react-chrome-extension-router';

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
}));

let didManager = new DIDManager(); 
let did = null;

async function restoreDid(w) {
    console.log('Inicio de RESTOREDID()');
    did = await didManager.create3ID(w);
    console.log('Final de RESTOREDID()');
};

async function createWallet(){
    console.log('Inicio de CREATEWALLET()');
    var input = document.getElementById('outlined-multiline-static');
    var inputValue = input.value;
    console.log('Input Value Del Componente: ',inputValue);
    const xdvProvider = new XDVNodeProvider();
    const wallet = await xdvProvider.createWallet('mywallet1', inputValue);

    console.log('WALLET', wallet);

    await restoreDid(wallet);

    console.log("DID GENERATED");

    console.log('Output al finalizar CREATE WALLET', wallet);
    debugger
    //TODO: fix NFT name
    goTo(UploadNTF);
}

function NewWallet() {
    const history = useHistory();
    const classes = useStyles();

    return (
        <>
            <NavBar />

            <div style={styles.content}>
                <Card className={classes.root}>
                    <Typography style={{textAlign: 'center'}} gutterBottom variant="h3" component="h2">
                        NEW WALLET
                    </Typography>
                    <Typography style={{textAlign: 'center'}} gutterBottom variant="h5" component="h2">
                        Please enter 12 words
                    </Typography>
                    <div style={{marginTop: 20, width: '100%'}}>
                        <TextField
                            id="outlined-multiline-static"
                            label="passphrase"
                            multiline
                            rows={4}
                            style={{width: '100%'}}
                            variant="outlined"
                        />
                    </div>
                    <div style={{marginTop: 20}}>
                        <button onClick={() => {createWallet()}} 
                            style={{ backgroundColor: "#62d7c5", height: 50, width: 150, border: '1px solid #62d7c5', color: 'white', borderRadius: 5, fontFamily: 'Roboto', fontSize: 16}}>
                            SUBMIT
                        </button>
                    </div>
                    <div style={{marginTop: 20}}>
                        <Button size="large" color="primary" onClick={() => goBack()}>
                            RETURN
                        </Button>
                    </div>
                </Card>
            </div>
        </>
    );
}

export default NewWallet;
