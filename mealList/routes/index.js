var express = require('express');
var router = express.Router();
var zerorpc = require('zerorpc');
var client = new zerorpc.Client();
var rp = require('request-promise');
var appId = '06138e9d';
var apikey = '195aa0df6965773952145a2c47b44602';
var url = "https://api.edamam.com/search";
client.connect("tcp://127.0.0.1:4242");

/* GET home page. */
router.get('/', function(req, res, next) {
  client.invoke("hello", "World", function (error, res, more) {
    console.log(res);
  });
  client.invoke("makeList", "testing", 5, function (error, res, more) {
    console.log(res);
  });
  res.render('index', { title: 'Express' });
});

router.get('/food', function(req, res, next) {
  var options = {
    uri: "https://api.edamam.com/search?q=chicken&app_id="+ appId+"&app_key="+apikey
  };
  rp(options).then(function(result) {
    console.log(result);
  }); 
  res.render('index', { title: 'Food' });
});

router.get('/ajaxTest', function(req, res, next) {
  res.status(200).send({ajax: "this is my response!!!!"});
});


module.exports = router;
