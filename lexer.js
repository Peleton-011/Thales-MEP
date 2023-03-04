const TokenTypes = {
    PLUS: "PLUS",
    MINUS: "MINUS",
    MULTIPLY: "MULTIPLY",
    DIVIDE: "DIVIDE",
    INTEGER: "INTEGER",
    EOF: "EOF"
}

class Lexer {

    #stream = "";
    #cursor = 0;

    #at () {
        return this.#stream[this.#cursor];
    }

    #createToken (type, value) {
        return {
            type: type,
            value: value,
        }
    }


    tokenize (input = "") {
        this.#stream = input;
        this.#cursor = 0;

        const tokens = [];

        //continue through the stream
        while (this.#cursor < this.#stream.length) {
            switch (this.#at()) {

                case " ":

                    break;

                case "+":
                    tokens.push(this.#createToken(TokenTypes.PLUS));
                    break;

                case "-":
                    tokens.push(this.#createToken(TokenTypes.MINUS));
                    break;

                case "*":
                    tokens.push(this.#createToken(TokenTypes.MULTIPLY));
                    break;

                case "/":
                    tokens.push(this.#createToken(TokenTypes.DIVIDE));
                    break;

                default:

                    if(isNumeric(this.#at())) {
                        let strNumber = "";

                        while (this.#cursor < this.#stream.length && isNumeric(this.#at())) {
                            strNumber += this.#at();
                            this.#cursor++;
                        }

                        tokens.push(this.#createToken(TokenTypes.INTEGER, parseInt(strNumber)));

                        this.#cursor--;
                        
                    }
                    else {
                        throw new Error(`Unexpected character: ${this.#at()}  at position: ${this.#cursor}`);

                    }
                    break;
            }

            this.#cursor++;

        }

        tokens.push(this.#createToken(TokenTypes.EOF));
        return tokens;
    }
    
}

function isNumeric(char) {
    //We use an ASCII range of 48-57 (0-9)
    return char.charCodeAt(0) >= 48 && char.charCodeAt(0) <= 57;
}

module.exports = {
    Lexer, TokenTypes
}