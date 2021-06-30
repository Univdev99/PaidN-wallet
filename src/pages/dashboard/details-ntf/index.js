import styles from "./styles.js";
// import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import NavBar from '../../../components/layout/NavBar/index';
import SignedMedia from '../signedMedia/index';

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
    },
}));

function NTFDetails() {
    const history = useHistory();
    const classes = useStyles();

    return (
        <>
            <NavBar />
            <div style={styles.content}>
                <Card className={classes.root}>
                    <Typography style={{textAlign: 'center'}} gutterBottom variant="h4" component="h2">
                        NTF Details
                    </Typography>
                    <div style={{marginTop: 20, width: '100%'}}>
                        <TextField id="outlined-search" style={{width: '100%'}} label="My Fee" type="number" variant="outlined" />
                    </div>
                    <div style={{marginTop: 20, width: '100%'}}>
                        <TextField id="outlined-search" style={{width: '100%'}} label="Ammount" type="number" variant="outlined" />
                    </div>
                    <div style={{marginTop: 20}}>
                        <button onClick={() => goTo(SignedMedia)} style={{ backgroundColor: "#62d7c5", height: 50, width: 150, border: '1px solid #62d7c5', color: 'white', borderRadius: 5, fontFamily: 'Roboto', fontSize: 16}}>
                            CONTINUE
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

export default NTFDetails;
