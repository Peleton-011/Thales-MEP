const { Lexer } = require("./lexer.js");
const { Parser } = require("./parser.js");

const outputDiv = document.createElement("div");
outputDiv.id = "output";
outputDiv.style = "white-space: pre;";

const lexer = new Lexer();

const expression = "";
const tokens = lexer.tokenize(expression);

const parser = new Parser(tokens);

const ast = parser.parse();

fullOutput(ast);

function fullOutput(tree) {
    //output the expression
    output(`Input: ${expression} \r\n`);
    //output the result
    output(`Evaluates to: ${tree.eval()} \r\n`);
    //output the printed tree
    output(`Prints as: \r\n ${tree.print()} \r\n`);
    //output the object representation
    output(`Parse tree: \r\n ${printParseTree(tree)}`);
}

function printParseTree (tree) {
    let result = JSON.stringify(tree, null, 4);
    result = result.replaceAll("\"", "");
    return result;
} 

function output(content) {
    outputDiv.textContent += content + "\r\n";
    const oldOutput = document.getElementById("output");
    if (oldOutput) document.body.removeChild(oldOutput);
    document.body.appendChild(outputDiv);
}
