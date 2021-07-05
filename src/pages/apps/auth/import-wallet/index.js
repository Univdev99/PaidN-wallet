import styles from "./styles.js";
import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Congratulations from "../congratulations-import/index.js";
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

function ImportWallet() {
    const history = useHistory();
    const classes = useStyles();
    var inputValue = localStorage.getItem('initialText')
    const [text, setText] = useState(inputValue);
    const [state, setState] = useState({
        seedPhrase: '',
        passphrase: '',
        confirmPassphrase: ''
    });
    const [validateSeedPhrase, setValidateSeedPhrase] = useState(true);
    const [validateConfirmPassphrase, setValidateConfirmPassphrase] = useState(true);
    
    const handleInput = (e) => {
        const { name, value } = e.target
        // console.log(name)
        // console.log(value)
        setState({
            ...state,
            [name]: value
        })
    
        
        switch (name) {
            case 'seedPhrase':
                let split_value = value.split(" ")
                let len = split_value.length;
                console.log(split_value[len - 1])
                if (len === 12 && split_value[len - 1] !== '') //15 words, hardcoded, probably change this to maxwords, or whatever.
                    setValidateSeedPhrase(false)
                else
                    setValidateSeedPhrase(true)
                break;
            case 'passphrase':
                if (value === state.confirmPassphrase)
                    setValidateConfirmPassphrase(false)
                else
                    setValidateConfirmPassphrase(true)
                break;
            case 'confirmPassphrase':
                if (value === state.passphrase)
                    setValidateConfirmPassphrase(false)
                else
                    setValidateConfirmPassphrase(true)
                break;
            default:
                break;
        }
    }

    return (
        <div>
            {/* <NavBar /> */}
        
            <div style={styles.content}>
                <Typography style={{textAlign: 'center', color: "#444cea"}} gutterBottom variant="h4" component="h2">
                    Import Wallet
                </Typography>
                <div style={{marginTop: 20, width: '100%'}}>
                    <Typography
                        style={{textAlign: 'center', color: "#afafaf"}}
                        gutterBottom
                        variant="h6"
                        component="h6">
                        Enter your seed phrase here
                    </Typography>
                </div>
                <div style={{marginTop: 2, width: '100%'}}>
                    <TextField
                        id="filled-read-only-input"
                        label="Seed Phrase"
                        multiline
                        rows={2}
                        style={{width: '100%'}}
                        variant="filled"
                        name="seedPhrase"
                        value={state.seedPhrase}
                        onChange={(e) => handleInput(e)}
                        error={validateSeedPhrase}
                        helperText="Passphrase must be 12 words long."
                    />
                </div>
                <div style={{marginTop: 20, width: '100%'}}>
                    <Typography
                        style={{textAlign: 'center', color: "#afafaf"}}
                        gutterBottom
                        variant="h6"
                        component="h6">
                        Entes Password
                    </Typography>
                </div>
                <div style={{marginTop: 2, width: '100%'}}>
                    <TextField
                        id="filled-read-only-input"
                        label="New Password"
                        style={{width: '100%'}}
                        variant="filled"
                        name="passphrase"
                        value={state.passphrase}
                        onChange={(e) => handleInput(e)}
                    />
                </div>
                <div style={{marginTop: 5, width: '100%'}}>
                    <TextField
                        id="filled-read-only-input"
                        label="Confirm Password"
                        style={{width: '100%'}}
                        variant="filled"
                        name="confirmPassphrase"
                        value={state.confirmPassphrase}
                        onChange={(e) => handleInput(e)}
                        error={validateConfirmPassphrase}
                    />
                </div>
                <div style={{marginTop: 20}}>
                    <Button
                        onClick={() => goTo(Congratulations)}
                        style={styles.button}
                        disabled={validateSeedPhrase && validateConfirmPassphrase}
                    >
                        Import
                    </Button>
                </div>
            </div>
        </div>
       
    );
}

export default ImportWallet;
