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




app.post("/users", async (req, res) => {
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
})


app.get("/id",async (req, res) =>{
    try{
       const id = await userDao.getLastUserId();
       res.json(id)
    }catch(err){
        console.log(err.message);
    }
})
app.post("/users/:id/address", async (req, res) => {
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

app.get("/id", async (req, res) => {
    try {
        const id = await userDao.getLastUserId();
        res.json(id)
    } catch (err) {
        console.log(err.message);
    }
});

// get announcements test
app.get("/announcements", async (req, res) => {
    try {
        const announcements = await pool.query("SELECT * FROM announcements");
        res.json(announcements.rows);
    } catch (err) {
        console.log(err.message);
    }
});

app.delete("/users/:id", async (req, res) => {
    try {
        const {id} = req.params
        await userDao.deleteUserById(id);
        res.send("User Deleted !")
    } catch (err) {
        console.log(err.message);
    }
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}...`))
