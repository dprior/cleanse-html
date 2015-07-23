var assert = require("assert");
describe("cleanse-html",function(){
	describe("cleanse",function(){
		it("should return Hello World after removing various html tags",function(){
			var cleanse = require("../cleanse.js");
			var html = "<p>Hello World</p>";
			assert.equal("Hello World",cleanse(html));
		});
		it('should not permanently set settings that are passed in to the cleanse function',function(){
			var cleanse = require("../cleanse.js");
			html = "<head><title>Testing</title></head><p>Hello World</p>";
			assert.equal("Hello World",cleanse(html));
			assert.equal("Testing Hello World",cleanse(html,{head:false}));
			//NOTE: testing to ensure that settings aren't saved between calls.
			assert.equal("Hello World",cleanse(html));
		});
		it('should handle > inside of a html entities attribute',function(){
			var cleanse = require("../cleanse.js");
			var html = "<p><img src='...' alt='This image is > most images.' />Hello World</p>";
			assert.equal("Hello World",cleanse(html));
		})
	});
	describe("configure",function(){
		it("should allow selective removal and cleansing",function(){
			var cleanse = require("../cleanse.js");
			var html = "<head><title>Testing</title></head><p>Hello World</p>";
			cleanse.configure({head:true,html:false});
			assert.equal("<p>Hello World</p>",cleanse(html));
		})
	})
});