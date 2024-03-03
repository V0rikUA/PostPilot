const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { getUserToken } = require("./utils/getUserToken");
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

// app.post("/api/instagram", async (req, res) => {});

// app.post("/api/instagram/access_token", async (req, res) => {
//   console.log(req.body);
//   const { code } = req.body;
//   const params = {
//     clientId: process.env.INSTAGRAM_KEY,
//     clientSecret: process.env.INSTAGRAM_SECRET,
//     redirectUri: process.env.BASE_URL,
//     code,
//   };
//   const user = await getUserToken(params);

//   console.log(user);
//   res.sendStatus(200);
// });

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
