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
// import NewWallet from '../create-wallet/index';
// import ImportWallet from '../import-wallet/index'
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
import Upload from "../upload/index.js";

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

function Home() {
    const history = useHistory();
    const classes = useStyles();
    var inputValue = localStorage.getItem('initialText')
    const [text, setText] = useState(inputValue);
    
    return (
        <div>
            {/* <NavBar /> */}
        
            <div style={styles.content}>
                <Typography style={{textAlign: 'center', color: "#444cea"}} gutterBottom variant="h4" component="h2">
                    🔲
                </Typography>
                <Typography style={{textAlign: 'center', color: "#444cea"}} gutterBottom variant="h4" component="h2">
                    Account Name
                </Typography>
                <div style={{borderBottom: 'solid #000 1px', marginTop: 20, padding: 40, width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
                    <Button
                        // onClick={() => goTo(ImportWallet)}
                        style={styles.button_emoji}
                    >
                        🎞
                    </Button>
                    <Button
                        // onClick={() => goTo(ImportWallet)}
                        style={styles.button_emoji}
                    >
                        💰
                    </Button>
                    <Button
                        // onClick={() => goTo(ImportWallet)}
                        style={styles.button_emoji}
                    >
                        ⚙
                    </Button>
                </div>
                <div style={{marginTop: 20}}>
                    <Button
                        // onClick={() => goTo(ImportWallet)}
                        style={styles.button}
                    >
                        Connect
                    </Button>
                </div>
                <div style={{marginTop: 20}}>
                    <Button
                        onClick={() => goTo(Upload)}
                        style={styles.button}
                    >
                        Upload Content
                    </Button>
                </div>
                <div style={{marginTop: 40}}>
                    <Typography style={{textAlign: 'center', color: "#adadad"}} gutterBottom variant="h7" component="h7">
                        Need any help? <span style={{color: "#444cea", fontWeight: 'bold'}}>Support</span>
                    </Typography>
                </div>
            </div>
        </div>
    );
}

export default Home;
