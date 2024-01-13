#ifndef NODE_H
#define NODE_H

#include <iostream>
#include <vector>

class Node {
  public:
    Node(char name);
    ~Node();

    void push(const std::string &production);

    Node *getNextNode();
    char getName();

  private:
    char name;
    Node *parent;
    Node *nextNode;
    std::vector<Node *> *children;

    void setParent(Node *parent);
    void addChild(Node *child);
    Node *climbUp();
    Node *searchNextNode(Node *currentNode);
    void setNextNode();
};

#endif // NODE_H
