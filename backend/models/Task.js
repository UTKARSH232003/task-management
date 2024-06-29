import mongoose from 'mongoose';

// const historySchema = new mongoose.Schema({
//     field: String,
//     oldValue: mongoose.Schema.Types.Mixed,
//     newValue: mongoose.Schema.Types.Mixed,
//     changedAt: {
//         type: Date,
//         default: Date.now
//     },
// });

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
    // history: [historySchema]
});

const Task = mongoose.model("Tasks", taskSchema);
export default Task;