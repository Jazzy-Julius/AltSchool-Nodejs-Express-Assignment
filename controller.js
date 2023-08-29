const fs = require("fs");

// ######### POST AN ITEM ###############
const postItem = (req, res) => {
  const itemsDB = fs.readFileSync("./db/items.json");
  const items = JSON.parse(itemsDB);

  const lastId = items[items.length - 1].id;
  const newId = lastId + 1;

  const postWithId = { ...itemToPost, id: newId };
  items.push(postWithId);
  fs.writeFile("./db/items.json", JSON.stringify(items), (err) => {
    if (err) {
      res.status(500);
    }
    res.status(200).json(postWithId);
  });
};

// ######### GET ALL ITEMS ##########################
const getItems = (req, res) => {
  const items = fs.readFileSync("./db/items.json");
  return res.status(200).send(items);
};

// ########## GET ONE ITEM ##########################
const getOneItem = (req, res) => {
  const itemsDb = fs.readFileSync("./db/items.json");
  const items = JSON.parse(itemsDb);
  const id = req.params.id;
  const foundItem = items.find((item) => item.id === parseInt(id));
  if (foundItem) {
    res.status(200).json(foundItem);
  } else {
    res.status(404).json({ message: "Item not found" });
  }
};

//########## UPDATE AN ITEM ###########################
const updateItem = (req, res) => {
  const itemsDb = fs.readFileSync("./db/items.json");
  const items = JSON.parse(itemsDb);
  const update = req.body;
  const id = parseInt(req.params.id);

  const foundIndex = items.findIndex((item) => item.id === id);
  if (foundIndex === -1) {
    res.status(404).json({ message: "Item not found" });
    return;
  }

  items[foundIndex] = { ...items[foundIndex], ...update };

  fs.writeFile("./db/items.json", JSON.stringify(items), (err) => {
    if (err) {
      res.status(500).json({ message: "Error updating item" });
    } else {
      res.status(200).json(items[foundIndex]);
    }
  });
};

//############# DELETE AN ITEM ######################
const deleteItem = (req, res) => {
  const itemsDb = fs.readFileSync("./db/items.json");
  const items = JSON.parse(itemsDb);
  const id = parseInt(req.params.id);
  const foundIndex = items.findIndex((item) => item.id === id);
  if (foundIndex === -1) {
    res.status(404).json({ message: "Item not found" });
    return;
  } else {
    items.splice(foundIndex, 1);
  }
  fs.writeFile("./db/items.json", JSON.stringify(items), (err) => {
    if (err) {
      res.status(500).json({ message: "Error deleting item" });
    } else {
      res.status(200).json({ message: "Item deleted successfully" });
    }
  });
};


module.exports = {
    getItems,
    getOneItem,
    postItem,
    updateItem,
    deleteItem
}