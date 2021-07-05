import styles from "./styles.js";
import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import ViewDetails from "../view-details/index.js";
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
    button: {
        margin: theme.spacing(1),
        width: 150
    },
    input: {
        display: 'none',
    },
}));
function Upload() {
    const history = useHistory();
    const classes = useStyles();
    var inputValue = localStorage.getItem('initialText')
    const [text, setText] = useState(inputValue);
    
    return (
        <div>
            {/* <NavBar /> */}
        
            <div style={styles.content}>
                <Typography style={{textAlign: 'center', color: "#444cea"}} gutterBottom variant="h4" component="h2">
                    Video Details
                </Typography>
                <div style={{marginTop: 50, width: '100%'}}>
                    <TextField
                        id="filled-read-only-input"
                        label="ID"
                        disabled
                        style={{width: '100%'}}
                        variant="filled"
                    />
                </div>
                <div style={{marginTop: 20, width: '100%'}}>
                    <TextField
                        id="filled-read-only-input"
                        label="Link"
                        disabled
                        style={{width: '100%'}}
                        variant="filled"
                    />
                </div>
                <div style={{marginTop: 20, width: '100%'}}>
                    <TextField
                        id="filled-read-only-input"
                        label="RX Link"
                        disabled
                        style={{width: '100%'}}
                        variant="filled"
                    />
                </div>
                <div style={{marginTop: 80}}>
                    <Button
                        onClick={() => goTo(ViewDetails)}
                        style={styles.button}
                    >
                        Upload
                    </Button>
                </div>
                <div style={{marginTop: 40}}>
                    <Typography style={{textAlign: 'center', color: "#adadad"}} gutterBottom variant="h7" component="h7">
                        Need help? <span style={{color: "#444cea", fontWeight: 'bold'}}>NFT Guides</span>
                    </Typography>
                </div>
            </div>
        </div>
       
    );
}

export default Upload;
