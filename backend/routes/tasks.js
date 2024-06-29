import express from 'express'
import Task from '../models/Task.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/add', async(req, res) => {
    const { title, description, dueDate, priority, status } = req.body;
    try {
        const newTask = new Task({
            title,
            description,
            dueDate,
            priority,
            status
        });
        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.put('/update/:id', async(req, res) => {
    const taskId = req.params.id;
    const updates = req.body;

    // Parse the dueDate if it's provided in the updates
    if (updates.dueDate) {
        updates.dueDate = new Date(updates.dueDate);
    }

    try {
        const updatedTask = await Task.findByIdAndUpdate(
            taskId,
            { $set: updates },
            { new: true, runValidators: true } // Return the updated document and run validators
        );

        if (!updatedTask) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.delete('/delete/:id', async(req, res) => {
    const taskId = req.params.id;
    try {
        const deletedTask = await Task.findByIdAndDelete(taskId);

        if (!deletedTask) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.status(200).json({ message: `Task ${taskId} deleted` });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

export default router;