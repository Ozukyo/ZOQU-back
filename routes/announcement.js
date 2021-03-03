const express = require("express");
const router = express.Router();
const announcementsDao = require("../dao/announcementsDao");

router.get("/announcements", async (req, res) => {
    try {
        const announcements = await announcementsDao.getAllAnnouncements();
        res.json(announcements);
    } catch (err) {
        console.log(err.message);
    }
});

router.get("/announcements/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const announcement = await announcementsDao.getAnnouncementById(id);
        res.json(announcement);
    } catch(err) {
        console.log(err.message);
    }
});

router.get("/announcements/category/:categoryId", async (req, res) => {
    try {
        const id = req.params.categoryId;
        const announcements = await announcementsDao.getAnnouncementByCategoryId(id);
        res.json(announcements);
    } catch (err) {
        console.log(err.message);
    }
});

router.post("/announcements", async (req, res) => {
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
});




module.exports = router;
