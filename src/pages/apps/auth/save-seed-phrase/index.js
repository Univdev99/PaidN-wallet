import styles from "./styles.js";
import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import Congratulations from '../congratulations-create/index';
// import NewWallet from '../createWallet/index';
// import NavBar from '../../../components/layout/NavBar/index';
// import Upload from '../../dashboard/upload/index';
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

function storage(){

    // var input = document.getElementById('outlined-multiline-static');
    // var inputValue = input.value;
    // console.log("--VALOR--", inputValue)
    // localStorage.setItem('initialText', inputValue)
    goTo(Congratulations)
}

function SaveSeedPhrase() {
    const history = useHistory();
    const classes = useStyles();
    var inputValue = localStorage.getItem('initialText')
    const [text, setText] = useState(inputValue);
    const [state, setState] = useState({
        seed_phrase: '',
    });
    const [validateSeedPhrase, setValidateSeedPhrase] = useState(true);
    
    
    const handleInput = (e) => {
        const { name, value } = e.target

        setState({
            ...state,
            [name]: value
        })
        let split_value = value.split(" ")
        let len = split_value.length;
        console.log(split_value[len - 1])
        if (len === 12 && split_value[len - 1] !== '') //15 words, hardcoded, probably change this to maxwords, or whatever.
            setValidateSeedPhrase(false)
        else
            setValidateSeedPhrase(true)
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
    }

    return (
        <div>
            {/* <NavBar /> */}
        
            <div style={styles.content}>
                <Typography style={{textAlign: 'center', color: "#444cea"}} gutterBottom variant="h4" component="h2">
                    Create Wallet
                </Typography>
                <div style={{marginTop: 20, width: '100%'}}>
                    <Typography
                        style={{textAlign: 'center', color: "#afafaf"}}
                        gutterBottom
                        variant="h6"
                        component="h6">
                        Save your seed phrase in a safe place!
                    </Typography>
                </div>
                <div style={{marginTop: 5, width: '100%'}}>
                    <TextField
                        id="filled-read-only-input"
                        label="New Seed phrase"
                        multiline
                        rows={4}
                        style={{width: '100%'}}
                        variant="filled"
                        name="seed_phrase"
                        value={state.seed_phrase}
                        onChange={(e) => handleInput(e)}
                        error={validateSeedPhrase}
                        helperText="Seed phrase must be 12 words long."
                    />
                </div>
                <div style={{marginTop: 20}}>
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
