import express from "express";
import dotenv from "dotenv";
import routers from "./src/router";

dotenv.config();
const app = express();
const port = process.env.PORT || 3003;

app.use(express.json());

for (const r of routers) {
  console.log(r.path);
  app.use(r.path, r.handler);
}

app.use((error, req, res) => {
  console.log(error);
});

app.listen(port, () => {
  console.log(`app running at localhost:${port}`);
});
