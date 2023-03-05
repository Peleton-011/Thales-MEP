const { newToken } = require('./tokens');

class Parser {
    
    #tokenStream = [];
    #cursor = 0;

    #currentToken () {
        return this.#tokenStream[this.#cursor];
    }

    #peek (n = 1) {
        return this.#tokenStream[this.#cursor + n];
    }

    #consume (type) {
        if (this.#currentToken().type === type) {
            this.#cursor += 1;
        } else {
            throw new Error(`Expected token type: ${type} but found ${this.#currentToken().type}`);
        }
    }

    constructor (input) {
        this.#tokenStream = input;
    }

    #operations = [
        ["add", "sub"],
        ["mul", "div"],
    ]

    #depth = this.#operations.length - 1;

    parse (depth = 0, carry = this.#parse(1)) {

        if (depth === this.#depth) {
            return this.#parseFactor();
        }

        const tokenType = this.#currentToken().type;
        
        if (!(tokenType in this.#operations[depth])) {
            return carry;
        }
        this.#consume(tokenType);
        const right = this.#parse(depth + 1, carry);
        carry = newToken(tokenType, carry, right);
        this.#parse(carry);
    }

    #parseFactor () {
        switch (this.#currentToken().type) {
            case "id":
            case "int":
                return this.#currentToken;
            case "lparen":
                this.#consume();
                const innerExpr = this.#parseExpr();
                //if innerExpr == null -> Error
                if (this.#currentToken().type!== "rparen") {
                    return new Error("Expected ')'");
                } else {
                    this.#consume();
                    return innerExpr;
                }
            case "negate":
                this.#consume();
                return new Negate(this.#parseFactor());
            default:
                return new Error(`Expected token type: id, int, lparen, rparen, negate`);

        }
    }
}