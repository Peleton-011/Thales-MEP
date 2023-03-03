const {Lexer} = require("./lexer.js");

const lexer = new Lexer();

const expression = "10 - 2";

console.log(lexer.tokenize(expression));

