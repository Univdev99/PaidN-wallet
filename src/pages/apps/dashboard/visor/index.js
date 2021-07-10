import styles from "./styles.js";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ReactPlayer from "react-player";
import Home from "../home/index.js";
import { goTo } from "react-chrome-extension-router";

function Visor({ urlVideo }) {
  return (
    <div>
      <div style={styles.content}>
        <Typography
          style={{ textAlign: "center", color: "#444cea" }}
          gutterBottom
          variant="h4"
          component="h2"
        >
          Upload Successful
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
          <ReactPlayer url={urlVideo} playing={true} />
        </div>
        {urlVideo}
        <div style={{ marginTop: 50 }}>
          <Button onClick={() => goTo(Home)} style={styles.button}>
            Complete
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Visor;
