#include <iostream>
#include <stack>
#include <string>

// Solution is written by Tsalmpo https://github.com/Tsalmpo

using namespace std;

class AutomatoStoivas
{
private:
    stack<char> stoiva;

    void printStack() const
    {
        stack<char> tempStack = stoiva;
        while (!tempStack.empty())
        {
            cout << tempStack.top();
            tempStack.pop();
        }
        cout << endl;
    }

public:
    bool processExpression(const string &expression)
    {
        for (char c : expression)
        {
            if (c == 'x')
            {
                stoiva.push('x');
                cout << "Push X --> Stack: ";
                printStack();
            }
            else if (c == 'y')
            {
                if (!stoiva.empty() && stoiva.top() == 'x')
                {
                    stoiva.pop();
                    cout << "Pop X --> Stack:  ";
                    printStack();
                }
                else
                {
                    cout << "Expression Rejected: 'y' does not match to a 'x'";
                    return false;
                }
            }
        }
        if (stoiva.empty())
        {
            cout << "Expression Accepted!\n";
            return true;
        }
        else
        {
            cout << "Expression Rejected: 'x' does not match to a 'y'\n";
            return false;
        }
    }
};

int main()
{
    AutomatoStoivas automato;
    string expression;
    cout << "Type expression: ";
    cin >> expression;
    automato.processExpression(expression);
    return 0;
}