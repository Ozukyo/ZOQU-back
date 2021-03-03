const pool = require("./poolDb");

const userDao = {
    getAllUsers: async () => {
        const queryResult = await pool.query("SELECT * FROM users");
        return queryResult.rows;
    },
    getUserById: async (id) => {
        const queryResult = await pool.query("SELECT * FROM users WHERE user_id = $1", [id]);
        return queryResult.rows.shift();
    },

    addUser: async (user) => {
        const addUserQueryResult = await pool.query("INSERT INTO users  (user_email, user_password) VALUES ($1, $2) RETURNING user_id",
            [user.user_email, user.user_password]);
        console.log(addUserQueryResult.rows.shift());
        const userId = addUserQueryResult.rows.shift().user_id;
        const addPersonalInfoQuery = await pool.query("INSERT INTO personal_information (user_id, personal_information_first_name, personal_information_last_name) VALUES ($1, $2, $3)", [userId, user.pi_firstname, user.pi_lastname])
    },

    addUserAddressById: async (id, address) => {
        const addUserAddressQueryResult = await pool.query("INSERT INTO addresses (user_id, address_street, address_building_number, address_flat_number, address_postal_code, address_city, address_country)" +
            "VALUES ($1, $2, $3, $4, $5, $6, $7)", [id, address.street, address.buildingNumber, address.flatNumber, address.postalCode, address.city, address.country])
    },

    deleteUserById: async (id) => {
        const queryResult = await pool.query("DELETE FROM users WHERE user_id = $1", [id]);
    },

    getLastUserId: async () => {
        const queryResult = await pool.query("SELECT user_id FROM users ORDER BY user_id DESC LIMIT 1");
        return queryResult.rows.shift();
    }
}
module.exports = userDao;
