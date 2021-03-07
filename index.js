var Spider = require('node-spider');

var spider = new Spider({
	concurrent: 5,
	delay: 0,
	logs: process.stderr,
	allowDuplicates: false,
	catchErrors: true,
	addReferrer: false,
	xhr: false,
	keepAlive: false,
	error: function(err, url) {
	},
	done: function() {
	},
	headers: { 'user-agent': 'TyreesSpider1.0.0' },
	encoding: 'utf8'
});

var handleRequest = function(doc) {
	console.log(doc.url);
	doc.$('a').each(function(i, elem) {
		var href = doc.$(elem).attr('href').split('#')[0];
		var url = doc.resolve(href);
		spider.queue(url, handleRequest);
	});
};

//Starting Point
spider.queue('http://tyree.ca/', handleRequest);