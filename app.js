const express = require("express");
const app = express();

const pool = require("./dao/poolDb");
const userDao = require("./dao/userDao")
const user = require("./routes/user");

const PORT = process.env.PORT || 3000;
app.use(express.json());

app.use('/', user);

app.get("/users/:id",async (req, res) =>{
    const {id} = req.params;
    try{
       const users = await userDao.getUserById(id);
       res.json(users)
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
