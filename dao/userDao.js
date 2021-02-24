const pool = require("./poolDb");

const userDao = {
    getAllUsers: async () => {
        const queryResult = await pool.query("SELECT * FROM users");
        return queryResult.rows;
    },
    getUserById: async (id) => {
        const queryResult = await pool.query("SELECT * FROM users WHERE user_id = $1", [id]);
        return queryResult.rows[0];
    },

    addUser: async (user) => {
        const queryResult = await pool.query("INSERT INTO users  (user_email, user_password, user_personal_information_id, user_adress_id) VALUES ($1, $2, $3, $4)",
            [user.user_email, user.user_password, user.user_personal_information_id, user.user_adress_id])
    },

    deleteUserById: async (id) => {
        const queryResult = await pool.query("DELETE FROM users WHERE user_id = $1", [id]);
    },

}
module.exports = userDao;
