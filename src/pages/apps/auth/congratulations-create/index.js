import styles from "./styles.js";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Unlock from "../unlock/index.js";
import { goTo } from "react-chrome-extension-router";

function Congratulations() {
  return (
    <div>
      <div style={styles.content}>
        <Typography
          style={{ textAlign: "center", color: "#444cea" }}
          gutterBottom
          variant="h4"
          component="h2"
        >
          Congratulations! 🎉
        </Typography>
        <div style={{ marginTop: 50, width: "100%" }}>
          <Typography
            style={{ textAlign: "center", color: "#afafaf" }}
            gutterBottom
            variant="h6"
            component="h6"
          >
            !!!
          </Typography>
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

export default Congratulations;
