#include <iostream>
#include <map>
#include <string>
#include <set>

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

int main()
{
    initializeRulesTable();
    initializeTerminalCharacters();

    std::string key1 = "M";
    std::string key2 = "a";

    if (isTerminal('a'))
    {
        std::cout << "The character is a terminal character." << std::endl;
    }
    else
    {
        std::cout << "The character is not a terminal character." << std::endl;
    }

    if (rulesTable.find(key1) != rulesTable.end() &&
        rulesTable[key1].find(key2) != rulesTable[key1].end())
    {
        std::cout << "Value for [" << key1 << "][" << key2 << "]: "
                  << rulesTable[key1][key2] << std::endl;
    }
    else
    {
        std::cout << "Key combination not found." << std::endl;
    }

    std::string nonTerminal = "M";
    std::string character = "a";
    const std::string *production = M(nonTerminal, character);

    if (production)
    {
        std::cout << "Production: " << *production << std::endl;
    }
    else
    {
        std::cout << "No production found." << std::endl;
    }

    return 0;
}
