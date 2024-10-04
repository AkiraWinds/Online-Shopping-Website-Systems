import express = require("express");
import * as basketController from "./basketController";

export const basketRouter = express.Router();

basketRouter.post("/user/:userId/basket", basketController.createBasket); //Login and UserContext
basketRouter.get(":basketId", basketController.getBasket); // Cart
basketRouter.post("/basket/:basketId/items", basketController.addItemToBasket); //product list + details
basketRouter.put(
  "/basket/:basketId/items/:itemId",
  basketController.updateItemQuantity
); // cart
basketRouter.delete(
  "/basket/:basketId/items/:itemId",
  basketController.removeItemFromBasket
);
