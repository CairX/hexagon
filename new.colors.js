/* exported Colors */
"use strict";

var Colors = (function() {

	function Color(array) {
		this.colors = [];
		this.colors[0] = array[0];
		this.colors[1] = array[1];
		this.colors[2] = array[2];
		this.colors[3] = typeof array[3] === "undefined" ? 255 : array[3];
	}
	Color.prototype.copy = function() {
		return new Color(this.colors);
	};
	Color.prototype.toString = function() {
		var string = "";
		for (var i = 0; i < this.colors.length; i++) {
			if (i === this.colors.length - 1) {
				var alpha = this.colors[i] / 255;
				alpha = alpha < 0 ? 0 : alpha;
				alpha = alpha > 1 ? 1 : alpha;
				string += alpha;
			} else {
				string += round(this.colors[i]) + ", ";
			}
		}
		return "rgba(" + string + ")";
	};
	Color.prototype.add = function(obj) {
		var temp = [];

		for (var i = 0; i < this.colors.length; i++) {
			temp[i] = this.colors[i] + obj.colors[i];
		}

		return new Color(temp);
	};
	Color.prototype.substract = function(obj) {
		var temp = [];

		for (var i = 0; i < this.colors.length; i++) {
			temp[i] = this.colors[i] - obj.colors[i];
		}

		return new Color(temp);
	};
	Color.prototype.apply = function(func) {
		for (var i = 0; i < this.colors.length; i++) {
			this.colors[i] = func(this.colors[i]);
		}
	};

	var round = function(number) {
		number = Math.round(number);
		if (number < 0) {
			return 0;
		} else if (number > 255) {
			return 255;
		} else {
			return number;
		}
	};

	var clean = function(string, patterns) {
		for (var i = 0; i < patterns.length; i++) {
			string = string.replace(patterns[i], "");
		}

		return string;
	};

	var splitHex = function(string, step) {
		var values = [];

		for (var i = 0; i < string.length; i += step) {
			values.push(string.substring(i, i + step));
		}

		return values;
	};

	var doubleHex = function(array) {
		for (var i = 0; i < array.length; i++) {
			// Empty string to ensure concat instead of addition.
			array[i] = array[i] + "" + array[i];
		}

		return array;
	};

	var extract = function(color) {
		// console.log(color);

		var values = [];

		if (color.indexOf("rgb(") === 0) {
			color = clean(color, [" ", "rgb(", ")"]);
			values = color.split(",");

		} else if (color.indexOf("rgba(") === 0) {
			color = clean(color, [" ", "rgba(", ")"]);
			values = color.split(",");
			values[3] = round(255 * values[3]);

		} else if (color.indexOf("#") === 0) {
			color = color.replace("#", "");

			if (color.length === 3 || color.length === 4) {
				values = splitHex(color, 1);
				values = doubleHex(values);
			} else if (color.length === 6 || color.length === 8) {
				values = splitHex(color, 2);
			}

			for (var i = 0; i < values.length; i++) {
				values[i] = parseInt(values[i], 16);
			}
		}

		for (var i = 0; i < values.length; i++) {
			values[i] = round(values[i]);
		}

		var c = new Color(values);
		// console.log(c);
		return c;
	};

	var transition = function(start, end, steps) {
		start = extract(start);
		end = extract(end);

		var trans = end.substract(start);
		trans.apply(function(color) {
			return color / (steps - 1);
		});

		var colors = [start];
		for (var i = 0; i < steps - 1; i++) {
			colors.push(colors[i].add(trans));
		}

		for (var i = 0; i < colors.length; i++) {
			colors[i] = colors[i].toString();
		}

		return colors;
	};


	return {
		extract: extract,
		transition: transition
	};
})();
