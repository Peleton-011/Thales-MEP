
const { newToken } = require('./tokens');

class Lexer {
    #stream = "";
    #cursor = 0;

    #currentChar () {
        return this.#stream[this.#cursor]
    }

    
}

//console.log(newToken("Add", newToken("Int", 2), newToken("Int", 2)).print());
