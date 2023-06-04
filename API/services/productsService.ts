import { CosmosClient } from "@azure/cosmos";
import {Context} from "@azure/functions"

// Set connection string from CONNECTION_STRING value in local.settings.json
const CONNECTION_STRING = process.env.CONNECTION_STRING;

const productService = {

  init() {
    
     //context.log('Con: ' + CONNECTION_STRING)
  
    try {
      this.client  = new CosmosClient(CONNECTION_STRING);
      this.database = this.client.database("tailwind");
      this.container = this.database.container("products");
    } catch (err) {
      console.log(' Error connectign to client, database or container : ' +err.message);
    }
  },
  async create(productToCreate) {
    const { resource } = await this.container.items.create(productToCreate);
    return resource;
  },
  async read(context: Context): Promise<string> {

    //this.init(context)
    context.log ("Client : " + this.client + "type " + typeof(this.client))
    const iterator = this.container.items.readAll();
    const { resources } = await iterator.fetchAll();
    return JSON.stringify(resources);
  },
  async update(product) {
    const { resource } = await this.container.item(
      product.id,
      product.brand.name,
    )
      .replace(product);
    return resource;
  },
  async delete(id, brandName) {
    const result = await this.container.item(id, brandName).delete();
  },
};

productService.init();

export default productService;
