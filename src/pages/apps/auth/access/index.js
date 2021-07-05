import styles from "./styles.js";
import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
// import NewWallet from '../createWallet/index';
import NewWallet from '../create-wallet/index';
import ImportWallet from '../import-wallet/index'
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

    var input = document.getElementById('outlined-multiline-static');
    var inputValue = input.value;
    console.log("--VALOR--", inputValue)
    localStorage.setItem('initialText', inputValue)
    // goTo(Upload)
}

function Login() {
    const history = useHistory();
    const classes = useStyles();
    var inputValue = localStorage.getItem('initialText')
    const [text, setText] = useState(inputValue);
    
    return (
        <div>
            {/* <NavBar /> */}
        
            <div style={styles.content}>
                <Typography style={{textAlign: 'center', color: "#444cea"}} gutterBottom variant="h4" component="h2">
                    Are you new in 🎥?
                </Typography>
                <div style={{marginTop: 20, width: '100%'}}>
                    <Typography
                        style={{textAlign: 'center', color: "#afafaf"}}
                        gutterBottom
                        variant="h5"
                        component="h5">
                        Connect to the descentralized web
                    </Typography>
                </div>
                <div style={{marginTop: 40, width: '100%'}}>
                    <Typography
                        style={{textAlign: 'center', color: "#afafaf"}}
                        gutterBottom
                        variant="h5"
                        component="h5">
                        How do you wish to start?
                    </Typography>
                </div>
                <div style={{marginTop: 20}}>
                    <Button
                        onClick={() => goTo(ImportWallet)}
                        style={styles.button}
                    >
                        Import Wallet
                    </Button>
                </div>
                <div style={{marginTop: 20}}>
                    <Button
                        onClick={() => goTo(NewWallet)}
                        style={styles.button}
                    >
                        Create Wallet
                    </Button>
                </div>
            </div>
        </div>
       
    );
}

export default Login;
