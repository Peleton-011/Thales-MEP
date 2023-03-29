//For context, here Negate == Opposite and Inverse == Reciprocal

class TreeNode {
    type = "node";

    eval() {
        return 0;
    }

    print() {
        return "";
    }
}

class BinaryTreeNode extends TreeNode {
    left;
    right;
    operator;

    constructor(left, right) {
        super();

        this.left = left;
        this.right = right;
    }

    eval() {
        return this.left.eval() + this.right.eval();
    }

    print() {
        return `(${this.left.print()} ${this.operator} ${this.right.print()})`;
    }
}

class Add extends BinaryTreeNode {
    type = "add";

    constructor(left, right) {
        super(left, right);
    }

    operator = "+";

    eval() {
        return this.left.eval() + this.right.eval();
    }
}

//To-Do: decide if Subtract(a,b) should be replaced with Add(a, new Negate(b))

class Sub extends BinaryTreeNode {
    type = "sub";

    constructor(left, right) {
        super(left, right);
    }

    operator = "-";

    eval() {
        return this.left.eval() - this.right.eval();
    }
}

class Mul extends BinaryTreeNode {
    type = "mul";

    constructor(left, right) {
        super(left, right);
    }

    operator = "*";

    eval() {
        return this.left.eval() * this.right.eval();
    }
}

class Pow extends BinaryTreeNode {
    type = "pow";

    constructor(left, right) {
        super(left, right);
    }

    operator = "^";

    eval() {
        return this.left.eval() ** this.right.eval();
    }
}

//To-Do: decide if Divide(a,b) should be replaced with Mult(a, new Inverse(b))

class Div extends BinaryTreeNode {
    type = "div";

    constructor(left, right) {
        super(left, right);
    }

    operator = "/";

    eval() {
        return this.left.eval() / this.right.eval();
    }
}

class Mod extends BinaryTreeNode {
    type = "mod";

    constructor(left, right) {
        super(left, right);
    }

    operator = "%";

    eval() {
        return this.left.eval() % this.right.eval();
    }
}

class Negate extends TreeNode {
    type = "negate";

    node;

    constructor(node) {
        super();
        this.node = node;
    }

    eval() {
        return -this.node.eval();
    }

    print() {
        return `-(${this.node.print()})`;
    }
}

class Inv extends TreeNode {
    type = "inv";

    node;

    constructor(node) {
        super();
        this.node = node;
    }

    eval() {
        return 1 / this.node.eval();
    }

    print() {
        return `1/(${this.node.print()})`;
    }
}

// To-Do: Improve ID implementation
// To-Do: Implement Power(a,b) and Root(a,b) etc...

class ID extends TreeNode {
    type = "id";

    id;

    constructor(id) {
        super();
        this.id = id;
    }

    eval() {
        return this.id;
    }

    print() {
        return this.id;
    }
}

class Int extends TreeNode {
    type = "int";

    value;

    constructor(value) {
        super();

        this.value = value;
    }

    eval() {
        return this.value;
    }

    print() {
        return String(this.value);
    }
}

class LParen extends TreeNode {
    type = "lparen";

    constructor() {
        super();
    }
}

class RParen extends TreeNode {
    type = "rparen";

    constructor() {
        super();
    }
}

class EOF extends TreeNode {
    type = "eof";

    constructor() {
        super();
    }
}

//##############################################################################################################
//
//  Commands vv
//
//##############################################################################################################

class Command extends TreeNode {
    type = "cmd";

    constructor() {
        super();
    }
};

class Return extends Command {

    type = "return";
    #expr;

    constructor(expr){
        super(...arguments)
        this.#expr = expr;
    }

    eval () {
        return this.#expr;
    }
}

class Print extends Command {

    constructor(){
        super(...arguments)
    }
}

class Eval extends Command {

    constructor(){
        super(...arguments)
    }
}

function newToken(type = "") {
    const args = Array.prototype.slice.call(arguments, 1);

    switch (type.toLowerCase()) {
        case "id":
            return new ID(...args);
        case "int":
            return new Int(...args);
        case "add":
        case "+":
            return new Add(...args);
        case "sub":
        case "-":
            return new Sub(...args);
        case "mul":
        case "*":
            return new Mul(...args);
        case "pow":
        case "^":
            return new Pow(...args);
        case "div":
        case "/":
            return new Div(...args);
        case "mod":
        case "%":
            return new Mod(...args);
        case "negate":
        case "neg":
            return new Negate(...args);
        case "inverse":
        case "inv":
            return new Inv(...args);
        case "lparen":
        case "lp":
        case "(":
            return new LParen(...args);
        case "rparen":
        case "rp":
        case ")":
            return new RParen(...args);
        case "eof":
            return new EOF();

        default:
            throw new Error("Unknown type: " + type);
            break;
    }
}

function newCmdToken(cmdStr) {
    const args = Array.prototype.slice.call(arguments, 1);

    switch (cmdStr) {
        case "return":
            return new Return(...args);
        case "print":
            return new Print(...args);
        case "eval":
            return new Eval(...args);
        default:
            throw new Error("Unknown command: " + cmdStr);
            break;
    }
}

//const a = new Sub(new Int(2), new Int(3));

//console.log(a.eval());
//console.log(a.print());

module.exports = {
    newToken,
    newCmdToken,
};
