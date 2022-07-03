import express from 'express'
import dotenv from 'dotenv';
import * as hedera from './hedera';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.get('/', (req, res) => {
    res.send(hedera.hedera());
});

app.listen(port, () => {
    console.log(`[server]: Server is running at https://localhost:${port}`);
});