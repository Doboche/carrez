var request = require('request');
var cheerio = require('cheerio');
var priceSquare;
var jsson =
{
  "medianPrice": ""
};

var priceSquareMeter = function(fs){
  var data = JSON.parse(fs.readFileSync("leboncoin.json","UTF-8"));
  var url= 'https://www.meilleursagents.com/prix-immobilier/'+ data.ville.toLowerCase() + '-'+data.codePostal;
  request(url, function(error, response, html){
    if(!error){
      var $ = cheerio.load(html);
      if(data.type =="Maison")
      {
        $("#synthese > div.prices-summary.baseline > div.prices-summary__values > div:nth-child(3) > div.small-4.medium-2.columns.prices-summary__cell--median").filter(function(){
          var price = $(this);

          jsson.medianPrice = price.text().replace(/[^0-9]+/ig,"");
        })
      }
      else if (data.type =="Appartement")
      {
        $("#synthese > div.prices-summary.baseline > div.prices-summary__values > div:nth-child(2) > div.small-4.medium-2.columns.prices-summary__cell--median").filter(function(){
          var price = $(this);
          var medianPrice = price.text().replace(/[^0-9]+/ig,"");
        })
      }
    }
  console.log(jsson.medianPrice);
  priceSquare = data.prix / data.surface;
  console.log(priceSquare);
  if(priceSquare<=jsson.medianPrice)
  {
    console.log("Good deal")
  }
  else
  {
    console.log("Bad deal");
  }
});
}
/*
var goodDeal = function()
{
  console.log(medianPrice);
  if(priceSquare<=medianPrice)
  {
    console.log("Good deal")
  }
  else
  {
    console.log("Bad deal");
  }
}
*/
exports.priceSquareMeter = priceSquareMeter;
//exports.goodDeal= goodDeal;
