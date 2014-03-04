/*
* GET home page.
*/
var util = require('../lib/ohmageUtilities.js');

exports.index = function(req, res) {
	if(req.session.authenticated == true) {
		console.log(req.session.authenticated);
		res.render('mainpage');
	}
	else {
		console.log(req.session.authenticated);
		res.render('');
	}
};

exports.mainpage = function(req,res) {
	if(req.session.authenticated == false || req.session.authenticated == undefined) {
		console.log("Not authenticated");
		res.redirect('');
	}
	else {
		res.render('mainpage');
	}
};

exports.charts = function(req,res) {
	if(req.session.authenticated == false || req.session.authenticated == undefined) {
		console.log("Not authenticated");
		res.redirect('');
	}
	else {
		res.render('charts');
	}
};

exports.login = function(req, res) {
	var userName = req.body.username;
	var passWord = req.body.password;

	util.authenticate(userName, passWord);

	util.on('doneAuth', function(data) {
		if(data.result == 'failure') {
			res.redirect('');
		}
		else {
			req.session.auth_token = data.token;
			req.session.authenticated = true;
			
			res.redirect('mainpage');
			res.end();

		}
	});
};