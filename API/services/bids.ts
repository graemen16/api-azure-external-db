import { query } from "./db";
import { getOffset, emptyOrRows } from "../helper";
//import { config } from "../config-old";
import { Context } from "@azure/functions";
import { config } from "../config";

export async function getMultiple(context: Context, page = 1) {
  context.log("getMultiples - requesting data")
  const offset = getOffset(page, config.listPerPage);
  const queryText = `SELECT * FROM Bids LIMIT ${offset}, ${config.listPerPage}`
  context.log("getMultiples query : " + queryText)
  const rows = await query(queryText);
  // need to translate the response into the representation of the js object
  // Map Row to Bid

  type Row = {
    BidID: string;
    BidReference: string;
    Amount: number;
    CustomerName: string;
    CreatedAt: string;
    Status: string;
  };
  type Bid = {
    id: string;
    ref: string;
    amount: number;
    customer: {
      name: string;
    };
    createdAt: number;
    status: string;
  };

  var bids: Bid[] = [];
  if (Array.isArray(rows)) {
    rows.forEach((element) => {
      var row = element as Row;
      var bid: Bid = {
        id: row.BidID,
        ref: row.BidReference,
        amount: row.Amount,
        customer: { name: row.CustomerName },
        createdAt: Date.parse(row.CreatedAt),
        status: row.Status,
      };
      bids.push(bid);
      //console.log(bid);
    });
  }

  const data = emptyOrRows(bids);
  const meta = { page };

  return {
    data,
    //meta,
  };
}
