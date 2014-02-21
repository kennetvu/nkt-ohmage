
/*
 * GET home page.
 */

exports.index = function(req, res){
	console.log(req.url);
	console.log(req.ip);
	console.log(req.host);
  res.render('index', { title: 'Nkt-ohmage' });
};