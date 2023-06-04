import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { helloText } from "../services/serving-hello";


const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  context.log("just saying hello...")
  //context.log("req.body: "+ JSON.stringify(req.body))
  context.log("req.body: "+ JSON.stringify(req.query))
  context.log("test: "+req.query.test)
  const mode = req.query.test
  let body  = await helloText(context, mode);
  //let body = "hello"
  let response = { body: body, status: 200 };;

  context.res = response;
};

export default httpTrigger;