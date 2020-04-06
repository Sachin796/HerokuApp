const express = require("express");
const dbConnect = require("./config/dbConnect");
const config = require("config");
const users = require("./routes/users");
const contacts = require("./routes/contacts");
const notes = require("./routes/notes");
const auth = require("./routes/auth");
require("dotenv").config();
/*******************************************/
const app = express();
app.use(express.json());

dbConnect();

// this route will be called for signup
app.use("/api/users", users);

// this route will be called for login
app.use("/api/auth", auth);

// this route will be called for adding contact to specified user which are in token
app.use("/api/contacts", contacts);

// this route will be called for any notes
app.use("/api/notes", notes);

app.listen(process.env.PORT || config.get("PORT"), () =>
  console.log(`Digital Diary lift off on port ${config.get("PORT")}!`)
);
