const Task = require('../models/task');
const Category = require('../models/category');

exports.createTask = async (req, res) => {
    const { title, type, body, listItems, shared, category } = req.body;
    try {
        const existingCategory = await Category.findById(category);
        if (!existingCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }
        const task = new Task({
            title,
            type,
            body: type === 'Text' ? body : undefined,
            listItems: type === 'List' ? listItems : undefined,
            shared,
            category: existingCategory._id,
            user: req.user._id
        });
        await task.save();
        res.status(201).json({ message: 'Task created successfully', task });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getTasks = async (req, res) => {
    const { category, shared } = req.query;
    const query = { user: req.user._id };
    if (category) query.category = category;
    if (shared) query.shared = shared;
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    try {
        const tasks = await Task.find(query).skip((page - 1) * limit).limit(limit);
        res.status(200).json({ message: 'Tasks fetched successfully', tasks });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, type, body, listItems, shared } = req.body;
    try {
        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        if (task.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Unauthorized' });
        }
        task.title = title || task.title;
        task.type = type || task.type;
        task.body = type === 'Text' ? body : task.body;
        task.listItems = type === 'List' ? listItems : task.listItems;
        task.shared = shared !== undefined ? shared : task.shared;
        await task.save();
        res.status(200).json({ message: 'Task updated successfully', task });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        const task = await Task.findByIdAndDelete(id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        if (task.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Unauthorized' });
        }
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};