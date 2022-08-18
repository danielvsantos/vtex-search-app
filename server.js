const express = require ("express");
const bodyParser = require("body-parser");
const request = require('request');
const app = express();
const port = 8000;

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
})

app.post("/", (req, res) => {
    var searchTerm = req.body.search;
    var urlWithTerm = "https://groceriesspain.vtexcommercestable.com.br/api/catalog_system/pub/products/search/" + searchTerm; 
    var options = {
        method: 'GET',
        url: urlWithTerm,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      };
    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        res.send(body);
      });


})

app.listen(process.env.PORT, () => {
    console.log(`Server up and running on port ${port}`);
})



