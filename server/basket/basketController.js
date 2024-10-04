"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.removeItemFromBasket = exports.updateItemQuantity = exports.addItemToBasket = exports.getBasket = exports.createBasket = void 0;
var uuid_1 = require("uuid");
var basketModelManager_1 = require("./basketModelManager");
var BASKET_FILE = "./basket.json";
var USER_FILE = "./users.json";
var PRODUCT_FILE = "./products.json";
function createBasket(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var modelMgr1, baskets, modelMgr2, users, userId, products, basketId, user, newBasket;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    modelMgr1 = new basketModelManager_1.ModelManager(BASKET_FILE);
                    return [4 /*yield*/, modelMgr1.getAll()];
                case 1:
                    baskets = (_a.sent());
                    modelMgr2 = new basketModelManager_1.ModelManager(USER_FILE);
                    return [4 /*yield*/, modelMgr2.getAll()];
                case 2:
                    users = (_a.sent());
                    userId = req.params.userId;
                    products = req.body.products;
                    basketId = (0, uuid_1.v4)();
                    user = users.find(function (user) { return user.userId === userId; });
                    if (!user) return [3 /*break*/, 4];
                    newBasket = {
                        basketId: basketId,
                        userId: userId,
                        items: products || []
                    };
                    baskets.push(newBasket); // save the new basket
                    return [4 /*yield*/, modelMgr1.save(baskets)];
                case 3:
                    _a.sent();
                    res.status(201).json(newBasket);
                    return [3 /*break*/, 5];
                case 4:
                    res.status(404).json({ error: "User not found." });
                    _a.label = 5;
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.createBasket = createBasket;
function getBasket(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var basketId, modelMgr, baskets, basket;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    basketId = req.params.basketId;
                    modelMgr = new basketModelManager_1.ModelManager(BASKET_FILE);
                    return [4 /*yield*/, modelMgr.getAll()];
                case 1:
                    baskets = (_a.sent());
                    basket = baskets.find(function (basket) { return basket.basketId === basketId; });
                    if (basket) {
                        res.status(200).json(basket);
                    }
                    else {
                        res.status(404).json({ error: "Basket not found." });
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.getBasket = getBasket;
function addItemToBasket(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var basketId, _a, productId, name, quantity, price, size, image, itemId, modelMgr, baskets, basketIndex, products, product, itemIndex, newItem;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    console.log(req.body, "//"); //
                    basketId = req.params.basketId;
                    _a = req.body, productId = _a.productId, name = _a.name, quantity = _a.quantity, price = _a.price, size = _a.size, image = _a.image;
                    itemId = (0, uuid_1.v4)();
                    modelMgr = new basketModelManager_1.ModelManager(BASKET_FILE);
                    return [4 /*yield*/, modelMgr.getAll()];
                case 1:
                    baskets = (_b.sent());
                    basketIndex = baskets.findIndex(function (basket) { return basket.basketId === basketId; });
                    if (!(basketIndex !== -1)) return [3 /*break*/, 6];
                    return [4 /*yield*/, new basketModelManager_1.ModelManager(PRODUCT_FILE).getAll()];
                case 2:
                    products = _b.sent();
                    product = products.find(function (product) { return product.productId === productId; });
                    if (!product) {
                        return [2 /*return*/, res.status(404).json({ error: "Product not found" })];
                    }
                    itemIndex = baskets[basketIndex].items.findIndex(function (item) { return item.productId == productId && item.size == size; });
                    if (!(itemIndex !== -1)) return [3 /*break*/, 4];
                    baskets[basketIndex].items[itemIndex].quantity += quantity;
                    return [4 /*yield*/, modelMgr.save(baskets)];
                case 3:
                    _b.sent();
                    return [2 /*return*/, res.status(201).json(basketIndex)];
                case 4:
                    newItem = {
                        itemId: itemId,
                        productId: productId,
                        name: name,
                        quantity: quantity,
                        size: size,
                        price: price,
                        image: image
                    };
                    baskets[basketIndex].items.push(newItem); // adds the new item to the items array of the basket
                    res.status(201).json(newItem);
                    return [4 /*yield*/, modelMgr.save(baskets)];
                case 5:
                    _b.sent();
                    return [3 /*break*/, 7];
                case 6:
                    res.status(404).json({ error: "Basket not found." });
                    _b.label = 7;
                case 7: return [2 /*return*/];
            }
        });
    });
}
exports.addItemToBasket = addItemToBasket;
function updateItemQuantity(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, basketId, itemId, quantity, modelMgr, baskets, basketIndex, itemIndex;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.params, basketId = _a.basketId, itemId = _a.itemId;
                    quantity = req.body.quantity;
                    modelMgr = new basketModelManager_1.ModelManager(BASKET_FILE);
                    return [4 /*yield*/, modelMgr.getAll()];
                case 1:
                    baskets = (_b.sent());
                    basketIndex = baskets.findIndex(function (basket) { return basket.basketId === basketId; });
                    if (!(basketIndex !== -1)) return [3 /*break*/, 5];
                    itemIndex = baskets[basketIndex].items.findIndex(function (item) { return item.itemId === itemId; });
                    if (!(itemIndex !== -1)) return [3 /*break*/, 3];
                    baskets[basketIndex].items[itemIndex].quantity = quantity; // updates the quantity
                    res.status(200).json(baskets[basketIndex].items[itemIndex]);
                    return [4 /*yield*/, modelMgr.save(baskets)];
                case 2:
                    _b.sent();
                    return [3 /*break*/, 4];
                case 3:
                    res.status(404).json({ error: "Item not found" });
                    _b.label = 4;
                case 4: return [3 /*break*/, 6];
                case 5:
                    res.status(404).json({ error: "Basket not found" });
                    _b.label = 6;
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.updateItemQuantity = updateItemQuantity;
function removeItemFromBasket(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, basketId, itemId, modelMgr, baskets, basketIndex, itemIndex;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.params, basketId = _a.basketId, itemId = _a.itemId;
                    modelMgr = new basketModelManager_1.ModelManager(BASKET_FILE);
                    return [4 /*yield*/, modelMgr.getAll()];
                case 1:
                    baskets = (_b.sent());
                    basketIndex = baskets.findIndex(function (basket) { return basket.basketId === basketId; });
                    if (!(basketIndex !== -1)) return [3 /*break*/, 5];
                    itemIndex = baskets[basketIndex].items.findIndex(function (item) { return item.itemId === itemId; });
                    if (!(itemIndex !== -1)) return [3 /*break*/, 3];
                    baskets[basketIndex].items.splice(itemIndex, 1); // removes the item at index itemIndex from the items array of the basket
                    res.status(204).send();
                    return [4 /*yield*/, modelMgr.save(baskets)];
                case 2:
                    _b.sent();
                    return [3 /*break*/, 4];
                case 3:
                    res.status(404).json({ error: "Item not found" });
                    _b.label = 4;
                case 4: return [3 /*break*/, 6];
                case 5:
                    res.status(404).json({ error: "Basket not found" });
                    _b.label = 6;
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.removeItemFromBasket = removeItemFromBasket;
