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
});

router.post("/users", async (req, res) => {
    console.log(req.body.email);
    try {
        let usertoAdd = {
            user_email: req.body.email,
            user_password: req.body.password,
            pi_firstname: req.body.firstname,
            pi_lastname: req.body.lastname
        };
        const user = await userDao.addUser(usertoAdd);
        res.json(user);
    } catch (err) {
        console.log(err.message);
    }
});

router.get("/users/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const user = await pool.query("SELECT * FROM users WHERE user_id = $1", [id]);
        res.json(user.rows[0]);
    } catch (err) {
        console.log(err.message);
    }
});

// post user address
router.post("/users/:id/address", async (req, res) => {
    try {
        let address = {
            street: req.body.street,
            buildingNumber: req.body.buildingNumber,
            flatNumber: req.body.flatNumber,
            postalCode: req.body.postalCode,
            city: req.body.city,
            country: req.body.country
        };
        const id = req.params.id;
        const userAddress = await userDao.addUserAddressById(id, address);
        res.json(userAddress);
    } catch (err) {
        console.log(err.message);
    }
});

router.delete("/users/:id", async (req, res) => {
    try {
        const {id} = req.params
        await userDao.deleteUserById(id);
        res.send("User Deleted !")
    } catch (err) {
        console.log(err.message);
    }
});


//TODO: update user details(pass, email. name, address, phone etc.)
module.exports = router;
