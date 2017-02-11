var express = require('express');    //Express Web Server 
var busboy = require('connect-busboy'); //middleware for form/file upload
var path = require('path');     //used for file path
var fs = require('fs-extra');       //File System - for file manipulation
 
var app = express();
app.use(busboy());
app.use(express.static(path.join(__dirname, 'public')));
 
app.get('/upload', function (req, res) {
   res.sendFile( __dirname + "/public/" + "index.htm" );
})
app.route('/file_upload')
    .post(function (req, res, next) {
 
        var fstream;
        req.pipe(req.busboy);
        req.busboy.on('file', function (fieldname, file, filename) {
            console.log("Uploading: " + filename);
 
            //Path where image will be uploaded
            fstream = fs.createWriteStream(__dirname + '/img/' + filename);
            file.pipe(fstream);
            fstream.on('close', function () {    
                console.log("Upload Finished of " + filename);              
                res.redirect('back');           //where to go next
            });
        });
    });
 
var server = app.listen(8081, function() {
    console.log('Listening on port %d', server.address().port);
});