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

    parse () {
        return this.#parseExpression();
    }

    //Addition/Subtraction
    #parseExpression () {
        let leftTerm = this.#parseTerm();

        while (this.#at().type === TokenTypes.PLUS || this.#at().type === TokenTypes.MINUS) {
            const operation = this.#at().type;

            this.#consume(operation);

            let rightTerm = this.#parseExpression();

            //Might want to include that the operator is a binary operator vv
            leftTerm = {type: operation/*TokenTypes.OPERATOR*/, value: operation, left: leftTerm, right: rightTerm}
            //leftTerm = new Term(leftTerm, operation, rightTerm);
        }

        return leftTerm;
    }

    //Multiplication / Division
    #parseTerm () {
        let leftFactor = this.#parseFactor();

        while (this.#at().type === TokenTypes.MULTIPLY || this.#at().type === TokenTypes.DIVIDE) {
            const operation = this.#at().type;

            this.#consume(operation);
            
            let rightFactor = this.#parseTerm();

            leftFactor = {type: operation/*TokenTypes.OPERATOR*/, value: operation, left: leftFactor, right: rightFactor};

        }
        
        return leftFactor;
    }

    //Highest precedence
    #parseFactor () {

        if (this.#at().type === TokenTypes.INTEGER) {
            let literal = {type: "NumericLiteral", value: this.#at().value};
            this.#consume(TokenTypes.INTEGER);
            return literal;
        }
        
        //Parenthesized expression
        this.#consume(TokenTypes.LPAREN);
        
        let expression

        while (this.#at().type !== TokenTypes.RPAREN) {
            expression = this.#parseExpression();
        }

        this.#consume(TokenTypes.RPAREN);

        return expression;
    }
}

module.exports = {Parser};