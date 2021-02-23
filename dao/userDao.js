const pool = require("./poolDb");

const userDao = {
    getAllUsers: async () => {
        const queryResult = await pool.query("SELECT * FROM users");
        return queryResult.rows;
    },
    getUser: async (id) => {
        const queryResult = await pool.query("SELECT * FROM users WHERE user_id = $1", [id]);
        return queryResult.rows[0];
    }
}
module.exports = userDao;
