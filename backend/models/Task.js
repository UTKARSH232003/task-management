import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    },
    priority: {
        type: String,
        required: true,
        enum: ["low", "medium", "high"]
    },
    status: {
        type: String,
        required: true,
        default: "to-do",
        enum: ["to-do", "in-progress", "completed"]
    },
});

const Task = mongoose.model("Tasks", taskSchema);
export default Task;