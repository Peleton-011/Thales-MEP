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
        const reachedEnd = this.#cursor >= this.#tokenStream.length;
        const correctType = type === this.#currentToken().type;
    
        if (!correctType) {
            throw new Error(`Expected token type: ${type} but found ${this.#currentToken().type}`);
        }
        if (!reachedEnd) {
            this.#cursor += 1;
        }
    }

    constructor (input) {
        this.#tokenStream = input;
    }

    #operations = [
        ["add", "sub"],
        ["mul", "div"],
    ]

    #depth = this.#operations.length;

    parse (currDepth = 0, carry) {
        console.log("parse", currDepth, JSON.stringify(carry, null, 4), this.#operations[currDepth]);

        if (currDepth >= this.#depth) {
            return this.#parseFactor();
        }

        carry = carry || this.parse(currDepth + 1);

        const operation = this.#currentToken().type;
        const opInCurrDepth = this.#operations[currDepth].includes(operation) || false;
        
        console.log(operation, this.#operations[currDepth], opInCurrDepth);
        console.log("carry", currDepth, JSON.stringify(carry, null, 4));
        
        if (!opInCurrDepth || operation === "eof") {
            return carry;
        }

        this.#consume(operation);
        const newTerm = this.parse(currDepth + 1);
        console.log("nTerm", currDepth, JSON.stringify(newTerm, null, 4));
        console.log("carry", currDepth, JSON.stringify(carry, null, 4));
        console.log(operation)
        carry = newToken(operation, carry, newTerm);
        console.log("nCarry", currDepth, JSON.stringify(carry, null, 4));
        this.parse(currDepth, carry);
    }

    #parseFactor () {
        const currType = this.#currentToken().type;
        const currToken = this.#currentToken();
        console.log(currToken, currType);
        switch (currType) {
            case "id":
            case "int":
                const result = currToken;
                this.#consume(currType);
                return result;
            case "lparen":
                this.#consume("lparen");
                const innerExpr = this.parse();
                //if innerExpr == null -> Error
                if (currType!== "rparen") {
                    return new Error("Expected ')'");
                } else {
                    this.#consume("rparen");
                    return innerExpr;
                }
            case "rparen":
                return currToken;
            case "negate":
                this.#consume("negate");
                return new Negate(this.#parseFactor());
            case "eof":
                return currToken;
            default:
                return new Error(`Expected token type: id, int, lparen, rparen, negate`);

        }
    }
}

module.exports = {Parser};