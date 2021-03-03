const announcementsDao = require("../dao/announcementsDao");

const announcementController = {
    getAnnouncements: async (req, res) => {
        try {
            const announcements = await announcementsDao.getAllAnnouncements();
            res.json(announcements);
        } catch (err) {
            console.error(err.message);
        }
    },
    getAnnouncementById: async (req, res) => {
        try {
            const id = req.params.id;
            const announcement = await announcementsDao.getAnnouncementById(id);
            res.json(announcement);
        } catch(err) {
            console.log(err.message);
        }
    },

    getAnnouncementByCategoryId: async (req, res) => {
        try {
            const id = req.params.categoryId;
            const announcements = await announcementsDao.getAnnouncementByCategoryId(id);
            res.json(announcements);
        } catch (err) {
            console.log(err.message);
        }
    },

    addAnnouncement: async (req, res) => {
        try {
            let announcementToAdd = {
                publishDate: req.body.publishDate,
                title: req.body.title,
                categoryId: req.body.categoryId,
                description: req.body.description,
                price: req.body.price,
                detailsId: req.body.detailsId,
                views: req.body.views,
                isActive: req.body.isActive,
            };
            const announcement = await announcementsDao.addAnnouncement(announcementToAdd);
            res.json(announcement);
        } catch (err) {
            console.log(err.message);
        }
    },
    deleteAnnouncementById: async(req, res) => {
        try {
            const {id} = req.params;
            const announcementToDelete = await announcementsDao.deleteAnnouncementById(id);
            res.send("Announcement successfully deleted!")
        } catch(err) {
            console.error(err.message);
        }
    }
}

module.exports = announcementController;
