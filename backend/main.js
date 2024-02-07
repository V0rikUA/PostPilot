const express = require('express');
const { default: helmet } = require('helmet');
const app = express()
const port = 3001

app.use(cors());
app.use(helmet());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());



app.listen(port, () => console.log(`Example app listening on port ${port}!`))