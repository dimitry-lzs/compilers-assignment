#include "node.h"

bool isTerminal(char character);
bool generateIsEmpty(const std::string &production);

Node::Node(char name) {
    this->name = name;
    this->parent = nullptr;
    this->children = !isTerminal(this->name) ? new std::vector<Node *>() : nullptr;
}

Node::~Node() {
    if (this->children != nullptr) {
        for (Node *child : *this->children) {
            delete child;
        }
    }
}

void Node::push(const std::string &production) {
    size_t position = production.find('>');
    std::string right = production.substr(position + 1);

    if (right.length() == 0) {
        right = "e";
    }

    for (int i = 0; i < right.length(); i++) {
        char character = right[i];

        Node *child = new Node(character);
        this->addChild(child);
    }
    this->setNextNode();
}

Node *Node::getNextNode() { return this->nextNode; }

char Node::getName() { return this->name; }

void Node::setParent(Node *parent) { this->parent = parent; }

void Node::addChild(Node *child) {
    if (children != nullptr) {
        child->setParent(this);
        this->children->push_back(child);
    } else {
        std::cerr << "Cannot add children to a terminal node" << std::endl;
    }
}

Node *Node::climbUp() { return this->parent; }

Node *Node::searchNextNode(Node *currentNode) {

    for (Node *child : *currentNode->children) {
        if (!isTerminal(child->getName()) && child->children != nullptr) {
            return child;
        }
    }

    return nullptr;
}

void Node::setNextNode() {
    Node *currentNode = this;
    Node *nextNode = this->searchNextNode(currentNode);

    while (!nextNode && currentNode->parent) {
        currentNode = currentNode->climbUp();
        nextNode = this->searchNextNode(currentNode);
    }

    if (nextNode) {
        this->nextNode = nextNode;
    } else {
        std::cout << "No next node found" << std::endl;
    }
}
