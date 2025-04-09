import {app} from "./app";
import dotenv from "dotenv";
import connectDB from "./db/db";

dotenv.config({
    path: "./.env",
})

app.get('/', (req, res) => {
    res.send('Hello, SheetCode!');
  });

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 5555, () => {
      console.log(`App is listening on port ${process.env.PORT}`);
    });
    app.on("error", (error) => {
      console.log("ERROR: ", error);
    });
  })
  .catch((err) => {
    console.log("MONGO DB connection failed!!!", err);
  });