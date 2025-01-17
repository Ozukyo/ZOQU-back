const announcementsDao = require('../dao/announcementsDao');
const categoriesDao = require('../dao/categoriesDao');

const announcementController = {
    getAnnouncements: async (req, res) => {
        try {
            const announcements = await announcementsDao.getAllAnnouncements();
            res.json(announcements);
        } catch (err) {
            console.error(err.message);
        }
    },
    getRandomAnnouncements: async (req, res) => {
        try {
            const randomAnnouncements = await announcementsDao.getRandomAnnouncements(6);
            res.json(randomAnnouncements);
        } catch (err) {
            console.log(err.message);
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
            const secondCategoriesList = await categoriesDao.getCategoriesByParentId(id)
                .then(data => data.map(category => category.id));
            let arrOfCategoriesId = [+id, ...secondCategoriesList]

            for (categoryId of secondCategoriesList) {
                const thirdCategoriesList1 = await categoriesDao.getCategoriesByParentId(categoryId)
                    .then(data => data.map(category => category.id));
                arrOfCategoriesId.push(...thirdCategoriesList1)
            }

            const announcements = await announcementsDao.getAllAnnouncementsByCategoryId(arrOfCategoriesId);
            res.send(announcements);
        } catch (error) {
            console.log(error.message);
        }
        // try {
        //     const {id} = req.params;
        //     const categoriesList = await categoriesDao.getCategoriesByParentId(id)
        //         .then(secondLvlCategories => {
        //             const internalList = [+id];
        //             secondLvlCategories.forEach(category => {
        //                 internalList.push(category.id);
        //                 categoriesDao.getCategoriesByParentId(category.id).then(thirdLvlCategories => {
        //                     thirdLvlCategories.forEach(subcategory => {
        //                         internalList.push(subcategory.id);
        //                     })
        //                 })
        //             });
        //             return internalList;
        //         })
        //     setTimeout(() => {
        //         res.send(categoriesList);
        //     }, 1000);
        // } catch (error) {
        //     console.log(error.message)
        // }
    }
}
 module.exports = announcementController;
