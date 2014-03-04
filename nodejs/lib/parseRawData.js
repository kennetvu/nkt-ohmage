var fs = require('fs');
var stringJS = require('string');
var EventEmitter = require("events").EventEmitter;
module.exports = new EventEmitter();

var parseData = function parseData(fileName) {
	fs.readFile(fileName, function(error, data) {
		var lines = data.toString().split('\n');
		var dataStack = [];
		var str = "Force;";

		for(var i = 1; i < lines.length; i++) {
			lines[i] = stringJS(lines[i]).trim().toString();

			if(lines[i] == "") {
				// Ignores the whitespace
			}
			else if(lines.length-2 == i) {
				lines[i] = stringJS(lines[i]).replaceAll(',', '.').s;
				str += lines[i];
				dataStack.push(lines[i]);
			}
			else {
				lines[i] = stringJS(lines[i]).replaceAll(',', '.').s;
				str += lines[i] + ";";
				dataStack.push(lines[i]);
			}
		}
		// TODO: Send the stack somewhere?
		module.exports.emit('doneParsing', str, fileName);
	});
};

module.exports.parseData = parseData;