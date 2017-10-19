var express = require('express');
var fs = require("fs");
var router = express.Router();
var multer  = require('multer');
var upload = multer({ dest: './upload/'});
var bodyParser = require('body-parser');
var path = require('path');

files = [];
orinames = [];

router.post('/', upload.single('file'), function(req, res) {
    res.end();
    console.log(req);
    files.push(req.file.filename);
    orinames.push(req.file.originalname);
});

router.get('/', function (req, res) {
    var name = files.pop();
    var oriname = orinames.pop();
    res.download('./upload/' + name, name);
});

module.exports = router;