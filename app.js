const express = require("express");

const app = express();
const PORT = 4000;

const itemRoute = require("./routes/items");

app.use("/items", itemRoute);







app.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}`)
});