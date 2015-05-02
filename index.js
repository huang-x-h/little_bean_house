var express = require('express');
var path = require('path');
var routes = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));
app.use('/bower_components', express.static(path.join(__dirname, 'bower_components')));

app.use('/', routes);

app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});
