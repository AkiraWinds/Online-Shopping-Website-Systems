"use strict";
exports.__esModule = true;
var express = require("express");
var model_manager_1 = require("./model-manager");
var router = express.Router();
router.post('/users', function (req, res) {
    var result = model_manager_1.UserService.createUser(req.body);
    if ('error' in result) {
        res.status(400).send(result.error);
    }
    else {
        res.status(201).send(result);
    }
});
exports["default"] = router;
