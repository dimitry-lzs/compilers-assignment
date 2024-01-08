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

class TreeNode {
    constructor(value) {
        this.value = value;
        this.children = [];
    }

    addChild(node) {
        this.children.push(node);
    }
}


const terminalCharacters = ["(", ")", "*", "+", "-", "a", "b"];

const isTermnial = (character) => terminalCharacters.includes(character);

function generateIsEmpty(production) {
    const [, right] = production.split('>');

    return !right;
}

function M(nonTerminal, character) {
    return production = rulesTable[nonTerminal]?.[character];
}

function terminate() {
    console.log("String is not recognized");
}

function parse(input) {
    function stackPush(production, currentNode) {
        const [, right] = production.split('>');
        right.split('').reverse().forEach(char => {
            const newNode = new TreeNode(char);
            currentNode.addChild(newNode);
            stack.push({ symbol: char, node: newNode });
        });
        console.log(stack.map(s => s.symbol).join(''));
    }
    function stackPop(print) {
        if (stack.length < 1) terminate();
        if (print) console.log(stack.map(s => s.symbol).join(''));
    }

    const root = new TreeNode('G');
    const stack = [{ symbol: '$', node: null }, { symbol: 'G', node: root }];
    input += "$";

    console.log(stack.map(s => s.symbol).join(''));

    for (let character of input) {
        let topStack = stack[stack.length - 1];

        if (topStack.symbol === '$') {
            if (character !== '$') {
                return terminate();
            } else {
                break;
            }
        }

        if (topStack.symbol === character) {
            stackPop(true);
            continue;
        }

        while (!isTermnial(topStack.symbol)) {
            stackPop(false);
            const production = M(topStack.symbol, character);

            if (!production) return terminate();

            if (!generateIsEmpty(production)) {
                stackPush(production, topStack.node);
            } else {
                console.log(stack.map(s => s.symbol).join(''));
            }

            topStack = stack[stack.length - 1];
        }

        if (topStack.symbol === character) {
            stackPop(true);
        } else {
            return terminate();
        }

        console.log(stack.map(s => s.symbol).join(''));
    }

    console.log("String is recognized");
    printTree(root);
}


function printTree(node, level = 0) {
    if (!node) return;
    // Indentation for the current level
    const indent = ' '.repeat(level * 2);

    // Print the current node
    console.log(indent + node.value);

    // Recursively print children in their original order
    node.children.forEach(child => {
        printTree(child, level + 1);
    });
}


parse("(((b*a))*a*b)");

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

for (let array of [validStrings, validInvalidStrings, invalidStrings]) {
    for (let string of array) {
        parse(string);
    }
}
