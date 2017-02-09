
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');


var prix,ville,type,surface,codePostal;
var json={
"prix":"",
"ville":"",
"codePostal": "",
"type":"",
"surface":""
}
var leboncoin = function(fs,url){
  request(url,function(error,response,html){
    if(!error){

      var $ = cheerio.load(html);
      $('#adview > section > section > section.properties.lineNegative > div:nth-child(9) > h2 > span.value').filter(function(){
      var data = $(this);
      json.surface=data.text().replace(/[^0-9]+/ig,"").slice(0,json.surface.length-1);
      console.log(json.surface);
    })
    $('#adview > section > section > section.properties.lineNegative > div:nth-child(5) > h2 > span.value').filter(function(){
      data = $(this);
      prix = data.text().replace(/[^0-9]+/ig,"");
      json.prix=prix;
      console.log(prix);
    })
    $('#adview > section > section > section.properties.lineNegative > div.line.line_city > h2 > span.value').filter(function(){
      data=$(this);
      codePostal= data.text().replace(/[^0-9]+/ig,"");
      json.codePostal=codePostal;
      ville = data.text().replace(new RegExp("[^(a-zA-Z)\-]", "g"), '');
      json.ville = ville;
      console.log(ville)
      console.log(codePostal);
    })
    $('#adview > section > section > section.properties.lineNegative > div:nth-child(7) > h2 > span.value').filter(function(){
      data=$(this);
      type= data.text();
      json.type=type;
      console.log(type);
    })
  }
  fs.writeFile('leboncoin.json',JSON.stringify(json,null,4), function(err){
     console.log('File successfully written! - Check your project directory for the output.json file');
  })

});
}




exports.leboncoin = leboncoin;
