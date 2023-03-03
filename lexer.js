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

                default:
                    break;
            }

            this.#cursor++;

        }
    }
    
}