//hello
#include <stdio.h>
#include <stdlib.h>
#include <time.h>

void generate_Z(char *result, int *pos, int depth);
void generate_K(char *result, int *pos, int depth);
void generate_G(char *result, int *pos, int depth);
void generate_M(char *result, int *pos, int depth);

int main()
{
    srand(time(NULL));       // Seed the random number generator
    char result[1000] = {0}; // Buffer for the resulting string and set it to zero
    int pos = 0;             // Current position in the string buffer
    generate_Z(result, &pos, 0);
    printf("Generated string: %s\n", result);
    return 0;
}

void generate_Z(char *result, int *pos, int depth)
{
    result[(*pos)++] = '(';
    printf("Applied rule <Z> ::= (<K>)\n");
    printf("Generated string: %s\n", result);
    generate_K(result, pos, depth + 1);
    result[(*pos)++] = ')';
}

void generate_K(char *result, int *pos, int depth)
{
    printf("Applied rule <K> ::= <G><M>\n");
    generate_G(result, pos, depth);
    generate_M(result, pos, depth);
}

void generate_G(char *result, int *pos, int depth)
{
    int choice = rand() % 2;
    if (choice == 0 || depth >= 10) // Limiting the depth to prevent infinite recursion
    {
        printf("Applied rule <G> ::= v\n");
        result[(*pos)++] = 'v';
        printf("Generated string: %s\n", result);
    }
    else
    {
        printf("Applied rule <G> ::= <Z>\n");
        generate_Z(result, pos, depth + 1);
    }
}

void generate_M(char *result, int *pos, int depth)
{
    int choice = depth < 10 ? rand() % 3 : 2; // Set choice to 2 if depth is greater than 10 so that the empty string (epsilon) is generated

    if (choice == 0)
    {
        result[(*pos)++] = '-';
        printf("Applied rule <M> ::= -<K>\n");
        printf("Generated string: %s\n", result);
        generate_K(result, pos, depth + 1);
    }
    else if (choice == 1)
    {
        result[(*pos)++] = '+';
        printf("Applied rule <M> ::= +<K>\n");
        printf("Generated string: %s\n", result);
        generate_K(result, pos, depth + 1);
    }
    // If choice is 2, do nothing to add the empty string (epsilon)
    else
    {
        printf("Applied rule <M> ::= e\n");
        printf("Generated string: %s\n", result);
    }
}
