const pool = require("./poolDb");

const userDao = {
    getAllUsers: async () => {
        const queryResult = await pool.query("SELECT * FROM users");
        return queryResult.rows;
    },
    getUserById: async (id) => {
        const queryResult = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
        return queryResult.rows.shift();
    },
    getUserByEmail: async (email) => {
        const queryResult = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        return queryResult.rows.shift();
    },
    getUserDataByEmail: async(email) =>{
        const queryResult = await pool.query("SELECT users.id, users.email, personal_information.first_name, personal_information.last_name, " +
            "personal_information.phone_number, personal_information.web_page, personal_information.description FROM users " +
            "LEFT JOIN personal_information ON users.id = personal_information.user_id" +
            " WHERE users.email = $1", [email]);
        return queryResult.rows.shift();
    },
    getUserDataById: async(id) =>{
        const queryResult = await pool.query("SELECT users.id, users.email, personal_information.first_name, personal_information.last_name, " +
            "personal_information.phone_number, personal_information.web_page, personal_information.description FROM users " +
            "LEFT JOIN personal_information ON users.id = personal_information.user_id" +
            " WHERE users.id = $1", [id]);
        return queryResult.rows.shift();
    },

    addUser: async (user) => {
        const addUserQueryResult = await pool.query("INSERT INTO users  (email, password) VALUES ($1, $2) RETURNING id",
            [user.user_email, user.user_password]);
        // console.log(addUserQueryResult.rows.shift().id);
        const userId = addUserQueryResult.rows.shift().id;
        const addPersonalInfoQuery = await pool.query("INSERT INTO personal_information (user_id, first_name, last_name) VALUES ($1, $2, $3)", [userId, user.pi_firstname, user.pi_lastname])
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
