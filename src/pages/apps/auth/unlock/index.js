import styles from "./styles.js";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { goTo } from "react-chrome-extension-router";
import Home from "../../dashboard/home/index.js";

function Unlock({ array }) {
  return (
    <div>
      <div style={styles.content}>
        <Typography
          style={{ textAlign: "center", color: "#444cea" }}
          gutterBottom
          variant="h4"
          component="h2"
        >
          🎥
        </Typography>
        <div style={{ marginTop: 20, width: "100%" }}>
          <TextField
            id="filled-read-only-input"
            label="Password"
            style={{ width: "100%" }}
            variant="filled"
          />
        </div>
        <div style={{ marginTop: 20 }}>
          <Button onClick={() => goTo(Home)} style={styles.button}>
            Unlock
          </Button>
        </div>
        <div style={{ marginTop: 5, width: "60%" }}>
          <hr />
        </div>
        <div style={{ marginTop: 5, width: "60%" }}>
          <Typography
            style={{ textAlign: "center", color: "#afafaf" }}
            gutterBottom
            variant="h6"
            component="h6"
          >
            Import wallet using a{" "}
            <span style={{ color: "#444cea" }} onClick={() => goTo()}>
              Seed Phrase
            </span>
          </Typography>
        </div>
      </div>
    </div>
  );
}

export default Unlock;
