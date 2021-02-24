const express = require("express");
const app = express();

const pool = require("./dao/poolDb");
const userDao = require("./dao/userDao")
const user = require("./routes/user");

const PORT = process.env.PORT || 3000;
app.use(express.json());

app.use('/', user);


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
});


// get announcements test
app.get("/announcements", async (req, res) => {
    try {
        const announcements = await pool.query("SELECT * FROM announcements");
        res.json(announcements.rows);
    } catch (err) {
        console.log(err.message);
    }
})



app.listen(PORT, () => console.log(`Server started on port ${PORT}...`))

