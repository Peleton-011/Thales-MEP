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
    
    //Ordered by precedence
    #operations = [
        ["add", "sub"],
        ["mul", "div", "mod", "inv"],
        ["pow"]
    ]

    #opDepth = this.#operations.length;

    parse () {

        //Parse commands
        //Parse expressions

        //How to make it all work well?????
    }

    #parseExpr (currDepth = 0, carryResult) {

        

        if (currDepth >= this.#opDepth) {
            return this.#parseFactor();
        }

        carryResult = carryResult || this.#parseExpr(currDepth + 1);

        const operation = () => this.#currentToken().type;
        const opInCurrDepth = () => this.#operations[currDepth].includes(operation()) || false;
        
        while (opInCurrDepth()) {
            const currOp = operation();

            this.#consume(currOp);
            const newTerm = this.#parseExpr(currDepth + 1);
            //This ensures its read left-to-right
            carryResult = newToken(currOp, carryResult, newTerm);
        }
        return carryResult;
    }

    #parseFactor () {
        const currType = this.#currentToken().type;
        const currToken = this.#currentToken();

        switch (currType) {
            case "id":
            case "int":
                const result = currToken;
                this.#consume(currType);
                return result;
            case "lparen":
                this.#consume("lparen");
                const innerExpr = this.#parseExpr();
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
            default:
                throw new Error(`Expected token type: id, int, lparen, rparen, negate found ${currType}`);

        }
    }

    #parseCommand () {

    }
}

module.exports = {Parser};