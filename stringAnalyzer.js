const rulesTable = {
    "G": {
        "(": "G>(M)"
    },
    "M": {
        "(": "M>YZ",
        "a": "M>YZ",
        "b": "M>YZ"
    },
    "Y": {
        "(": "Y>G",
        "a": "Y>a",
        "b": "Y>b"
    },
    "Z": {
        ")": "Z>",
        "*": "Z>*M",
        "+": "Z>+M",
        "-": "Z>-M"
    }
}

class Node {
    constructor(name) {
        this.name = name;
        this.done = false;
        this.parent = null;

        isTermnial(this.name) ? this.children = undefined : this.children = [];
    }

    climbUp() {
        return this.parent;
    }

    setParent(parent) {
        this.parent = parent;
    }

    push(production) {
        let [, rule] = production.split('>');

        if (generateIsEmpty(production)) {
            rule = 'ε';
        }

        this.done = true;

        for (let character of rule) {
            const node = new Node(character);
            node.setParent(this);
            this.children.push(node);
        }

        this.setNextNode();
    }

    setNextNode() {
        let currentNode = this;
        let nextNode = null;

        function findNode() {
            for (let node of currentNode.children) {
                if (node.name !== currentNode.name && !isTermnial(node.name) && !node.done) {
                    nextNode = node;
                    break;
                }
            }
        }

        findNode();

        while (!nextNode && currentNode.parent) {
            findNode();
            currentNode = currentNode.parent;
        }

        if (!nextNode) {
            console.log("No next node");
        }

        this.nextNode = nextNode;
    }

    get getNextNode() {
        return this.nextNode;
    }
}

const terminalCharacters = ["(", ")", "*", "+", "-", "a", "b", 'ε'];

const isTermnial = (character) => terminalCharacters.includes(character);

function generateIsEmpty(production) {
    const [, right] = production.split('>');

    return !right;
}

function M(nonTerminal, character) {
    return production = rulesTable[nonTerminal]?.[character];
}

function prettyPrintTree(tree, prefix = '', isLast = true) {
    const connector = isLast ? '└── ' : '├── ';
    console.log(`${prefix}${connector}${tree.name}`);

    const newPrefix = prefix + (isLast ? '    ' : '│   ');
    tree.children?.reverse()?.forEach((child, index) => {
        const isChildLast = index === tree.children.length - 1;
        prettyPrintTree(child, newPrefix, isChildLast);
    });
}


function parse(input) {
    console.log("Parsing string: " + input);
    const stack = ['$', 'G'];
    input = input + "$";

    let node = new Node(stack[stack.length - 1]);
    let root = node;

    function stackPush(production) {
        const [, right] = production.split('>');
        stack.push(
            ...right.split('').reverse()
        )
        console.log(stack.join(''));
    }

    function stackPop(print) {
        if (stack.length < 1) terminate();
        stack.pop();
        if (print) console.log(stack.join(''));
    }

    function terminate() {
        console.log("String is not recognized");
    }

    console.log(stack.join(''));

    for (let character of input) {
        let top = stack[stack.length - 1];

        if (top === '$') {
            if (character !== '$') {
                return terminate();
            } else {
                break;
            }
        }

        if (top === character) {
            stackPop();
            continue;
        }

        while (!isTermnial(top)) {
            stackPop(false);
            production = M(top, character);

            if (!production) return terminate();

            if (!generateIsEmpty(production)) {
                stackPush(production);
            } else {
                console.log(stack.join(''));
            }

            node.push(production);
            node = node.getNextNode;
            top = stack[stack.length - 1];
        }

        if (top === character) {
            stackPop();
        } else {
            return terminate();
        }

        console.log(stack.join(''));
    }

    console.log("String is recognized");

    function printNodes(nodes) {

        let childs = [];

        for (let node of nodes) {
            childs.push(...node.children);
        }

        console.log(childs.map(child => child.name).join(' '));

        if (childs.filter(child => child.children?.length).length > 0) {
            printNodes(childs.filter(child => child.children));
        }
    }

    // printNodes([root]);
    prettyPrintTree(root);
}

parse("((a-b)*(a+b))");

const validStrings = [
    '(a-(b)*b*b)',
    '(b+b)',
    '(((b*a))*a*b)',
    '(b*(a)+(b))',
    '((b))',
    '(a+a+b*b+a)',
    '(b-(b)-b)',
    '((a-b*a)-b)',
    '(b-b+a-a+a*a+a)',
    '(a+(b-a))',
    '(b)',
    '((a))',
    '((b+b))',
    '(b*a+b+b+a)',
    '(b-a+b*a)',
    '((b*(a+a)))',
    '((a*(b-a)-a+a))',
    '((b-b*b)*a+b*a)',
    '((a*a)*b+a)',
    '(b-a-b)',
    '(a-a*b-b)',
    '(((a)+b-(a))-b)',
    '(b+b+a-a)',
    '((a+b-b))',
    '(a*b)',
    '(a*a)',
    '((b-(b)-b)*a*b)',
    '(a+a)',
    '(b+b-(a*b)-b)',
    '(b*a+b)'];

const validInvalidStrings = [
    '(a-(b)*b*b)',
    '(b+b)',
    '(((b*a))*a*b)',
    '(b*(a)+(b))',
    '((b))',
    '(a+a+b*b+a)',
    '(b-(b)-b)',
    '((a-b*a)-b)',
    '(b-b+a-a+a*a+a)',
    '(a+(b-a))',
    '(b)',
    '((a))',
    '((b+b))',
    '(b*a+b+b+a)',
    '(b-a+b*a)',
    '((b*(a+a)))',
    '((a*(b-a)-aa+a))',
    '((b-b*b)*a+b*a)',
    '((a*a)*b+a)',
    '(b-a-b)',
    '(a-a*b-b)',
    '(((a)+b-(a))-b)',
    '(b+b+a-a)',
    '((a+b-b))',
    '(a*b)',
    '(a*a)',
    '((b-(b)-b)*a*b)',
    '(a+a)',
    '(b+b-(a*b)-b)',
    '(b*a+b)'];

const invalidStrings = [
    '(a-a+b*ba)',
    '(a+b*(a+)+a*a)',
    '(b-(zb))',
    '(a*Mb)',
    '(b*-a)',
    '(b-af)',
    '((a-a+b)+b+aa)',
    '(a+a*a+(a)+f(a))',
    '(aa)',
    '(a*a*a*(a(a)))',
    '(aa)',
    '((b-b*a)*a))',
    '(a-a*a-a*a+)',
    '(ab)',
    '(b+)',
    '(a*a-a-ab)',
    '(a+aa+b)',
    '(b*a*aa)',
    '(b*bb+a)',
    '(a-a+a--a)'
]

// for (let string of invalidStrings) {
//     parse(string);
// }
