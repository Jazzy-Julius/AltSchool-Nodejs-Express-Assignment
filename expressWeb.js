const express = require('express');


const app = express();
const PORT = 4000;

app.set("view engine","ejs");
app.set("views", "views");

app.get("/", (request, response) =>{
    response.status(200).render("index")
    
});

app.get("/index", (request, response) =>{
    response.status(200).render("index")
    
});

app.get("*", (request, response) =>{
    response.status(404)
    response.render("error")
});

app.listen(PORT, () =>{
    console.log(`The server is running successfully at http://localhost:${PORT}`)
})