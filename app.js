const express = require("express");
const app = express();

const dotenv = require('dotenv');
const cors = require('cors');
const router = require("./routes/routing");

dotenv.config()
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use('/',router);



app.listen(PORT, () => console.log(`Server started on port ${PORT}...`))
