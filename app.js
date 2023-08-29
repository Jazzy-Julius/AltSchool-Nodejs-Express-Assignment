const express = require("express");

const itemRouter = require("./routes/items.js");
const userRouter = require("./users/users.router.js");

const app = express();
const PORT = 4000;

app.use("/items", itemRouter);
app.use("/users", userRouter);




app.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}`)
});