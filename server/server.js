"use strict";
exports.__esModule = true;
var productRouter_1 = require("./product/productRouter");
var categoryRouter_1 = require("./category/categoryRouter");
var userRouter_1 = require("./user/userRouter");
var basketRouter_1 = require("./basket/basketRouter");
var cors = require("cors");
var express = require("express");
var app = express();
var PORT = process.env.PORT || 8000; // Use the environment port or default to 3000
app.use(cors());
// Middleware
app.use(express.json()); // For parsing application/json
// Routes
app.use(categoryRouter_1.categoryRouter);
app.use(productRouter_1.productRouter);
app.use(userRouter_1["default"]);
app.use(basketRouter_1.basketRouter); // Assuming basketRouter handles its own path routing internally
// Error handling middleware
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Start the server
app.listen(PORT, function () {
  console.log("Server running on http://localhost:".concat(PORT));
});
