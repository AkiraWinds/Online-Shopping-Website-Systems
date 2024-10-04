import * as fs from "fs/promises";

export class ModelManager<T extends {productId: ID_TYPE }, ID_TYPE>{
  filePath: string;

  constructor(filePath: string) {
    this.filePath = filePath;
    
  }

  async getAll(): Promise<T[]> {
    try {
      let itemsTxt = await fs.readFile(this.filePath, "utf8");
      let items = JSON.parse(itemsTxt) as T[];
      
      return items;
    } catch (err:any) {
      if (err.code === "ENOENT") {
        // file does not exits
        await this.save([]); // create a new file with ampty array
        return []; // return empty array
      } // // cannot handle this exception, so rethrow
      else throw err;
    }
  }
// save array of items to file
async save(items: T[] = []) {
  let itemsTxt = JSON.stringify(items);
  await fs.writeFile(this.filePath, itemsTxt);
}
}
