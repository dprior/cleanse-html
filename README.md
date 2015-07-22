# mongo-atm

Simple tool to remove html from a string and returns a string of plain text

## Installation

```javascript
npm install cleanse-html
```

## Simple Examples

```javascript
var cleanse = require('cleanse-html');
var html = '<p>Hello World</p>';

console.log(cleanse(html)); // Hello World

//To select things you want to keep, pass an options object as the second parameter
//or call configure() with the options object (see below for options)
html = "<head><title>Testing</title></head><p>Hello World</p>";
console.log(cleanse(html,{head:false})); // Testing Hello World

cleanse.configure({head:true,html:false});
console.log(cleanse(html)); // <p>Hello World</p>
```

## API

**Create instance**

```javascript
var cleanse = require('cleanse-html');
```

- - -

**Clease text**

```javascript
cleanse(string,options);
```

  * **string** is the text that you want to cleanse.
  * **options** is an optional settings object describing what to cleanse:
    * **entity** (bool) remove/ignore HTML entities (names and numbers). Defaults to true.
    * **head** (bool) remove/ignore <head> section. Defaults to true.
    * **script** (bool) remove/ignore <script> section. Defaults to true.
    * **iframe** (bool) remove/ignore <iframe>. Defaults to true.
    * **style** (bool) remove/ignore <style> section. Defaults to true.
    * **html** (bool) remove/ignore standard HTML tags. Defaulte to true.