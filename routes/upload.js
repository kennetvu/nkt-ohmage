var formidable = require('formidable');
var fs = require('fs');
var parse = require('../lib/parseRawData.js');

exports.index = function(req,res){
	res.render('upload', { title: 'NKT Ohmage file uploader' });
};
exports.upload = function(req,res){
	var form = new formidable.IncomingForm();
	var incomingForm = req.files;
	//console.log(incomingForm);

	form.uploadDir="./uploads/";
	form.keepExtensions = true;
	form.parse(req, function(err, fields, files) {
		console.log(files);
	});

	form.on('file', function(field, file){
		parse.parseData(file.path);
		//fs.rename(file.path, form.uploadDir + file.name);
	});
	parse.once('doneParsing', function(str,filename) {
		console.log(str);
		fs.writeFile(filename, str,{flag:'w'} ,function (err) {
			if (err) throw err;
			console.log('It\'s saved!');
		});
	});
	res.redirect("back");

};

