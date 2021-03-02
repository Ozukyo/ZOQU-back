const express = require("express");
const app = express();

const pool = require("./dao/poolDb");
const userDao = require("./dao/userDao")
const user = require("./routes/user");
const category = require("./routes/category");

const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use('/', user);
app.use('/', category);



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
