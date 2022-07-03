import { Client, AccountBalanceQuery, TransferTransaction, Hbar } from "@hashgraph/sdk";
import { error } from "console";

import dotenv from 'dotenv';

dotenv.config();


const myAccountId = process.env.MY_ACCOUNT_ID;
const myPrivateKey = process.env.MY_PRIVATE_KEY;


export async function hedera() {
    if (myAccountId == null ||
        myPrivateKey == null) {
        throw new Error("Environment variables myAccountId and myPrivateKey must be present");
    }

    // Create our connection to the Hedera network
    // The Hedera JS SDK makes this really easy!
    const client = Client.forTestnet();

    client.setOperator(myAccountId, myPrivateKey);

    try {
        const sendHbar = await new TransferTransaction()
            .addHbarTransfer(myAccountId, Hbar.fromTinybars(-10)) //Sending account
            .addHbarTransfer('0.0.47499760', Hbar.fromTinybars(10)) //Receiving account
            .execute(client);

        return sendHbar;

    }
    catch (e) {
        console.log(e);

        return 1;
    }

    // const queryCost = await new AccountBalanceQuery()
    //     .setAccountId(myAccountId)
    //     .getCost(client);

    // console.log("The cost of query is: " + queryCost);

    // return queryCost;
}

//hedera();

