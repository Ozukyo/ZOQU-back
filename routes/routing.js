const express = require("express");
const router = express.Router();
const announcementController = require('../controllers/announcement.controller');
const categoriesController = require('../controllers/category.controller');
const userController = require('../controllers/user.controller');

router.get("/announcements", announcementController.getAnnouncements);
router.get("/announcements/:id", announcementController.getAnnouncementById);
router.get("/announcements/category/:categoryId",  announcementController.getAnnouncementByCategoryId);
router.post("/announcements", announcementController.addAnnouncement);

router.get("/categories", categoriesController.getAllCategories)
router.get("/main-categories", categoriesController.getMainCategories)
router.get("/categories/:id", categoriesController.getCategoriesById)
router.get("/categories/:parentId/subcategories", categoriesController.getCategoriesByParentId)

router.get("/users", userController.getAllUsers);
router.post("/users", userController.addUser);
router.get("/users/:id", userController.getUserById);
router.post("/users/:id/address", userController.addUserAddressById);
router.delete("/users/:id", userController.deleteUserById);



module.exports = router;
