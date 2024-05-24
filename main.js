import express from "express";
import router from "./routes/user.router.js";
import "dotenv/config";

const PORT = process.env.PORT || 4000;

const app = express();

app.use(express.json());
app.use("/api", router);

async function startApp() {
  try {
    app.listen(PORT, () => console.log(`Server working from ${PORT} port`));
  } catch (error) {
    console.log(error);
  }
}
startApp();
