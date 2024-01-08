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

function generateIsEmpty(production) {
    const [, right] = production.split('>');

    return !right;
}

function M(nonTerminal, character) {
    return production = rulesTable[nonTerminal]?.[character];
}


function parse(input) {
    console.log("Parsing string: " + input);
    const stack = ['$', 'G'];
    input = input + "$";

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

for (let string of invalidStrings) {
    parse(string);
}
