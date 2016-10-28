var express = require('express');
var router = express.Router();
var zerorpc = require('zerorpc');
var client = new zerorpc.Client();
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
  res.render('index', { title: 'Food' });
});

module.exports = router;
