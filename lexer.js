export default class Lexer {

    #stream = "";
    #cursor = 0;

    #at () {
        return this.#stream[this.#cursor];
    }


    tokenize (input = "") {
        this.#stream = input;
        this.#cursor = 0;

        //continue through the stream
        while (this.#cursor < this.#stream.length) {
            switch (this.#at()) {

                case " ":
                case "\t":
                case "\n":
                case "\r":
                    break;


                default:
                    break;
            }

            this.#cursor++;

        }
    }
    
}