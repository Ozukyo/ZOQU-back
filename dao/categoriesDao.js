const pool = require("./poolDb");

const categoriesDao = {
    getAllCategories: async () => {
        const queryResult = await pool.query("SELECT * from categories");
        return queryResult.rows;
    },
    getAllMainCategories: async () => {
        const queryResult = await pool.query("SELECT * from categories WHERE parent_id is null ");
        return queryResult.rows;
    },
    getCategoryById: async (id) => {
        const queryResult = await pool.query("SELECT * from categories WHERE id = $1", [id]);
        return queryResult.rows;
    },
    getCategoriesByParentId: async(parentId) => {
        const queryResult = await pool.query("SELECT * from categories WHERE parent_id =$1", [parentId]);
        return queryResult.rows;
    }
}

module.exports = categoriesDao;
