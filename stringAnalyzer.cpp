#include <iostream>
#include <map>
#include <string>
#include <set>
#include <vector>

// Global declaration of the rulesTable
std::map<std::string, std::map<std::string, std::string> > rulesTable;

void initializeRulesTable()
{
    // Initialize the table with values
    rulesTable["G"]["("] = "G>(M)";
    rulesTable["M"]["("] = "M>YZ";
    rulesTable["M"]["a"] = "M>YZ";
    rulesTable["M"]["b"] = "M>YZ";
    rulesTable["Y"]["("] = "Y>G";
    rulesTable["Y"]["a"] = "Y>a";
    rulesTable["Y"]["b"] = "Y>b";
    rulesTable["Z"][")"] = "Z>";
    rulesTable["Z"]["*"] = "Z>*M";
    rulesTable["Z"]["+"] = "Z>+M";
    rulesTable["Z"]["-"] = "Z>-M";
}

// Global set of terminal characters
std::set<char> terminalCharacters;

// Initialize the terminal characters set
void initializeTerminalCharacters()
{
    terminalCharacters.insert('(');
    terminalCharacters.insert(')');
    terminalCharacters.insert('*');
    terminalCharacters.insert('+');
    terminalCharacters.insert('-');
    terminalCharacters.insert('a');
    terminalCharacters.insert('b');
}

// Function to check if a character is a terminal character
bool isTerminal(char character)
{
    return terminalCharacters.find(character) != terminalCharacters.end();
}

extern std::map<std::string, std::map<std::string, std::string> > rulesTable;

const std::string *M(const std::string &nonTerminal, const std::string &character)
{
    std::map<std::string, std::map<std::string, std::string> >::const_iterator nonTerminalIter = rulesTable.find(nonTerminal);
    if (nonTerminalIter != rulesTable.end())
    {
        const std::map<std::string, std::string> &innerMap = nonTerminalIter->second;
        std::map<std::string, std::string>::const_iterator characterIter = innerMap.find(character);
        if (characterIter != innerMap.end())
        {
            return &(characterIter->second);
        }
    }
    return nullptr; // Return nullptr if not found
}

bool generateIsEmpty(const std::string& production) {
    size_t pos = production.find('>');

    // Check if '>' is found and not at the end of the string
    if (pos != std::string::npos && pos + 1 < production.length()) {
        // Get the substring after '>'
        std::string right = production.substr(pos + 1);

        // Check if the right part is empty
        return right.empty();
    }

    // If '>' is not found or is at the end of the string
    return true;
}

void stackPush(std::vector<char>& stack, const std::string& production) {
    size_t pos = production.find('>');
    if (pos != std::string::npos) {
        std::string right = production.substr(pos + 1);
        for (int i = right.length() - 1; i >= 0; --i) {
            stack.push_back(right[i]);
        }
    }
    for (size_t i = 0; i < stack.size(); ++i) {
        std::cout << stack[i];
    }
    std::cout << std::endl;
}

void stackPop(std::vector<char>& stack, bool print) {
    if (stack.empty()) {
        std::cout << "String is not recognized" << std::endl;
        exit(1);
    }
    stack.pop_back();
    if (print) {
        for (size_t i = 0; i < stack.size(); ++i) {
            std::cout << stack[i];
        }
        std::cout << std::endl;
    }
}

void terminate() {
    std::cout << "String is not recognized" << std::endl;
}

void parse(const std::string& input) {
    std::cout << "Parsing: " << input << std::endl;

    std::vector<char> stack;
    stack.push_back('$');
    stack.push_back('G');
    std::string augmentedInput = input + "$";

    for (size_t j = 0; j < stack.size(); ++j) {
        std::cout << stack[j];
    }

    std::cout << std::endl;

    for (size_t i = 0; i < augmentedInput.length(); ++i) {
        char character = augmentedInput[i];
        char top = stack.back();

        if (top == '$') {
            if (character != '$') {
                return terminate();
            } else {
                break;
            }
        }

        if (top == character) {
            stackPop(stack, true);
            continue;
        }

        while (!isTerminal(top)) {
            stackPop(stack, false);
            const std::string* production = M(std::string(1, top), std::string(1, character));

            if (!production) return terminate();

            if (!generateIsEmpty(*production)) {
                stackPush(stack, *production);
            } else {
                for (size_t j = 0; j < stack.size(); ++j) {
                    std::cout << stack[j];
                }
                std::cout << std::endl;
            }

            top = stack.back();
        }

        if (top == character) {
            stackPop(stack, true);
        } else {
            return terminate();
        }
    }

    std::cout << "String is recognized" << std::endl;
}


int main(int argc, char* argv[])
{
    initializeRulesTable();
    initializeTerminalCharacters();

    // Valid strings tests
    std::vector<std::string> validStrings;
    validStrings.push_back("(a-(b)*b*b)");
    validStrings.push_back("(b+b)");
    validStrings.push_back("(((b*a))*a*b)");
    validStrings.push_back("(b*(a)+(b))");
    validStrings.push_back("((b))");
    validStrings.push_back("(a+a+b*b+a)");
    validStrings.push_back("(b-(b)-b)");
    validStrings.push_back("((a-b*a)-b)");
    validStrings.push_back("(b-b+a-a+a*a+a)");
    validStrings.push_back("(a+(b-a))");
    validStrings.push_back("(b)");
    validStrings.push_back("((a))");
    validStrings.push_back("((b+b))");
    validStrings.push_back("(b*a+b+b+a)");
    validStrings.push_back("(b-a+b*a)");
    validStrings.push_back("((b*(a+a)))");
    validStrings.push_back("((a*(b-a)-a+a))");
    validStrings.push_back("((b-b*b)*a+b*a)");
    validStrings.push_back("((a*a)*b+a)");
    validStrings.push_back("(b-a-b)");
    validStrings.push_back("(a-a*b-b)");
    validStrings.push_back("(((a)+b-(a))-b)");
    validStrings.push_back("(b+b+a-a)");
    validStrings.push_back("((a+b-b))");
    validStrings.push_back("(a*b)");
    validStrings.push_back("(a*a)");
    validStrings.push_back("((b-(b)-b)*a*b)");
    validStrings.push_back("(a+a)");
    validStrings.push_back("(b+b-(a*b)-b)");
    validStrings.push_back("(b*a+b)");

    // Invalid strings tests
    std::vector<std::string> invalidStrings;
    invalidStrings.push_back("(a-a+b*ba)");
    invalidStrings.push_back("(a+b*(a+)+a*a)");
    invalidStrings.push_back("(b-(zb))");
    invalidStrings.push_back("(a*Mb)");
    invalidStrings.push_back("(b*-a)");
    invalidStrings.push_back("(b-af)");
    invalidStrings.push_back("((a-a+b)+b+aa)");
    invalidStrings.push_back("(a+a*a+(a)+f(a))");
    invalidStrings.push_back("(aa)");
    invalidStrings.push_back("(a*a*a*(a(a)))");
    invalidStrings.push_back("(aa)");
    invalidStrings.push_back("((b-b*a)*a))");
    invalidStrings.push_back("(a-a*a-a*a+)");
    invalidStrings.push_back("(ab)");
    invalidStrings.push_back("(b+)");
    invalidStrings.push_back("(a*a-a-ab)");
    invalidStrings.push_back("(a+aa+b)");
    invalidStrings.push_back("(b*a*aa)");
    invalidStrings.push_back("(b*bb+a)");
    invalidStrings.push_back("(a-a+a--a)");

    // Uncomment the following lines to test the parser on the valid and invalid strings

    // for (size_t i = 0; i < validStrings.size(); ++i) {
    //     parse(validStrings[i]);
    // }

    // for (size_t i = 0; i < invalidStrings.size(); ++i) {
    //     parse(invalidStrings[i]);
    // }

    std::string toParse;

    // Check if a command-line argument is provided
    if (argc > 1) {
        toParse = argv[1];
    } else {
        // No argument provided, prompt the user for input
        std::cout << "Enter string to parse (leave empty for default): ";
        std::getline(std::cin, toParse);

        // If user input is empty, use a predefined string
        if (toParse.empty()) {
            toParse = "((a-b)*(a+b))";
        }
    }

    parse(toParse);
    return 0;
}
