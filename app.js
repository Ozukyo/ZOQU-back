const express = require("express");
const app = express();

const pool = require("./dao/poolDb");
const userDao = require("./dao/userDao")
const cors = require('cors');
const user = require("./routes/user");
const category = require("./routes/category");
const announcement = require("./routes/announcement");

const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use('/', cors(),user);
app.use('/', cors(), category);
app.use('/', cors(), announcement);



// get announcements test
app.get("/announcements", async (req, res) => {
    try {
        const announcements = await pool.query("SELECT * FROM announcements");
        res.json(announcements.rows);
    } catch (err) {
        console.log(err.message);
    }
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}...`))
