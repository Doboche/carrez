var express = require('express');
var good =require('./meilleuragent');
var leboncoin = require('./leboncoin');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express()
var port =3000

var url = 'https://www.leboncoin.fr/ventes_immobilieres/1064479689.htm?ca=12_s';
app.get('/scrape', function(req, res){
  leboncoin.leboncoin(fs,url);
  good.priceSquareMeter(fs);

})
app.get('/', (request, response) => {
  response.send('Hello from Express!')
})

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})
