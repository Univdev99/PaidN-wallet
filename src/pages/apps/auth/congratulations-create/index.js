import styles from "./styles.js";
import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Unlock from "../unlock/index.js";
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

function Congratulations() {
    const history = useHistory();
    const classes = useStyles();
    var inputValue = localStorage.getItem('initialText')
    const [text, setText] = useState(inputValue);
    
    return (
        <div>
            {/* <NavBar /> */}
        
            <div style={styles.content}>
                <Typography style={{textAlign: 'center', color: "#444cea"}} gutterBottom variant="h4" component="h2">
                    Congratulations! 🎉
                </Typography>
                <div style={{marginTop: 50, width: '100%'}}>
                    <Typography
                        style={{textAlign: 'center', color: "#afafaf"}}
                        gutterBottom
                        variant="h6"
                        component="h6">
                        !!!
                    </Typography>
                </div>
                <div style={{marginTop: 50}}>
                    <Button
                        onClick={() => goTo(Unlock)}
                        style={styles.button}
                    >
                        Enter
                    </Button>
                </div>
            </div>
        </div>
       
    );
}

export default Congratulations;
