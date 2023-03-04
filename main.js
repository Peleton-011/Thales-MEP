const util = require('util');

const {Lexer} = require("./lexer.js");
const {Parser} = require("./parser.js");

const lexer = new Lexer();

const expression = "(2 - 10) * 23 - 4";
const tokens = lexer.tokenize(expression);
 
const parser = new Parser(tokens);

const ast = parser.parse();

console.log(util.inspect(ast, {showHidden: false, depth: null}));

