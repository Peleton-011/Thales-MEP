
const { newToken } = require('./tokens');

class Lexer {
    #stream = "";
    #cursor = 0;

    #currentChar () {
        return this.#stream[this.#cursor]
    }

    tokenize (input = "") {
        this.#stream = input;
        
        const tokens = [];
        
        for (this.#cursor = 0; this.#cursor < this.#stream.length; this.#cursor++) {

            switch (this.#currentChar()) {
                
                case " ":
                    break;

                case "+":
                case "-":
                case "*":
                case "/":
                    tokens.push(newToken(this.#currentChar()));
                    break;
                
                case "(":
                    tokens.push(newToken("("));
                    break;
                case ")":
                    tokens.push(newToken(")"));
                    break;
                default:
                    if (!isDigit(this.#currentChar())) {
                        throw new Error(`Unexpected character: ${this.#currentChar()}  at position: ${this.#cursor}`);
                    }
                    
            }
        }   
    }
}

function isDigit (char) {
    return char >= "0" && char <= "9";
}

//console.log(newToken("Add", newToken("Int", 2), newToken("Int", 2)).print());
