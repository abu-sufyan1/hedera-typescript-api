import express from 'express'
import dotenv from 'dotenv';
import * as hedera from './hedera';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.get('/test', async (req, res) => {
    const result = await hedera.Transfer10HBARS();
    res.send(result);
});

app.listen(port, () => {
    console.log(`[server]: Server is running at https://localhost:${port}`);
});