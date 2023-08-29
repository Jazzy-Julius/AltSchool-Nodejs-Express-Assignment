const express = require ("express");
const bodyParser = require ("body-parser");
const controller = require("../controller");
const globalMiddleware = require("../globalmiddleware");

const itemRouter = express.Router();

itemRouter.use(bodyParser.json())


itemRouter.get("/", globalMiddleware.checkApi_Key, controller.getItems)

itemRouter.get("/:id", globalMiddleware.checkApi_Key, controller.getOneItem)

itemRouter.post("/", globalMiddleware.checkApi_Key, globalMiddleware.checkAdmin, globalMiddleware.checkItems, controller.postItem)

itemRouter.put("/:id", globalMiddleware.checkApi_Key, globalMiddleware.checkAdmin, globalMiddleware.checkItems, controller.updateItem)

itemRouter.delete("/:id", globalMiddleware.checkApi_Key, globalMiddleware.checkAdmin, controller.deleteItem)



module.exports = itemRouter


