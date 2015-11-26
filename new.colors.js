/* exported Colors */
"use strict";

var Colors = (function() {

	function Color(r, g, b, a) {
		this.red = red;
		this.green = green;
		this.blue = blue;
		this.alpha = alpha;
		this.origin = origin;
	}
	Color.prototype.apply = function(call) {

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

	var extract = function(color) {
		console.log(color);

		var values = [];
		color = color.replace(new RegExp(" ", "g"), "");

		if (color.indexOf("rgb(") === 0) {
			color = color.replace("rgb(", "");
			color = color.replace(")", "");
			values = color.split(",");
		} else if (color.indexOf("rgba(") === 0) {
			color = color.replace("rgba(", "");
			color = color.replace(")", "");
			values = color.split(",");
			values[3] = round(255 * values[3]);
		} else if (color.indexOf("#") === 0) {
			color = color.replace("#", "");

			if (color.length === 3) {
				// Empty string to ensure concat instead of addition.
				values.push("" + color.substring(0, 1) + color.substring(0, 1));
				values.push("" + color.substring(1, 2) + color.substring(1, 2));
				values.push("" + color.substring(2, 3) + color.substring(2, 3));
			} else if (color.length === 4) {
				// Empty string to ensure concat instead of addition.
				values.push("" + color.substring(0, 1) + color.substring(0, 1));
				values.push("" + color.substring(1, 2) + color.substring(1, 2));
				values.push("" + color.substring(2, 3) + color.substring(2, 3));
				values.push("" + color.substring(3, 4) + color.substring(3, 4));
			} else if (color.length === 6) {
				values.push(color.substring(0, 2));
				values.push(color.substring(2, 4));
				values.push(color.substring(4, 6));
			} else if (color.length === 8) {
				values.push(color.substring(0, 2));
				values.push(color.substring(2, 4));
				values.push(color.substring(4, 6));
				values.push(color.substring(6, 8));
			}

			for (var i = 0; i < values.length; i++) {
				values[i] = parseInt(values[i], 16);
			}
		}

		return values;
	};

	return { extract: extract };
})();
