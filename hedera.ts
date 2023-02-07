import {
  Client,
  AccountBalanceQuery,
  TransferTransaction,
  Hbar,
} from "@hashgraph/sdk";

import dotenv from "dotenv";

dotenv.config();

const myAccountId = process.env.MY_ACCOUNT_ID;
const myPrivateKey = process.env.MY_PRIVATE_KEY;
const otherAccountId = process.env.OTHER_ACCOUNT_ID;

export async function TransferHBARS(hbars: number) {
  if (myAccountId == null || myPrivateKey == null || otherAccountId == null) {
    throw new Error(
      "Environment variables myAccountId and myPrivateKey must be present"
    );
  }

  try {
    // Create our connection to the Hedera network
    // The Hedera JS SDK makes this really easy!
    const client = Client.forTestnet();

    client.setOperator(myAccountId, myPrivateKey);
    const sendHbar = await new TransferTransaction()
      .addHbarTransfer(myAccountId, Hbar.fromTinybars(-hbars)) //Sending account
      .addHbarTransfer(otherAccountId, Hbar.fromTinybars(hbars)) //Receiving account
      .execute(client);

    //Verify the transaction reached consensus
    const transactionReceipt = await sendHbar.getReceipt(client);
    console.log(
      "The transfer transaction from my account to the new account was: " +
        transactionReceipt.status.toString()
    );
    return 0;
    /* send our first hbar transfer! */

    // const transactionId = await new CryptoTransferTransaction()
    //     .addSender(myAccountId, 1)
    //     .addRecipient("0.0.47499760", 1)
    //     .setTransactionMemo("Hello future!")
    //     .execute(client);
    // /* get the receipt of this transfer */
  } catch (e) {
    console.log(e);

    return 1;
  }

  // const queryCost = await new AccountBalanceQuery()
  //     .setAccountId(myAccountId)
  //     .getCost(client);

  // console.log("The cost of query is: " + queryCost);

  // return queryCost;
}

export async function GetBalance() {
  if (myAccountId == null || myPrivateKey == null) {
    throw new Error(
      "Environment variables myAccountId and myPrivateKey must be present"
    );
  }
  const client = Client.forTestnet();

  // client.setOperator(myAccountId, myPrivateKey);
  // console.log('current account balance:', await client.getAccountBalance());

  //Check the new account's balance
  const balance = await new AccountBalanceQuery()
    .setAccountId(myAccountId)
    .execute(client);

  console.log(
    "The account balance after the transfer is: " +
      balance.hbars.toTinybars() +
      " tinybar."
  );
  return balance;
}

export async function MintNFT() {}