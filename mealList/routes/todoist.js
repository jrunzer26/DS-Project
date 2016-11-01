var express = require('express');
var router = express.Router();
var zerorpc = require('zerorpc');
var client = new zerorpc.Client();
client.connect("tcp://127.0.0.1:4242");

/* POST todoist. - makes a list with the items
  {
    "username": "username@email.com",
    "password": "password",
    "listname": "Shopping List",
    "items": [{
      "name": "carrots"
    }, {
      "name": "peas"
    }]
  } 
*/
router.post('/', function(req, res, next) {
  console.log(req.body.username);
  console.log(req.body.password);
  console.log(req.body.listname);
  console.log(req.body.items);
  var items = [];
  for (var key in req.body.items) {
    items.push(req.body.items[key].name)
    console.log(key + " " + req.body.items[key].name);
  }
  console.log(items);
  client.invoke("makeList", String(req.body.username), String(req.body.password),
      String(req.body.listname), items, function (error, result, more) {
    console.log(result.toString("utf8"));
    var pythonResult = JSON.parse(result.toString("utf8"));
    res.status(200).json(pythonResult);
  });
});

module.exports = router;