const TokenTypes = {
    PLUS: "PLUS",
    MINUS: "MINUS",
    MULTIPLY: "MULTIPLY",
    DIVIDE: "DIVIDE",
    INTEGER: "INTEGER",
    EOF: "EOF"
}

export default class Lexer {

    #stream = "";
    #cursor = 0;

    #at () {
        return this.#stream[this.#cursor];
    }

    #createToken (type, value) {

    }


    tokenize (input = "") {
        this.#stream = input;
        this.#cursor = 0;

        const tokens = [];

        //continue through the stream
        while (this.#cursor < this.#stream.length) {
            switch (this.#at()) {

                case " ":
                case "\t":
                case "\n":
                case "\r":
                    break;

                case "+":
                    tokens.push(this.#createToken(TokenTypes.PLUS));
                case "-":
                    tokens.push(this.#createToken(TokenTypes.MINUS));
                case "*":
                    tokens.push(this.#createToken(TokenTypes.MULTIPLY));
                case "/":
                    tokens.push(this.#createToken(TokenTypes.DIVIDE));

                default:

                    if(isNumeric(this.#at())) {
                        let strNumber = "";

                        while (this.#cursor > this.#stream.length && isNumeric(this.#at())) {
                            strNumber += this.#at();
                            this.#cursor++;
                        }

                        tokens.push(this.#createToken(TokenTypes.INTEGER, parseInt(strNumber)));

                        this.#cursor--;
                        
                    }
                    else {
                        throw new Error(`Unexpected character: ${this.#at()} \n At position: ${this.#cursor}`);
                    }
                    break;
            }

            this.#cursor++;

        }
    }
    
}

function isNumeric(char) {
    //We use an ASCII range of 48-57 (0-9)
    return char.charCodeAt(0) >= 48 && char.charCodeAt(0) <= 57;
}