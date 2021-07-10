import styles from "./styles.js";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

function Done() {
  return (
    <div>
      <div style={styles.content}>
        <Typography
          style={{ textAlign: "center", color: "#444cea" }}
          gutterBottom
          variant="h4"
          component="h2"
        >
          All Done!
        </Typography>
        <Typography
          style={{ textAlign: "center", color: "#444cea" }}
          gutterBottom
          variant="h4"
          component="h2"
        >
          🎉
        </Typography>
        <Typography
          style={{ textAlign: "center", color: "#444cea" }}
          gutterBottom
          variant="h7"
          component="h7"
        >
          Text...
        </Typography>
        <div style={{ marginTop: 50 }}>
          <Button
            // onClick={() => goTo(Unlock)}
            style={styles.button}
          >
            Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Done;
