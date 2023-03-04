
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

//To-Do: Actual implementation of the modulo operator

class Mod extends BinaryTreeNode {

}

class Negate extends TreeNode {

}

//To-Do: Actual implementation of the inverse operator

class Inverse extends TreeNode {

}

class ID extends TreeNode {

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

//const a = new Sub(new Int(2), new Int(3));

//console.log(a.eval());
//console.log(a.print());