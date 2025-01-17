const pool = require("./poolDb");

const announcementsDao = {
    getAllAnnouncements: async () => {
        const queryResult = await pool.query("SELECT * from announcements");
        return queryResult.rows;
    },
    getRandomAnnouncements: async (amount) => {
        const queryResult = await pool.query("SELECT * from announcements ORDER BY RANDOM() LIMIT $1",[amount]);
        return queryResult.rows;
    },

    getAnnouncementById: async (id) => {
        const queryResult = await pool.query("SELECT * from announcements WHERE id= $1", [id]);
        return queryResult.rows.shift();
    },

    getAnnouncementByCategoryId: async (categoryId) => {
        const queryResult = await pool.query("SELECT * from announcements WHERE category_id = $1", [categoryId]);
        return queryResult.rows;
    },

    getAllAnnouncementsByCategoryId: async (categoriesId) => {
        const queryResult = await pool.query(`SELECT * FROM announcements WHERE category_id IN ('${categoriesId.join("','")}')`);
        return queryResult.rows;
    },

    addAnnouncement: async (announcement) => {
        const queryResult = await pool.query("INSERT INTO announcements (announcement_publish_date, announcement_title" +
            ", announcement_category_id, announcement_description, announcement_price, announcement_details_id, " +
            "announcement_views, announcement_is_active) " +
            "VALUES($1, $2, $3, $4, $5, $6, $7, $8)",
            [announcement.publishDate, announcement.title, announcement.categoryId, announcement.description,
                announcement.price, announcement.detailsId, announcement.views, announcement.isActive]);
    },

    deleteAnnouncementById: async (id) => {
        const queryResult = await pool.query("DELETE FROM announcements WHERE id=$1", [id]);
    }

}

module.exports = announcementsDao;
