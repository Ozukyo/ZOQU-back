const express = require("express");
const router = express.Router();
const announcementController = require('../controllers/announcement.controller');
const categoriesController = require('../controllers/category.controller');
const userController = require('../controllers/user.controller');
const loginController = require('../controllers/login.controller');


// want to get autenticate? -put  loginController.autenticateToken between path and method
router.get("/announcements", announcementController.getAnnouncements);
router.get("/announcements/:id", announcementController.getAnnouncementById);
router.get("/announcements/category/:categoryId",  announcementController.getAnnouncementByCategoryId);
router.post("/announcements", announcementController.addAnnouncement);
router.get("/announcements/allByCategory/:id", announcementController.getAllAnnouncementsByAllCategories);

router.get("/categories", categoriesController.getAllCategories)
router.get("/main-categories", categoriesController.getMainCategories)
router.get("/categories/:id", categoriesController.getCategoriesById)
router.get("/categories/:parentId/subcategories", categoriesController.getCategoriesByParentId)

router.get("/users", userController.getAllUsers);
router.post("/users", userController.addUser);
router.get("/users/:id", userController.getUserById);
router.post("/users/:id/address", userController.addUserAddressById);
router.delete("/users/:id", userController.deleteUserById);
router.get("/users/email/:email",userController.getUserDataByEmail);
router.post("/login",loginController.login);


module.exports = router;
