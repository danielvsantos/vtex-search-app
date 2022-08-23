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
        var searchResults = JSON.parse(body);
        var productName1 = searchResults[0].productName; 
        var imageUrl = searchResults[0].items[0].images[0].imageUrl;
        var priceItem1 = searchResults[0].items[0].sellers[0].commertialOffer.Price;
        res.write (`<h1> ${productName1} </h1>`)
        res.write(`<img src=${imageUrl} alt="" width="200px">`);
        res.write(`<p>$ ${priceItem1} </p>`);
        res.send();
      });


})

app.listen(pprocess.env.PORT, () => {
    console.log(`Server up and running on port ${port}`);
})



