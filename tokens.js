
//For context, here Negate == Opposite and Inverse == Reciprocal

class TreeNode {

    eval() {
        return 0;
    }

    print() {
        return ""
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

    constructor (left, right) {
        super(left, right);
    }

    operator = "+";

    eval() {
        return this.left.eval() + this.right.eval();
    }

}

//To-Do: decide if Subtract(a,b) should be replaced with Add(a, new Negate(b))

class Sub extends BinaryTreeNode {

    constructor (left, right) {
        super(left, right);
    }

    operator = "-";
    
    eval() {
        return this.left.eval() - this.right.eval();
    }
}

class Mult extends BinaryTreeNode {

    constructor (left, right) {
        super(left, right);
    }

    operator = "*";

    eval() {
        return this.left.eval() * this.right.eval();
    }
}

//To-Do: decide if Divide(a,b) should be replaced with Mult(a, new Inverse(b))

class Div extends BinaryTreeNode {

    constructor (left, right) {
        super(left, right);
    }

    operator = "/";

    eval() {
        return this.left.eval() / this.right.eval();
    }
}

class Mod extends BinaryTreeNode {
    constructor (left, right) {
        super(left, right);
    }

    operator = "%";

    eval() {
        return this.left.eval() % this.right.eval();
    }
}

class Negate extends TreeNode {

    node;

    constructor (node) {
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

class Inverse extends TreeNode {
    
    node;

    constructor (node) {
        super();
        this.node = node;
    }

    eval() {
        return 1/(this.node.eval());
    }

    print() {
        return `1/(${this.node.print()})`;
    }
}

// To-Do: Improve ID implementation
// To-Do: Implement Power(a,b) and Root(a,b) etc...

class ID extends TreeNode {

    id;

    constructor (id) {
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

function newToken(type = "") {

    const args = Array.prototype.slice.call(arguments, 1);

    switch (type) {
        case "ID":
            return new ID(...args);
        case "Int":
            return new Int(...args);
        case "Add":
            return new Add(...args);
        case "Sub":
            return new Sub(...args);
        case "Mult":
            return new Mult(...args);
        case "Div":
            return new Div(...args);
        case "Mod":
            return new Mod(...args);
        case "Negate":
            return new Negate(...args);
        case "Inverse":
            return new Inverse(...args);

        default:

            break;
    }
    

}

//const a = new Sub(new Int(2), new Int(3));

//console.log(a.eval());
//console.log(a.print());

module.exports = {
    newToken
}