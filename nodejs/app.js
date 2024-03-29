
/**
 * Module dependencies.
 */

 var express = require('express');
 var routes = require('./routes');
 var routesUpload = require('./routes/upload.js');
 var util = require('./lib/ohmageUtilities.js');
 var http = require('http');
 var path = require('path');

 var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('NKTPMS2014'));
app.use(express.session());
app.enable('trust proxy');
app.use(app.router);
if(app.get('env') == 'production'){
	app.use('/nkt-ohmage', express.static(path.join(__dirname, 'public')));
}
else if (app.get('env') == 'development'){
	app.use(express.static(path.join(__dirname, 'public')));
}

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

console.log(app.get('env'));
console.log(app.settings.env);

app.get('/', routes.index);
app.get('/mainpage', routes.mainpage);
app.get('/charts', routes.charts);
app.post('/login', routes.login);
app.get('/logout', function(req, res) {
	util.logout(req.session.auth_token);

	util.on('loggedOut', function(data) {
		if(data.result == 'success') {
			req.session.auth_token = null;
			req.session.authenticated = null;
			console.log("You've been logged out!");
			res.redirect('');
			res.end();
		}
	});
});

app.get('/upload', routesUpload.index);
app.post('/uploadFile', routesUpload.upload);

// Function for parsing the original data file
app.get('/parse', function(req,res) {
	var parse = require('./lib/parseRawData.js');
	res.writeHead(200, {
		'Content-Type': 'text/plain'
	});
	parse.parseData('data.txt');

	parse.on('doneParsing', function(str) {
		console.log(str);
		res.write("" + str);
		res.end();
	});

});
http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});
