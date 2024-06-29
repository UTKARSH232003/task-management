import express from 'express';
import Task from '../models/Task.js'; // Adjust the path as necessary

const router = express.Router();

router.put('/change-status/:id', async (req, res) => {
    const taskId = req.params.id;
    const { status } = req.body;

    try {
        const updatedTask = await Task.findByIdAndUpdate(
            taskId,
            { $set: { status }},
            { new: true, runValidators: true }
        );

        if (!updatedTask) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

export default router;