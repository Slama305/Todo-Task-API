const {validationResult} = require('express-validator');
const Task = require('../models/task.model');


let getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({userId: req.params.userId});
        res.json(tasks);
    } catch (error) {
        console.error('Get tasks error:', error);
        res.status(500).json({message: 'Server error', error});
    }
};

let getCompletedTasks = async (req, res) => {
    try {
        const tasks = await Task.find({userId: req.params.userId, status: 'Completed'});
        res.json(tasks);
    } catch (error) {
        console.error('Get completed tasks error:', error);
        res.status(500).json({message: 'Server error', error});
    }
}

let getIncompleteTasks = async (req, res) => {
    try {
        const tasks = await Task.find({userId: req.params.userId, status: 'Pending'});
        res.json(tasks);
    } catch (error) {
        console.error('Get incomplete tasks error:', error);
        res.status(500).json({message: 'Server error', error});
    }
};

let createTask = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const task = new Task(req.body);
        await task.save();
        res.status(201).json({ message: 'Task created successfully', task });
    } catch (error) {
        console.error('Create task error:', error);
        res.status(500).json({ message: 'Server error', error });
    }
}

let updateTask = async (req, res) => {
    const id = req.params.taskId;
    const updates = req.body;
    try {
        const task = await Task.findByIdAndUpdate(id, updates, { new: true });
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json({ message: 'Task updated successfully', task });
    }
    catch (error) {
        console.error('Update task error:', error);
        res.status(500).json({ message: 'Server error', error });
    }
}

let deleteTask = async (req, res) => {
    const id = req.params.taskId;
    try {
        const task = await Task.findByIdAndDelete(id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        console.error('Delete task error:', error);
        res.status(500).json({ message: 'Server error', error });
    }
}

module.exports = {
    getAllTasks,
    getCompletedTasks,
    getIncompleteTasks,
    createTask,
    updateTask,
    deleteTask
};

