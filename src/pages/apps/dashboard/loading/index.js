import styles from "./styles.js";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import Unlock from "../unlock/index.js";
import { goTo } from "react-chrome-extension-router";

function Loading() {
  return (
    <div>
      <div style={styles.content}>
        <Typography
          style={{ textAlign: "center", color: "#444cea" }}
          gutterBottom
          variant="h4"
          component="h2"
        >
          Loading...
        </Typography>
        <Typography
          style={{ textAlign: "center", color: "#444cea" }}
          gutterBottom
          variant="h4"
          component="h2"
        >
          🐢
        </Typography>
        <div
          style={{
            marginTop: 50,
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </div>
        <div style={{ marginTop: 50 }}>
          <Button onClick={() => goTo(Unlock)} style={styles.button}>
            Enter
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Loading;
