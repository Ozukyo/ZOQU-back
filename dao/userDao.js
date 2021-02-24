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
        const addUserQueryResult = await pool.query("INSERT INTO users  (user_email, user_password) VALUES ($1, $2) RETURNING user_id",
            [user.user_email, user.user_password]);

        console.log(addUserQueryResult.rows[0]);
        const userId = addUserQueryResult.rows[0].user_id;

        const addPersonalInfoQuery = await pool.query("INSERT INTO personal_information (user_id, personal_information_first_name, personal_information_last_name) VALUES ($1, $2, $3)", [userId,user.pi_firstname, user.pi_lastname])

    },

    deleteUserById: async (id) => {
        const queryResult = await pool.query("DELETE FROM users WHERE user_id = $1", [id]);
    },

    getLastUserId: async() => {
        const queryResult = await pool.query("SELECT user_id FROM users ORDER BY user_id DESC LIMIT 1");
        return queryResult.rows[0];
    }

}
module.exports = userDao;
