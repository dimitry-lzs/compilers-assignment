#!/usr/bin/env python3
stack = []

expression = input("Input expression: ")

stackError = False

for i in expression:
    try:
        if i == 'x':
            print('Stack: ', stack, ', Pushing X')
            stack.append(i)
        elif i == 'y':
            print('Stack: ', stack, ', Popping X', stack)
            stack.pop()
    except IndexError:
        stackError = True
        break

if stackError or len(stack) > 0:
    print("Invalid expression given")
else:
    print("Valid expression")