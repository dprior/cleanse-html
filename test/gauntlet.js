var assert = require("assert");
var cleanse = null;
describe("cleanse-html",function(){
	beforeEach(function(){
		cleanse = require("../cleanse.js");
	})
	describe("cleanse",function(){
		it("should return Hello World after removing various html tags",function(){
			var html = "<p>Hello World</p>";
			assert.equal("Hello World",cleanse(html));
		});
		it('should not permanently set settings that are passed in to the cleanse function',function(){
			html = "<head><title>Testing</title></head><p>Hello World</p>";
			assert.equal("Hello World",cleanse(html));
			assert.equal("Testing Hello World",cleanse(html,{head:false}));
			//NOTE: testing to ensure that settings aren't saved between calls.
			assert.equal("Hello World",cleanse(html));
		});
		it('should handle > inside of a html entities attribute',function(){
			var html = "<p><img src='...' alt='This image is > most images.' />Hello World</p>";
			assert.equal("Hello World",cleanse(html));
		});
		it('should handle "> inside of a html entities attribute',function(){
			var html = "<span test='t\">e'>Hello</span><span test='st'/>World</span>"; //NOTE: fun html code here!
			assert.equal("Hello World",cleanse(html));
		});
		it('should handle either quote (single or duoble)',function(){
			var html = "<span test='t\">e'>Hello</span><span test=\"st>\"/>World</span>"; //NOTE: more fun html code
			assert.equal("Hello World",cleanse(html));
		});
		it('should handle html attributes like "checked" that don\'t require assignment',function(){
			var html = "<input type=\"checkbox\" checked>Hello World</input>"; //NOTE: more fun html code
			assert.equal("Hello World",cleanse(html));
		});
	});
	describe("configure",function(){
		it("should allow selective removal and cleansing",function(){
			var html = "<head><title>Testing</title></head><p>Hello World</p>";
			cleanse.configure({head:true,html:false});
			assert.equal("<p>Hello World</p>",cleanse(html));
		});
	})
});