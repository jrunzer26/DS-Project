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
  var items = [];
  if(!req.body.username) {
    return res.status(400).json({err: "Please enter your username"});
  }
  if(!req.body.password) {
    return res.status(400).json({err: "Please enter your password"});
  }
  if(!req.body.listname) {
    return res.status(400).json({err: "Please enter a List Name"});
  }
  if (!req.body.items || req.body.items.length == 0) {
    return res.status(400).json({err: "Please add items to your list"});
  }
  for (var key in req.body.items) {
    items.push(req.body.items[key].name)
  }
  client.invoke("makeList", String(req.body.username), String(req.body.password),
      String(req.body.listname), items, function (error, result, more) {
    if (error) {
      return res.status(407).json({err: "An internal error occured. Try again later."});
    }
    
    if (result != undefined) {
      var pythonResult = JSON.parse(result.toString("utf8"));
      if (pythonResult.err == "")
        return res.status(200).json(pythonResult);
      else
        return res.status(400).json(pythonResult);
    }
    else {
      return res.status(400).json({"err": "There currently is a problem with Todoist. Try again later."});
    }
  });
});

module.exports = router;