var express = require('express');
var router = express.Router();
var appId = '06138e9d';
var apikey = '195aa0df6965773952145a2c47b44602';
var rp = require('request-promise');

/*
  POST / Searches for the meals given the receipe.
  {"search": "searchValue"}
*/
router.post('/', function(req, res, next) {
  var search = req.body.search;
  var url = "https://api.edamam.com/search?q="+search+"?to=30"+"&app_id="+appId+"&app_key="+apikey
  var options = {
    uri: "https://api.edamam.com/search?q="+search+"&app_id="+appId+"&app_key="+apikey
  };
  rp(options).then(function(result) {
    return res.status(200).send(result);
  })
  .catch(function (err) {
    return res.status(500).send({error: err})
  }); 
});

module.exports = router;