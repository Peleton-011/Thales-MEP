const { newToken, newCmdToken } = require("./tokens");

class Lexer {
    #stream = "";
    #cursor = 0;

    #currentChar() {
        return this.#stream[this.#cursor];
    }

    tokenize(input = "") {
        this.#stream = input;

        const tokens = [];

        for (
            this.#cursor = 0;
            this.#cursor < this.#stream.length;
            this.#cursor++
        ) {
            const digit = /\d/;
            const character = /[a-zA-Z]/;
            
            if (digit.test(this.#currentChar())) {
                let strNumber = "";

                while (
                    digit.test(this.#currentChar()) &&
                    this.#cursor < this.#stream.length
                ) {
                    strNumber += this.#currentChar();
                    this.#cursor++;
                }

                this.#cursor--;
                tokens.push(newToken("Int", parseInt(strNumber)));
            }

            if (character.test(this.#currentChar())) {
                let strCmd = "";

                while (
                    character.test(this.#currentChar()) &&
                    this.#cursor < this.#stream.length
                ) {
                    strCmd += this.#currentChar();
                    this.#cursor++;
                }

                // this.#cursor--;
                tokens.push(newCmdToken(strCmd));
            }

            switch (this.#currentChar()) {
                case " ":
                    break;

                case "+":
                case "-":
                case "*":
                case "/":
                case "^":
                case "%":
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
                        throw new Error(
                            `Unexpected character: ${this.#currentChar()}  at position: ${
                                this.#cursor
                            }`
                        );
                    }
                    break;
            }
        }
        tokens.push(newToken("EOF"));
        return tokens;
    }
}

function isDigit(char) {
    return char >= "0" && char <= "9";
}

module.exports = { Lexer };
//console.log(newToken("Add", newToken("Int", 2), newToken("Int", 2)).print());
//const lexer = new Lexer();

//const a = lexer.tokenize("2 + 3 / 4");

//console.log(a);
