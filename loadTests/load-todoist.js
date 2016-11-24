var loadtest = require('loadtest');
var Table = require('cli-table');
var async = require('async');

var urlVal = 'http://159.203.35.108:3000';
var totalResults = [];
var table = new Table({
	head: ['Method', 'URL', 'Description', 'Requests', 'Errors', 'Error\nCodes', 'rps', 'Concurrency', 'Mean\nLatency\n(ms)', 'Max\nLatency\n(ms)', 'Percentiles', 'Total Time\n(s)']
});

var j = 0;
var inFunction = false;
var descriptionCreator = function(method, url, description, options) {
	var testDescription = {};
	testDescription.method = method;
	testDescription.url = url;
	testDescription.description = description;
	if (options.concurrency) {
		testDescription.concurrency = options.concurrency;
	} else {
		testDescription.concurrency = 1;
	}
	return testDescription;
}

var getIndexSingle = function() {
	var options = {
		url: urlVal,
		maxRequests: 1
	};
	var testDescription = descriptionCreator("GET", "/index", "Single\nRequest", options);
	printDes(testDescription);
	loadtest.loadTest(options, function(error, result) {
		if (error) {
			console.log(error);
		}
		var percentiles = result.percentiles;
		var percentilesText = "50: " + percentiles['50']  +  "\n" +
			"90: " + percentiles['90'] + "\n" +
			"95: " + percentiles['95'] + "\n" + 
			"99: " + percentiles['99'];
		table.push([testDescription.method, testDescription.url, testDescription.description,
			result.totalRequests, result.totalErrors, JSON.stringify(result.errorCodes), 
			result.rps, testDescription.concurrency, result.meanLatencyMs, 
			result.maxLatencyMs, percentilesText, result.totalTimeSeconds]);
		// next function
		getIndexMultiple();
	});
};

var getIndexMultiple = function() {
	var options = {
		url: urlVal,
		maxRequests: 100
	};
	var testDescription = descriptionCreator("GET", "/index", "Multiple\nSync\nRequest", options);
	printDes(testDescription);
	loadtest.loadTest(options, function(error, result) {
		if (error) {
			console.log(error);
		}
		var percentiles = result.percentiles;
		var percentilesText = "50: " + percentiles['50']  +  "\n" +
			"90: " + percentiles['90'] + "\n" +
			"95: " + percentiles['95'] + "\n" + 
			"99: " + percentiles['99'];
		table.push([testDescription.method, testDescription.url, testDescription.description,
			result.totalRequests, result.totalErrors, JSON.stringify(result.errorCodes), result.rps, testDescription.concurrency, 
			result.meanLatencyMs, result.maxLatencyMs, percentilesText, result.totalTimeSeconds]);
		// next function
		getIndexConcurrent();
	});
};

var getIndexConcurrent = function() {
	var options = {
		url: urlVal,
		maxRequests: 100,
		concurrency: 10
	};
	var testDescription = descriptionCreator("GET", "/index", "Multiple\nAsync \nRequest", options);
	printDes(testDescription);
	loadtest.loadTest(options, function(error, result) {
		if (error) {
			console.log(error);
		}
		var percentiles = result.percentiles;
		var percentilesText = "50: " + percentiles['50']  +  "\n" +
			"90: " + percentiles['90'] + "\n" +
			"95: " + percentiles['95'] + "\n" + 
			"99: " + percentiles['99'];
		table.push([testDescription.method, testDescription.url, testDescription.description,
			result.totalRequests, result.totalErrors, JSON.stringify(result.errorCodes), result.rps, testDescription.concurrency, 
			result.meanLatencyMs, result.maxLatencyMs, percentilesText, result.totalTimeSeconds]);
		// next function
		createTable();
	});
};

var createTable = function() {
	console.log(table.toString());
}

var printDes = function(testDes) {
	console.log("Starting test: " + testDes.method + " " + testDes.url + " " + testDes.description )
}
getIndexSingle();




		




