const { TokenTypes } = require("./lexer");

class Parser {

    //#scanner;

    #tokens = [];
    #cursor = 0;

    #at () {
        return this.#tokens[this.#cursor];
    }

    #peek (n = 1) {
        return this.#tokens[this.#cursor + n];
    }

    #consume (tokenType) {
        if (this.#at().type === tokenType) {
            this.#cursor++;
        } else {
            throw new Error(`Expected token type: ${tokenType} but found ${this.#at().type}`);
            
        }
    }

    constructor(tokens) {
        //this.#scanner = new Scanner(tokens);
        this.#tokens = tokens;
    }
}