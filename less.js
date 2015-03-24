export function translate (load) {
	let cleanedCSS = load.source
		.replace(/(["\\])/g, '\\$1')
		.replace(/[\f]/g, "\\f")
		.replace(/[\b]/g, "\\b")
		.replace(/[\n]/g, "\\n")
		.replace(/[\t]/g, "\\t")
		.replace(/[\r]/g, "\\r")
		.replace(/[\u2028]/g, "\\u2028")
		.replace(/[\u2029]/g, "\\u2029");

	load.source = `var less = require('lessC');
	var renderedCSS;
	module.exports = function (options) {
		var lessOpt = {
			globalVars: options
		};
		less.render("${cleanedCSS}", lessOpt, function (e, output) {
			renderedCSS = output.css;
		});
		return renderedCSS;
	}`;
};
