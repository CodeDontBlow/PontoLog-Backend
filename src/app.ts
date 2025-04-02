import express from "express";
import router from "./routes/exp";
import cors from "cors";
import "./database";
import { corsUrl } from "./config";
import { port } from "./config";

const app = express();
app.use(cors({ origin: corsUrl, optionsSuccessStatus: 200 }));
app.use(router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
