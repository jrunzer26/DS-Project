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
		maxRequests: 15
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
		maxRequests: 15,
		concurrency: 5
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
		postTodoistSingle();
	});
};

var postTodoistSingle = function() {
	var bodyData = {
		"username" : "jrunzer26@hotmail.com",
		"password" : "password",
		"listname": "Load Test List",
	    "items": [{
	      "name": "carrots"
	    }, {
	      "name": "peas"
	    }]
	};
	var options = {
		url: urlVal + '/todoist',
		method: "POST",
		maxRequests: 1,
		body: bodyData,
		contentType: 'application/json'
	};
	var testDescription = descriptionCreator("POST", "/todoist", "Single\nRequest", options);
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
		postTodoistMultipleSync();
	});
}


var postTodoistMultipleSync = function() {
	var bodyData = {
		"username" : "jrunzer26@hotmail.com",
		"password" : "password",
		"listname": "Load Test List",
	    "items": [{
	      "name": "carrots"
	    }, {
	      "name": "peas"
	    }]
	};
	var options = {
		url: urlVal + '/todoist',
		method: "POST",
		maxRequests: 15,
		body: bodyData,
		contentType: 'application/json'
	};
	var testDescription = descriptionCreator("POST", "/todoist", "Multiple\nSync \nRequest", options);
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
		postTodoistMultipleAsync();
	});
}

var postTodoistMultipleAsync = function() {
	var bodyData = {
		"username" : "jrunzer26@hotmail.com",
		"password" : "password",
		"listname": "Load Test List",
	    "items": [{
	      "name": "carrots"
	    }, {
	      "name": "peas"
	    }]
	};
	var options = {
		url: urlVal + '/todoist',
		method: "POST",
		maxRequests: 15,
		concurrency: 5,
		body: bodyData,
		contentType: 'application/json'
	};
	var testDescription = descriptionCreator("POST", "/todoist", "Multiple\nAsync\nRequest", options);
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
		postFoodSingle();
	});
}

var postFoodSingle = function() {
	var bodyData = {
		"search":"chicken"
	};
	var options = {
		url: urlVal + '/food',
		method: "POST",
		maxRequests: 1,
		body: bodyData,
		contentType: 'application/json'
	};
	var testDescription = descriptionCreator("POST", "/food", "Single\nRequest", options);
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
		postFoodMultipleSync();
	});
}

var postFoodMultipleSync = function() {
	var bodyData = {
		"search":"chicken"
	};
	var options = {
		url: urlVal + '/food',
		method: "POST",
		maxRequests: 15,
		body: bodyData,
		contentType: 'application/json'
	};
	var testDescription = descriptionCreator("POST", "/food", "Multiple\nSync\nRequest", options);
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
		postFoodMultipleAsync();
	});
}

var postFoodMultipleAsync = function() {
	var bodyData = {
		"search":"chicken"
	};
	var options = {
		url: urlVal + '/food',
		method: "POST",
		maxRequests: 15,
		concurrency: 5,
		body: bodyData,
		contentType: 'application/json'
	};
	var testDescription = descriptionCreator("POST", "/food", "Muliple\nAsync\nRequest", options);
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
}


var createTable = function() {
	console.log(table.toString());
}

var printDes = function(testDes) {
	console.log("Starting test: " + testDes.method + " " + testDes.url + " " + testDes.description )
}
getIndexSingle();