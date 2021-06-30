import styles from "./styles.js";
import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import NewWallet from '../createWallet/index';
import NavBar from '../../../components/layout/NavBar/index';
import Upload from '../../dashboard/upload/index';
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
    goTo(Upload)
}

function Login() {
    const history = useHistory();
    const classes = useStyles();
    var inputValue = localStorage.getItem('initialText')
    const [text, setText] = useState(inputValue);
    
    return (
        <div>
            <NavBar />
        
            <div style={styles.content}>
                <Card className={classes.root}>
                    <Typography style={{textAlign: 'center'}} gutterBottom variant="h4" component="h2">
                        Please enter 12 words
                    </Typography>
                    <div style={{marginTop: 20, width: '100%'}}>
                        <TextField
                            id="outlined-multiline-static"
                            label="12 Words"
                            multiline
                            rows={4}
                            style={{width: '100%'}}
                            variant="outlined"
                            value={text}
                        />
                    </div>
                    <div style={{marginTop: 20}}>
                        <button onClick={() => storage()} style={{ backgroundColor: "#62d7c5", height: 50, width: 150, border: '1px solid #62d7c5', color: 'white', borderRadius: 5, fontFamily: 'Roboto', fontSize: 16}}>
                            SUBMIT
                        </button>
                    </div>
                    <div style={{marginTop: 20}}>
                        <Button size="large" color="primary" onClick={() => goTo(NewWallet)}>
                            NEW WALLET
                        </Button>
                    </div>
                </Card>
            </div>
        </div>
       
    );
}

export default Login;
