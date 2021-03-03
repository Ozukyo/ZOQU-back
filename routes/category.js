const express = require("express");
const router = express.Router();
const categoriesDao = require("../dao/categoriesDao");


router.get("/categories", async(req, res) => {
    try {
        const categories = await categoriesDao.getAllCategories();
        res.json(categories);
    } catch (err) {
        console.log(err.message);
    }
})

router.get("/main-categories", async(req, res) => {
    try {
        const categories = await categoriesDao.getAllMainCategories();
        res.json(categories);
    } catch (err) {
        console.log(err.message);
    }
})

router.get("/categories/:id", async(req, res) => {
    try {
        const id = req.params.id;
        const categories = await categoriesDao.getCategoryById(id);
        res.json(categories);
    } catch (err) {
        console.log(err.message);
    }
})

//
router.get("/categories/:parentId/subcategories", async(req, res) => {
    try {
        const parentId = req.params.parentId;
        const categories = await categoriesDao.getCategoriesByParentId(parentId);
        res.json(categories);
    } catch (err) {
        console.log(err.message);
    }
})

module.exports = router;
