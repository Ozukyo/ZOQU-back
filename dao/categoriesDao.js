const pool = require("./poolDb");

const categoriesDao = {
    getAllCategories: async () => {
        const queryResult = await pool.query("SELECT * from categories");
        // const queryResult = await pool.query("WITH RECURSIVE category_tree (id, category_name, parent) " +
        //     "AS (SELECT id, category_name, ARRAY[id] FROM categories WHERE parent_id IS NULL " +
        //     "UNION ALL SELECT categories.id, categories.category_name, parent || categories.id FROM category_tree " +
        //     "JOIN categories " +
        //     "ON categories.parent_id=category_tree.id " +
        //     "WHERE NOT categories.id = ANY(parent)) " +
        //     "SELECT * FROM category_tree ORDER BY id");
        return queryResult.rows;
    },
}

module.exports = categoriesDao;
