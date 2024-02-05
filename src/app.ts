import express from "express";
import morgan from "morgan";
const app = express();

app.use(morgan("dev"));

app.set("port", process.env.PORT ?? 3000);

// public files
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Hello World! 🐎");
});

export default app;
