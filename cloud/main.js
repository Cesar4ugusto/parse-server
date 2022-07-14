
// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
Parse.Cloud.define("hello", (req) => {
	return "Hello world from demo-parse!";
});

require("./functions/product");