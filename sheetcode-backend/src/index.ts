import {app} from "./app";
import dotenv from "dotenv";

dotenv.config({
    path: "./.env",
})

app.get('/', (req, res) => {
    res.send('Hello, SheetCode!');
  });

app.listen(process.env.PORT || 5555, () => {
    console.log(`app is listening on the port ${5555}`);
});
