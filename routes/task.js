const router = require('express').Router();
const {
    createTask,
    getTasks,
    updateTask,
    deleteTask
} = require('../controllers/task');

const authorize = require('../middlewares/authorization');

router.post('/', authorize, createTask);
router.get('/', authorize, getTasks);
router.put('/:id', authorize, updateTask);
router.delete('/:id', authorize, deleteTask);

module.exports = router;
