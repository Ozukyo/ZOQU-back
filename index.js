const express = require("express");
const app = express();
const pool = require("./db");

const PORT = process.env.PORT || 3000;
app.use(express.json());


// get announcements test
app.get("/announcements", async (req, res) => {
    try {
        const announcements = await pool.query("SELECT * FROM announcements");
        res.json(announcements.rows);
    } catch (err) {
        console.log(err.message);
    }
})




app.listen(PORT, () => console.log(`server started on port ${PORT}...`))
