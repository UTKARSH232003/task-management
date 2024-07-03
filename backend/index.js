import path from "path";
import express from 'express';
import dotenv from 'dotenv';
import connectToMongo from './database/connectToMongo.js';
import router from './routes/tasks.js';
import statusRoutes from './routes/status.js';
import cors from 'cors';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();
const frontendPath = path.resolve(__dirname, 'frontend','dist','frontend','browser' );

app.use(express.static(frontendPath));
app.use(cors());
app.use(express.json());

app.use('/tasks', router);
app.use('/status', statusRoutes);

app.get('/get', (req, res) => {
    res.send('<h2>THIS IS GET</h2>');
});
app.get("*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"))
})
app.listen(PORT, ()=>{
    connectToMongo();
    console.log(`App started on PORT-${PORT}`);
})
