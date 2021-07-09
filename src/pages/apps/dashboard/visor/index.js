import styles from "./styles.js";
import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import ReactPlayer from 'react-player'
import CircularProgress from '@material-ui/core/CircularProgress';
import Home from "../home/index.js";
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
})); 

function Visor({urlVideo}) {
    const classes = useStyles();
    const video = urlVideo;
    
    return (
        <div>
        
            <div style={styles.content}>
                <Typography style={{textAlign: 'center', color: "#444cea"}} gutterBottom variant="h4" component="h2">
                Upload Successful
                </Typography>
                <div style={{marginTop: 50, width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                    <ReactPlayer 
                    url={urlVideo} 
                    playing = {true}
                    />
                </div>
                {urlVideo}
                <div style={{marginTop: 50}}>
                    <Button
                        onClick={() => goTo(Home)}
                        style={styles.button}
                    >
                        Complete
                    </Button>
                </div>
            </div>
        </div>
       
    );
}

export default Visor;
