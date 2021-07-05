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
        seedPassphrase: '',
        passphrase: '',
        confirmPassphrase: ''
    });
    const [validateSeedPassphrase, setValidateSeedPassphrase] = useState(true);
    const [validatePassphrase, setValidatePassphrase] = useState(true);
    const [validateConfirmPassphrase, setValidateConfirmPassphrase] = useState(true);
    
    const handleInput = (e) => {
        const { name, value } = e.target
        // console.log(name)
        // console.log(value)
        switch (name) {
            case 'seedPassphrase':
                if (state.seedPassphrase.length === 11) {
                    setState({
                        ...state,
                        [name]: value
                    })
                    setValidateSeedPassphrase(false)
                }
                else if (state.seedPassphrase.length < 11) {
                    setValidateSeedPassphrase(true)
                    setState({
                        ...state,
                        [name]: value
                    })
                }
                break;
            case 'passphrase':
                if (state.passphrase.length === 11) {
                    setState({
                        ...state,
                        [name]: value
                    })
                    setValidatePassphrase(false)
                }
                else if (state.passphrase.length < 11) {
                    setValidatePassphrase(true)
                    setState({
                        ...state,
                        [name]: value
                    })
                }
                break;
            case 'confirmPassphrase':
                if (state.confirmPassphrase.length === 11) {
                    setState({
                        ...state,
                        [name]: value
                    })
                    setValidateConfirmPassphrase(false)
                }
                else if (state.confirmPassphrase.length < 11) {
                    setValidateConfirmPassphrase(true)
                    setState({
                        ...state,
                        [name]: value
                    })
                }
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
                        name="seedPassphrase"
                        value={state.seedPassphrase}
                        onChange={(e) => handleInput(e)}
                        error={validateSeedPassphrase}
                        helperText="Passphrase must be 12 characters long."
                    />
                </div>
                <div style={{marginTop: 20, width: '100%'}}>
                    <Typography
                        style={{textAlign: 'center', color: "#afafaf"}}
                        gutterBottom
                        variant="h6"
                        component="h6">
                        Enter new passphrase
                    </Typography>
                </div>
                <div style={{marginTop: 2, width: '100%'}}>
                    <TextField
                        id="filled-read-only-input"
                        label="New Passphrase"
                        style={{width: '100%'}}
                        variant="filled"
                        name="passphrase"
                        value={state.passphrase}
                        onChange={(e) => handleInput(e)}
                        error={validatePassphrase}
                        helperText="Passphrase must be 12 characters long."
                    />
                </div>
                <div style={{marginTop: 5, width: '100%'}}>
                    <TextField
                        id="filled-read-only-input"
                        label="Confirm Passphrase"
                        style={{width: '100%'}}
                        variant="filled"
                        name="confirmPassphrase"
                        value={state.confirmPassphrase}
                        onChange={(e) => handleInput(e)}
                        error={validateConfirmPassphrase}
                        helperText="Passphrase must be 12 characters long."
                    />
                </div>
                <div style={{marginTop: 20}}>
                    <Button
                        onClick={() => goTo(Congratulations)}
                        style={styles.button}
                        disabled={validateSeedPassphrase && validatePassphrase && validateConfirmPassphrase}
                    >
                        Import
                    </Button>
                </div>
            </div>
        </div>
       
    );
}

export default ImportWallet;
