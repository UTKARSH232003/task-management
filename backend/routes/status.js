import express from 'express';
import Task from '../models/Task.js';

const router = express.Router();

router.put('/change-status/:id', async (req, res) => {
    const taskId = req.params.id;
    const { status } = req.body;
    
    try {
        const task = await Task.findById(taskId);

        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        task.history.push({
            event: 'Status Changed',
            timestamp: new Date(),
            changes: { status: task.status, newStatus: status },
            action: 'status_changed'
        });

        task.status = status;

        const updatedTask = await task.save();

        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

export default router;
