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

const terminalCharacters = ["(", ")", "*", "+", "-", "a", "b", "$"];

const isTermnial = (character) => terminalCharacters.includes(character);

function generateIsEmpty(production) {
    const [, right] = production.split('>');

    return !right;
}

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
    process.exit(0);
}

function M(nonTerminal, character) {
    return production = rulesTable[nonTerminal]?.[character];
}

const stack = ['$', 'G'];

function parse(input) {
    input = input + "$";

    console.log(stack.join(''));

    for (let character of input) {
        let top = stack[stack.length - 1];

        if (top === character) {
            stackPop();
            continue;
        }

        while (!isTermnial(top)) {
            stackPop(false);
            production = M(top, character);

            if (!production) terminate();

            if (!generateIsEmpty(production)) {
                stackPush(production);
            } else {
                console.log(stack.join(''));
            }

            top = stack[stack.length - 1];
        }

        if (top === character) {
            stackPop();
        } else {
            terminate();
        }

        console.log(stack.join(''));
    }

    console.log("String is recognized");
}

parse("((a-b)*(a+b))");