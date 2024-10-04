import { Request, Response } from "express";
import { Basket, User, Item } from "./basketModel";
import { v4 as uuidv4 } from "uuid";
import { ModelManager } from "./basketModelManager";
const BASKET_FILE = "./basket.json";
const USER_FILE = "./users.json";
const PRODUCT_FILE = "./products.json";

//create Basket
//basketRouter.post("/user/:userId/basket", basketController.createBasket);
export async function createBasket(req: Request, res: Response) {
  let modelMgr1 = new ModelManager(BASKET_FILE);
  let baskets: Basket[] = (await modelMgr1.getAll()) as Basket[];
  let modelMgr2 = new ModelManager(USER_FILE);
  let users: User[] = (await modelMgr2.getAll()) as User[];

  const { userId } = req.params;
  const { products } = req.body;
  const basketId = uuidv4();

  const user = users.find((user) => user.userId === userId); // search for a user in the users array where the userId matches
  if (user) {
    // create new basket object
    const newBasket: Basket = {
      basketId: basketId,
      userId: userId,
      items: products || [], // initialize products array
    };

    baskets.push(newBasket); // save the new basket
    await modelMgr1.save(baskets);
    res.status(201).json(newBasket);
  } else {
    res.status(404).json({ error: "User not found." });
  }
}

//get basket
//basketRouter.get(":basketId", basketController.getBasket); // Cart
export async function getBasket(req: Request, res: Response) {
  const { basketId } = req.params; // destructures basketId parameter from req.params object

  let modelMgr = new ModelManager(BASKET_FILE);
  let baskets: Basket[] = (await modelMgr.getAll()) as Basket[];
  const basket = baskets.find((basket) => basket.basketId === basketId); // search for a basket in the baskets array where the basketId matches
  if (basket) {
    res.status(200).json(basket);
  } else {
    res.status(404).json({ error: "Basket not found." });
  }
}

// add Item To Basket
// basketRouter.post("/basket/:basketId/items", basketController.addItemToBasket);
export async function addItemToBasket(req: Request, res: Response) {
  console.log(req.body, "request body "); //
  const { basketId } = req.params;
  const { productId, name, quantity, price, size, image } = req.body;
  const itemId = uuidv4(); // generate item id

  let modelMgr = new ModelManager(BASKET_FILE);
  let baskets: any[] = (await modelMgr.getAll()) as Basket[];
  const basketIndex = baskets.findIndex(
    (basket) => basket.basketId === basketId
  );
  // check if the basket exist and if so--
  if (basketIndex !== -1) {
    const products = await new ModelManager(PRODUCT_FILE).getAll();
    const product = products.find(
      (product: any) => product.productId === productId
    );

    //check if the product exists in the web data and if so--
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const itemIndex = baskets[basketIndex].items.findIndex(
      (item: any) => item.productId == productId && item.size == size
    );
    if (itemIndex !== -1) {
      baskets[basketIndex].items[itemIndex].quantity += quantity; //from productCard / details

      await modelMgr.save(baskets);
      return res.status(201).json(basketIndex);
    }

    //if item not in the cart yet
    const newItem = {
      itemId,
      productId,
      name,
      quantity,
      size,
      price,
      image,
    }; // creates a new item object
    baskets[basketIndex].items.push(newItem); // adds the new item to the items array of the basket
    res.status(201).json(newItem);
    await modelMgr.save(baskets);
  } else {
    res.status(404).json({ error: "Basket not found." });
  }
}

// update Item Quantity
//basketRouter.put("/basket/:basketId/items/:itemId",basketController.updateItemQuantity);
export async function updateItemQuantity(req: Request, res: Response) {
  const { basketId, itemId } = req.params;
  const { quantity } = req.body;

  let modelMgr = new ModelManager(BASKET_FILE);
  let baskets: Basket[] = (await modelMgr.getAll()) as Basket[];
  const basketIndex = baskets.findIndex(
    (basket) => basket.basketId === basketId
  );
  if (basketIndex !== -1) {
    const itemIndex = baskets[basketIndex].items.findIndex(
      (item) => item.itemId === itemId
    );
    // find the index of the item in the items array of the basket
    if (itemIndex !== -1) {
      baskets[basketIndex].items[itemIndex].quantity = quantity; // updates the quantity
      res.status(200).json(baskets[basketIndex].items[itemIndex]);
      await modelMgr.save(baskets);
    } else {
      res.status(404).json({ error: "Item not found" });
    }
  } else {
    res.status(404).json({ error: "Basket not found" });
  }
}

//remove item
//basketRouter.delete("/basket/:basketId/items/:itemId",basketController.removeItemFromBasket);
export async function removeItemFromBasket(req: Request, res: Response) {
  const { basketId, itemId } = req.params;

  let modelMgr = new ModelManager(BASKET_FILE);
  let baskets: Basket[] = (await modelMgr.getAll()) as Basket[];
  const basketIndex = baskets.findIndex(
    (basket) => basket.basketId === basketId
  );
  if (basketIndex !== -1) {
    const itemIndex = baskets[basketIndex].items.findIndex(
      (item) => item.itemId === itemId
    );
    if (itemIndex !== -1) {
      baskets[basketIndex].items.splice(itemIndex, 1); // removes the item at index itemIndex from the items array of the basket
      res.status(204).send();
      await modelMgr.save(baskets);
    } else {
      res.status(404).json({ error: "Item not found" });
    }
  } else {
    res.status(404).json({ error: "Basket not found" });
  }
}
