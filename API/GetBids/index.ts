import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import productsService from "../services/productsService";
import { getMultiple } from "../services/bids";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  let response;
context.log("GetBids : starting")
  try {
    //let bids = await productsService.read(context);
    let bids = await getMultiple(context);
    response = { body: bids, status: 200 };
  } catch (err) {
    response = { body: 'Caught an error : ' + err.message, status: 500 };
  }

  context.res = response;
};

export default httpTrigger;