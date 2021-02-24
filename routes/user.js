const express = require("express");
const router = express.Router();
const pool = require("../dao/poolDb");

router.get("/users", async (req, res) => {
    try {
        const users = await pool.query("SELECT * FROM users");
        res.json(users.rows);
    } catch (err) {
        console.log(err.message);
    }
})
router.get("/users/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const user = await pool.query("SELECT * FROM users WHERE user_id = $1", [id]);
        res.json(user.rows[0]);
    } catch (err) {
        console.log(err.message);
    }
})

module.exports = router ;
