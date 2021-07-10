import styles from "./styles.js";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import ViewDetails from "../view-details/index.js";
import { goTo } from "react-chrome-extension-router";

function Upload() {
  return (
    <div>
      <div style={styles.content}>
        <Typography
          style={{ textAlign: "center", color: "#444cea" }}
          gutterBottom
          variant="h4"
          component="h2"
        >
          Video Details
        </Typography>
        <div style={{ marginTop: 50, width: "100%" }}>
          <TextField
            id="filled-read-only-input"
            label="ID"
            disabled
            style={{ width: "100%" }}
            variant="filled"
          />
        </div>
        <div style={{ marginTop: 20, width: "100%" }}>
          <TextField
            id="filled-read-only-input"
            label="Link"
            disabled
            style={{ width: "100%" }}
            variant="filled"
          />
        </div>
        <div style={{ marginTop: 20, width: "100%" }}>
          <TextField
            id="filled-read-only-input"
            label="RX Link"
            disabled
            style={{ width: "100%" }}
            variant="filled"
          />
        </div>
        <div style={{ marginTop: 80 }}>
          <Button onClick={() => goTo(ViewDetails)} style={styles.button}>
            Upload
          </Button>
        </div>
        <div style={{ marginTop: 40 }}>
          <Typography
            style={{ textAlign: "center", color: "#adadad" }}
            gutterBottom
            variant="h7"
            component="h7"
          >
            Need help?{" "}
            <span style={{ color: "#444cea", fontWeight: "bold" }}>
              NFT Guides
            </span>
          </Typography>
        </div>
      </div>
    </div>
  );
}

export default Upload;
