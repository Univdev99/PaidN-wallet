import styles from "./styles.js";
// import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

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
    input: {
        display: 'none',
    },
}));

function Done() {
    const history = useHistory();
    const classes = useStyles();

    return (
        <div style={styles.content}>
            <Card className={classes.root}>
                <Typography style={{textAlign: 'center'}} gutterBottom variant="h3" component="h2">
                    DONE!
                </Typography>
                <Typography style={{textAlign: 'center'}} gutterBottom variant="h5" component="h2">
                    Congratulations!
                </Typography>
                <div style={{marginTop: 20}}>
                    <button onClick={() => history.push('/transaction-details')} style={{ backgroundColor: "#62d7c5", height: 50, width: 150, border: '1px solid #62d7c5', color: 'white', borderRadius: 5, fontFamily: 'Roboto', fontSize: 16}}>
                        GO TO NEXT
                    </button>
                </div>
            </Card>
        </div>
    );
}

export default Done;
