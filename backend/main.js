const express = require("express");
const cors = require("cors");
require("dotenv").config();
const helmet = require("helmet");
const user = require("./routes/users.routes");
const instagram = require("./routes/instagram.routes");

const app = express();
const port = 3001;

app.use(cors());
app.options("*", cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// @ts-ignore
app.use(helmet());

app.use(user);
app.use(instagram);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
