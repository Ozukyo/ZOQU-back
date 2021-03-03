const pool = require("./poolDb");

const announcementsDao = {
    getAllAnnouncements: async() => {
        const queryResult = await pool.query("SELECT * from announcements");
        return queryResult.rows;
    },

    getAnnouncementById: async(id) => {
        const queryResult = await pool.query("SELECT * from announcements WHERE annoucement_id= $1", [id]);
        return queryResult.rows.shift();
    },

    getAnnouncementByCategoryId: async(categoryId) => {
        const queryResult = await pool.query("SELECT * from announcements WHERE announcement_category_id= $1", [categoryId]);
        return queryResult.rows;
    },

    addAnnouncement: async(announcement) => {
    const queryResult = await pool.query("INSERT INTO announcements (announcment_publish_date, announcment_title" +
        ", announcement_category_id, announcment_description, announcment_price, announcement_details_id, " +
        "announcement_views, announcement_is_active) " +
        "VALUES($1, $2, $3, $4, $5, $6, $7, $8)",
        [announcement.publishDate, announcement.title, announcement.categoryId, announcement.description,
            announcement.price, announcement.detailsId, announcement.views, announcement.isActive]);
    },

    deleteAnnouncementById: async(id) => {
        const queryResult = await pool.query("DELETE FROM announcements WHERE annoucement_id=$1", [id]);
    }

}


module.exports = announcementsDao;
