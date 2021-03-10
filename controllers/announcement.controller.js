const announcementsDao = require("../dao/announcementsDao");
const categoriesDao = require("../dao/categoriesDao");

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
        } catch (err) {
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
    deleteAnnouncementById: async (req, res) => {
        try {
            const {id} = req.params;
            const announcementToDelete = await announcementsDao.deleteAnnouncementById(id);
            res.send("Announcement successfully deleted!")
        } catch (err) {
            console.error(err.message);
        }
    },
    getAllAnnouncementsByAllCategories: async (req, res) => {
        try {
            const {id} = req.params;
            const categoriesList = await categoriesDao.getCategoriesByParentId(id)
                .then(result2lvl => {
                    const internalList = [+id];
                    // console.log(result2lvl);
                    result2lvl.forEach(item => {
                        internalList.push(item.id);
                        categoriesDao.getCategoriesByParentId(item.id).then(result3lvl => {
                            // console.log(result3lvl);
                            result3lvl.forEach(item3lvl => {
                                // console.log(item3lvl);
                                internalList.push(item3lvl.id);
                                console.log(categoriesList);
                            })
                        })
                    });
                    return internalList;
                })
            res.send(categoriesList);
        } catch (error) {
            console.log(error.message)
        }
    }
}

// pobrac produkty wszystkie w tej liscie

//select * from products where category_id IN [1,2,3]

module.exports = announcementController;
