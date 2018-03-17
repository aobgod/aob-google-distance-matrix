const request = require('request');

const VALID_MODE = ['driving', 'walking', 'bicycling', 'transit'],
	VALID_AVOID = ['tolls', 'highways', 'ferries', 'indoor'],
	VALID_UNITS = ['metric', 'imperial'],
	VALID_TRAFFIC_MODEL = ['best_guess', 'pessimistic', 'optimistic'],
	VALID_TRANSIT_MODE = ['bus', 'subway', 'train', 'tram', 'rail'],
	VALID_TRANSIT_ROUTING_PREFERENCE = ['less_walking', 'fewer_transfers'],
	SEPARATOR = '|',
	GOOGLE_DISTANCE_MATRIX_API_URL = 'https://maps.googleapis.com/maps/api/distancematrix/json?';

let DistanceMatrix = function(key, origins, destinations) {
	this.options = {
		key: key,
		origins: null,
		destinations: null,
		mode: 'driving',
		units: 'metric',
		language: 'en'
	}
}

DistanceMatrix.prototype.get = function (callback) {
	if (typeof callback != 'function') {
		throw new Error('Missing callback function');
	}
	let requestURL = `${GOOGLE_DISTANCE_MATRIX_API_URL}${urlSet(this.options)} Ex. ${VALID_TRAFFIC_MODEL.join(SEPARATOR)}`;
	DistanceMatrix.prototype.reset.call(this);
	request(requestURL, function (err, response, data) {
		if (err || response.statusCode != 200) {
			return callback(new Error('Google API request error: ' + data));
		}
		callback(null, JSON.parse(data));
	});
}

DistanceMatrix.prototype.key = function(value) {
	delete this.options.client;
	delete this.options.signature;
	this.options.key = value;
	return this;
}

DistanceMatrix.prototype.origins = function(value) {
	this.options.origins = value
	return this;
}

DistanceMatrix.prototype.destinations = function(value) {
	this.options.destinations = value;
	return this;
}

DistanceMatrix.prototype.mode = function(value) {
	let $mode = value.split(SEPARATOR);
	$mode.forEach(_mode => {
		if (VALID_MODE.indexOf(_mode) === -1) {
			delete this.options.mode;
			throw new Error(`Invalid Mode: ${_mode} Ex. ${VALID_MODE.join(SEPARATOR)}`);
		}
	});
	this.options.mode = value;
	return this;
}

DistanceMatrix.prototype.avoid = function(value) {
	let $avoid = value.split(SEPARATOR);
	$avoid.forEach(_avoid => {
		if (VALID_AVOID.indexOf(_avoid) === -1) {
			delete this.options.avoid;
			throw new Error(`Invalid Restrictions: ${_avoid} Ex. ${VALID_AVOID.join(SEPARATOR)}`);
		}
	});
	this.options.avoid = value;
	return this;
}

DistanceMatrix.prototype.units = function(value) {
	let $units = value.split(SEPARATOR);
	$units.forEach(_units => {
		if (VALID_UNITS.indexOf(_units) === -1) {
			delete this.options.units;
			throw new Error(`Invalid Units: ${_units} Ex. ${VALID_UNITS.join(SEPARATOR)}`);
		}
	});
	this.options.units = value;
	return this;
}

DistanceMatrix.prototype.traffic_model = function(value) {
	let $traffic_model = value.split(SEPARATOR);
	$traffic_model.forEach(_traffic_model => {
		if (VALID_TRAFFIC_MODEL.indexOf(_traffic_model) === -1) {
			delete this.options.traffic_model;
			throw new Error(`Invalid Units: ${_traffic_model} Ex. ${VALID_TRAFFIC_MODEL.join(SEPARATOR)}`);
		}
	});
	this.options.traffic_model = value;
	return this;
}

DistanceMatrix.prototype.transit_mode = function(value) {
	let $transit_mode = value.split(SEPARATOR);
	$transit_mode.forEach(_transit_mode => {
		if (VALID_TRANSIT_MODE.indexOf(_transit_mode) === -1) {
			delete this.options.transit_mode;
			throw new Error(`Invalid Units: ${_transit_mode} Ex. ${VALID_TRANSIT_MODE.join(SEPARATOR)}`);
		}
	});
	this.options.transit_mode = value;
	return this;
}

DistanceMatrix.prototype.transit_routing_preference = function(value) {
	let $transit_routing_preference = value.split(SEPARATOR);
	$transit_routing_preference.forEach(_transit_routing_preference => {
		if (VALID_TRANSIT_ROUTING_PREFERENCE.indexOf(_transit_routing_preference) === -1) {
			delete this.options.transit_routing_preference;
			throw new Error(`Invalid Units: ${_transit_routing_preference} Ex. ${VALID_TRANSIT_ROUTING_PREFERENCE.join(SEPARATOR)}`);
		}
	});
	this.options.transit_routing_preference = value;
	return this;
}

DistanceMatrix.prototype.reset = function() {
	this.options = {
		key: this.options.key,
		origins: null,
		destinations: null,
		mode: 'driving',
		units: 'metric',
		language: 'en'
	}
	return this;
}

DistanceMatrix.prototype.observer = function() {
	console.log(this.options);
	return this;
}

function urlSet (options) {
	let $string = '',
		connector = '&';
	for (let key in options) {
		if (!options[key]) throw new Error(`Missing ${key} values!`)
		$string ? connector = '&' : connector = '';
		key === 'origins' || key === 'destinations' ?
			$string += `${connector}${key}=${options[key].join(SEPARATOR).replace(/\s/g, '+')}` :
			$string += `${connector}${key}=${options[key].replace(/\s/g, '+')}`
	}
	return $string;
}

exports.DistanceMatrix = DistanceMatrix;
