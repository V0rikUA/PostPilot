const express = require("express");
const cors = require("cors");
require("dotenv").config();
const helmet = require("helmet");
const user = require("./routes/users.routes");
const instagram = require("./routes/instagram.routes");
const centralEerrorHandler = require("./middleware/centralEerrorHandler");
const NotFoundError = require("./utils/notfounderror");
const { errors } = require("celebrate");

const app = express();
const { PORT = 3000 } = process.env;

app.use(cors());
app.options("*", cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// @ts-ignore
app.use(helmet());

app.use(user);
app.use(instagram);

app.use("/getappid", (req, res) => {
  res.status(200).send(process.env.APP_ID_GRAPH);
});

app.use("/", (req, res, next) => {
  next(new NotFoundError("Requested resource not found."));
});

app.use(errors());
app.use(centralEerrorHandler);

app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
