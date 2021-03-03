const pool = require("./poolDb");

const announcementsDao = {
    getAllAnnouncements: async() => {
        const queryResult = await pool.query("SELECT * from announcements");
        return queryResult.rows;
    }
}
