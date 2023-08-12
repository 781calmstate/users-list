import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import { User } from "./models/userModel";

const PORT = 4000;
const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));

app.route("/users").get(async (req, res) => {
  const foundUsers = await User.find();

  if (foundUsers.length) {
    res.send(foundUsers);
  } else {
    res.send("Cannot find any users.");
  }
});

app.get("/favicon.ico", function (req, res) {
  res.sendStatus(204);
});

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/usersDB");

  app.listen(PORT, () => {
    console.log("Running at port: " + PORT);
  });
}
