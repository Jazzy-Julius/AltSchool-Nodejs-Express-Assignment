const express = require ("express");
const bodyParser = require ("body-parser");
const fs = require ("fs");

const itemRouter = express.Router();
itemRouter.use(bodyParser.json());

const itemsFilePath = "./db/items.json";

// ######## GET ALL ITEMS ###################
itemRouter.get("/", (request, response) => {
    const items = fs.readFileSync(itemsFilePath);
    response.status(200).send(items);
})

//############ GET ONE ITEM ##################
itemRouter.get("/:id", (request, response) => {
    const itemsDb = fs.readFileSync(itemsFilePath);
    const items = JSON.parse(itemsDb);
    const id = request.params.id; 
    const foundItem = items.find(item => item.id === parseInt(id));
    
    if (foundItem) {
        response.status(200).json(foundItem);
    } else {
        response.status(404).json({ message: "Item not found" });
    }
});

// ################## POST AN ITEM ##########################
itemRouter.post("/", (request, response) => {
    const itemsDb = fs.readFileSync(itemsFilePath);
    const items = JSON.parse(itemsDb);
    const itemToPost = request.body
   
    const lastId = items[items.length-1].id;
    const newId = lastId + 1;
   
    const postWithId = {...itemToPost, id:newId};
    items.push(postWithId);
    fs.writeFile(itemsFilePath, JSON.stringify(items), (err) => {
        if(err) {
            response.status(500);
        }
        response.status(200).json(postWithId);
    })
})

// ################### UPDATE AN ITEM #####################
itemRouter.put("/:id", (request, response) => {
    const itemsDb = fs.readFileSync(itemsFilePath);
    const items = JSON.parse(itemsDb);
    const update = request.body;
    const id = parseInt(request.params.id);

    const foundIndex = items.findIndex(item => item.id === id); 
    if (foundIndex === -1) {
        response.status(404).json({ message: "Item not found" });
        return;
    }

    items[foundIndex] = { ...items[foundIndex], ...update }; 

    fs.writeFile(itemsFilePath, JSON.stringify(items), err => {
        if (err) {
            response.status(500).json({ message: "Error updating item" });
        } else {
            response.status(200).json(items[foundIndex]);
        }
    });
});

// ################### DELETE AN ITEM #####################
itemRouter.delete("/:id", (request, response) => {
    const itemsDb = fs.readFileSync(itemsFilePath);
    const items = JSON.parse(itemsDb);
    const id = parseInt(request.params.id);
    const foundIndex = items.findIndex(item => item.id === id); 
    if (foundIndex === -1) {
        response.status(404).json({ message: "Item not found" });
        return;
    }else {items.splice(foundIndex, 1)};
    fs.writeFile(itemsFilePath, JSON.stringify(items), err => {
        if (err) {
            response.status(500).json({ message: "Error deleting item" });
        } else {
            response.status(200).json({message: "Item deleted successfully"})
        }
    });
    
})

module.exports = itemRouter


