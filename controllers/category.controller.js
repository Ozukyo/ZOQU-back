const categoriesDao = require('../dao/categoriesDao');

const categoryController = {
    getAllCategories: async(req, res) => {
        try {
            const categories = await categoriesDao.getAllCategories();
            res.json(categories);
        } catch (err) {
            console.err(err.message);
        }
    },
    getMainCategories: async(req, res) => {
        try {
            const categories = await categoriesDao.getAllMainCategories();
            res.json(categories);
        } catch (err) {
            console.err(err.message);
        }
    },
    getCategoriesById: async(req, res) => {
        try {
            const id = req.params.id;
            const categories = await categoriesDao.getCategoryById(id);
            res.json(categories);
        } catch (err) {
            console.err(err.message);
        }
    },
    getCategoriesByParentId: async(req, res) => {
        try {
            const parentId = req.params.parentId;
            const categories = await categoriesDao.getCategoriesByParentId(parentId);
            res.json(categories);
        } catch (err) {
            console.err(err.message);
        }
    }
}




module.exports = categoryController;
