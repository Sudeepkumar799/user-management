import "dotenv/config";
import env from "./utils/validateEnv";
import mongoose from "mongoose";
import app from "./app";

const port = env.PORT;

mongoose
  .connect(env.MONGO_DB_CONNECTION_STRING)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(port, () => {
      console.log(`Listening on http://localhost:${port}`);
    });
  })
  .catch((err) => console.log(err));
