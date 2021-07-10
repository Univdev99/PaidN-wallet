import styles from "./styles.js";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { goTo } from "react-chrome-extension-router";
import Upload from "../upload/index.js";

function Home() {
  return (
    <div>
      <div style={styles.content}>
        <Typography
          style={{ textAlign: "center", color: "#444cea" }}
          gutterBottom
          variant="h4"
          component="h2"
        >
          🔲
        </Typography>
        <Typography
          style={{ textAlign: "center", color: "#444cea" }}
          gutterBottom
          variant="h4"
          component="h2"
        >
          Account Name
        </Typography>
        <div
          style={{
            borderBottom: "solid #000 1px",
            marginTop: 20,
            padding: 40,
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <Button
            // onClick={() => goTo(ImportWallet)}
            style={styles.button_emoji}
          >
            🎞
          </Button>
          <Button
            // onClick={() => goTo(ImportWallet)}
            style={styles.button_emoji}
          >
            💰
          </Button>
          <Button
            // onClick={() => goTo(ImportWallet)}
            style={styles.button_emoji}
          >
            ⚙
          </Button>
        </div>
        <div style={{ marginTop: 20 }}>
          <Button
            // onClick={() => goTo(ImportWallet)}
            style={styles.button}
          >
            Connect
          </Button>
        </div>
        <div style={{ marginTop: 20 }}>
          <Button onClick={() => goTo(Upload)} style={styles.button}>
            Upload Content
          </Button>
        </div>
        <div style={{ marginTop: 40 }}>
          <Typography
            style={{ textAlign: "center", color: "#adadad" }}
            gutterBottom
            variant="h6"
            component="h6"
          >
            Need any help?{" "}
            <span style={{ color: "#444cea", fontWeight: "bold" }}>
              Support
            </span>
          </Typography>
        </div>
      </div>
    </div>
  );
}

export default Home;
