import express from 'express';
import dotenv from 'dotenv';
import connectToMongo from './database/connectToMongo.js';
import router from './routes/tasks.js';
import statusRoutes from './routes/status.js';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use('/tasks', router);
app.use('/status', statusRoutes);

app.get('/get', (req, res) => {
    res.send('<h2>THIS IS GET</h2>');
});

app.listen(PORT, ()=>{
    connectToMongo();
    console.log(`App started on PORT-${PORT}`);
})