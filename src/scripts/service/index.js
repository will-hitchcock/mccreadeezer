var express = require('express');

var mcCreaDeezer = express();
//default port to 8000 for dev
var PORT = process.env.PORT || 8000;

//serve static files
mcCreaDeezer.use(express.static(__dirname + '/public/'));

var server = mcCreaDeezer.listen(PORT, function() {
    console.log('Listening on port ' + PORT)
});