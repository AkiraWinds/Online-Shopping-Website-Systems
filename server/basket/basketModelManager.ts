import * as fs from "fs/promises";

export class ModelManager<T> {
  filePath: string;

  constructor(filePath: string) {
    this.filePath = filePath;
  }

  async getAll(): Promise<T[]> {
    try {
      let itemsTxt = await fs.readFile(this.filePath, "utf8");
      let items = JSON.parse(itemsTxt) as T[];
      return items;
    } catch (err: any) {
      if (err.code === "ENOENT") {
        await this.save([]);
        return [];
      } else throw err;
    }
  }
  async save(items: T[] = []) {
    let itemsTxt = JSON.stringify(items);
    await fs.writeFile(this.filePath, itemsTxt);
  }
}
