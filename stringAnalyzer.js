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

const terminalCharacters = ["(", ")", "*", "+", "-", "a", "b"];

const isTermnial = (character) => terminalCharacters.includes(character);

function stackPush(production) {
    if (!production) {
        return;
    }
    const [, right] = production.split('>');
    stack.push(
        ...right.split('').reverse()
    )
}

function M(nonTerminal, character) {
    return production = rulesTable[nonTerminal][character];
}

const stack = ['$'];

function parse(input) {
    input = input + "$";

    let production = rulesTable['G']['('];

    stackPush(production);


    for (let character of input) {
        let top = stack.pop();

        while (top === 'e') {
            top = stack.pop();
        }

        if (top === character) {
            continue;
        } else {
            stack.push(top)
        }

        while (!isTermnial(top)) {
            production = M(top, character);
            stackPush(production);
            top = stack.pop();
        }
        console.log(stack.join(''))
    }
}

parse("((a-b)*(a+b))");