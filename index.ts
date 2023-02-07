import express from 'express'
import dotenv from 'dotenv';
import * as hedera from './hedera';

dotenv.config();

const app = express();
const port = process.env.PORT;

//Transfer some HBARS to other account.

app.get('/transferHbars', async (req, res) => {
    let hBarCount = req.query.hbarCount ? +req.query.hbarCount : 0;
    const result = await hedera.TransferHBARS(hBarCount);
    result === 0 ? res.sendStatus(200) : res.sendStatus(500);
});

//GET HBars Count in your wallet.

app.get('/balance', async (req, res) => {
    const balance = await hedera.GetBalance();
    res.send(balance);
})





app.listen(port, () => {
    console.log(`[server]: Server is running at https://localhost:${port}`);
});