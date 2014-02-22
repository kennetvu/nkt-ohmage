/*
* GET home page.
*/
var util = require('../lib/ohmageUtilities.js');

exports.index = function(req, res) {
	res.render('index', { title: 'Express' });
};

exports.linechart = function(req,res) {
	res.render('linechart');
};

exports.mainpage = function(req,res) {
	res.render('mainpage');
};

exports.loginpage = function(req,res) {
	res.render('loginpage');
};

exports.charts = function(req,res) {
	res.render('charts');
};

exports.login = function(req, res) {
	/*res.writeHead(200, {
		'Content-Type': 'text/plain'
	});*/
	var userName = req.body.username;
	var passWord = req.body.password;

	util.authenticate(userName, passWord);

	util.on('doneAuth', function(data) {
		if(data.result == 'failure') {
			res.write('Wrong username or password. Please retry!');
			res.end();
		}
		else {
			/*res.write("You are now logged in as: " + userName);
			res.write("\nToken: " + data.token);
			res.end();*/
			res.render('mainpage');
		}
	});
};

