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
            status,
            history: [{
                action: 'created',
                changes: `Task created with title '${title}', description '${description}', due date '${dueDate}', priority '${priority}', and status '${status}'.`
            }]
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

    try {
        let task = await Task.findById(taskId);

        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        let logMessage = '';
        if (updates.title !== undefined) {
            logMessage += `Title changed to '${updates.title}'. `;
        }
        if (updates.description !== undefined) {
            logMessage += `Description changed to '${updates.description}'. `;
        }
        if (updates.dueDate !== undefined) {
            logMessage += `Due date changed to '${updates.dueDate}'. `;
        }
        if (updates.priority !== undefined) {
            logMessage += `Priority changed to '${updates.priority}'. `;
        }
        if (updates.status !== undefined) {
            logMessage += `Status changed to '${updates.status}'. `;
        }

        task.history.push({
            action: 'edited',
            changes: logMessage
        });

        task = Object.assign(task, updates); 
        await task.save(); 

        res.status(200).json(task);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/history/:id', async (req, res) => {
    const taskId = req.params.id;

    try {
        const task = await Task.findById(taskId);

        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.status(200).json(task.history);
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