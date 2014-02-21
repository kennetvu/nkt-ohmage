var config = require('../config.json');
var http = require('http');
var restler = require('restler');
var EventEmitter = require("events").EventEmitter;
/*
var mysql = require('mysql');

var connection = mysql.createConnection({
	host: config.mysql.hostname,
	user: config.mysql.username,
	password: config.mysql.password
});
*/
module.exports = new EventEmitter();

var authenticate = function authenticate(username, password) {
	restler.post(config.hostname + '/app/user/auth_token', {
		data: {
			'user': username,
			'password': password,
			'client': 'NKT-node'
		}
	}).on('success', function(data, response) {
		module.exports.emit('doneAuth', data);
	});
};
/*
connection.connect(function(error, connection) {
	console.log(error);
});
*/
module.exports.authenticate = authenticate;