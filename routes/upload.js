var express = require('express');
var fs = require("fs");
var router = express.Router();
var multer  = require('multer');
var upload = multer({ dest: './upload/'});
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require("mongoose");
var Grid = require("gridfs-stream");
var conn = mongoose.connection;
var encode = require('nodejs-base64-encode');
var utf8 = require('utf8');
Grid.mongo = mongoose.mongo;
var gfs;

// files = [];
// orinames = [];

conn.once("open", function() {
    gfs = Grid(conn.db);
    router.post('/', function(req, res) {
        console.log(req);
                var part = req.files.files;
                var writeStream = gfs.createWriteStream({
                    filename: part.name,
                    mode: 'w',
                    content_type: 'part.mimetype'
                });

                writeStream.on('close', function(file) {
                    if(!file) {
                        res.status(400).send('No file received');
                    }
                    return res.status(200).send({
                        message: 'Success',
                        file: file
                    });
                });

                writeStream.write(part.data, function() {
                    writeStream.end();
                });

                // files.push(req.file.filename);
                // orinames.push(req.file.originalname);
    });

    router.get('/:imgname', function (req, res) {
        //var name = files.pop();
        //var oriname = orinames.pop();
        //res.download('./upload/' + name, oriname);
        //var imgname = req.params.imgname;
        var imgname = req.params.imgname;
        gfs.files.find({
            filename: imgname
        }).toArray(function(err, files){

            if (files.length === 0) {
                return res.status(404).send({
                    message: 'File not found'
                });
            }

            var data = [];
            var readstream = gfs.createReadStream({
                filename: files[0].filename
            });

            readstream.on('data', function (chunk) {
                data.push(chunk);
            });

            readstream.on('end', function() {
                data = Buffer.concat(data);
                var img = 'data:video/mp4;base64,' + Buffer(data).toString('base64');
                var file = utf8.decode(img)
                res.end(encode.decode(file, "base64"));
            });

            readstream.on('error', function(err){
                res.status(500).send(err);
                console.log('An error occurred!', err);
            });

        });

    });
});


module.exports = router;