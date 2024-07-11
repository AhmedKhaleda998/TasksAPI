const router = require('express').Router();

const {
    createCategory,
    getCategories,
    updateCategory,
    deleteCategory
} = require('../controllers/category');

const authorize = require('../middlewares/authorization');

router.post('/', authorize, createCategory);
router.get('/', authorize, getCategories);
router.put('/:id', authorize, updateCategory);
router.delete('/:id', authorize, deleteCategory);

module.exports = router;
