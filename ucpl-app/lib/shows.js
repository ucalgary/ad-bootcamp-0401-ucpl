var templates = require('duality/templates'),
    fields = require('couchtypes/fields'),
    Form = require('couchtypes/forms').Form;


exports.welcome = function(doc, req) {
	return {
		title: 'UC Performance Link Job Profiles',
		content: templates.render('ucpl.html', req, {
			message: "Hello, world!"
		})
	};
};

exports.not_found = function(doc, req) {
	return {
		title: '404 Not Found',
		content: templates.render('404.html', req, {})
	};
};

exports.jpedit = function(doc, req) {
	return {
		title: doc._id,
		content: templates.render('jpedit.html', req, {
			doc: doc,
			method: 'POST',
			action: '../../_update/jpedit/' + doc._id,
		})
	};
};