%{
#include <stdio.h>
%}

%%

^shmeio[ \t]+[A-Z]{1}$ {
    printf("%s: Valid shmeio.\nEnter another input or enter 0 to exit.\n", yytext);
}

^eutheia[ \t]+[A-Z]{2}$ {
    int firstLetter=8;
    int shmeia=2;
    int flag=1;
    for(int i=firstLetter+1;i<firstLetter+shmeia;i++){
        if(yytext[firstLetter]==yytext[i]){
            flag=0;
        }
    }
    if(flag==1){
        printf("%s: Valid eutheia.\nEnter another input or enter 0 to exit.\n", yytext);
    }else{
        printf("Wrong input: %s!\nEnter another input or enter 0 to exit.\n", yytext);
    }
}

^trigwno[ \t]+[A-Z]{3}$ {
    int firstLetter=8;
    int lastLetter=10;
    int flag=1;
    for(int i=firstLetter;i<lastLetter;i++){
        for(int j=i; j<lastLetter;j++){
            if(yytext[i]==yytext[j+1]){
                flag=0;
            }
        }
    }
    if(flag==1){
        printf("%s: Valid trigwno.\nEnter another input or enter 0 to exit.\n", yytext);
    }else{
        printf("Wrong input: %s!\nEnter another input or enter 0 to exit.\n", yytext);
    }
}

^tetragwno[ \t]+[A-Z]{4}$ {
    int firstLetter=10;
    int lastLetter=13;
    int flag=1;
    for(int i=firstLetter;i<lastLetter;i++){
        for(int j=i; j<lastLetter;j++){
            if(yytext[i]==yytext[j+1]){
                flag=0;
            }
        }
    }
    if(flag==1){
        printf("%s: Valid tetragwno.\nEnter another input or enter 0 to exit.\n", yytext);
    }else{
        printf("Wrong input: %s!\nEnter another input or enter 0 to exit.\n", yytext);
    }
}

^pentagwno[ \t]+[A-Z]{5}$ {
    int firstLetter=10;
    int lastLetter=14;
    int flag=1;
    for(int i=firstLetter;i<lastLetter;i++){
        for(int j=i; j<lastLetter;j++){
            if(yytext[i]==yytext[j+1]){
                flag=0;
            }
        }
    }
    if(flag==1){
        printf("%s: Valid pentagwno.\nEnter another input or enter 0 to exit.\n", yytext);
    }else{
        printf("Wrong input: %s!\nEnter another input or enter 0 to exit.\n", yytext);
    }
}

^eksagwno[ \t]+[A-Z]{6}$ {
    int firstLetter=9;
    int lastLetter=14;
    int flag=1;
    for(int i=firstLetter;i<lastLetter;i++){
        for(int j=i; j<lastLetter;j++){
            if(yytext[i]==yytext[j+1]){
                flag=0;
            }
        }
    }
    if(flag==1){
        printf("%s: Valid eksagwno.\nEnter another input or enter 0 to exit.\n", yytext);
    }else{
        printf("Wrong input: %s!\nEnter another input or enter 0 to exit.\n", yytext);
    }
}

^eptagwno[ \t]+[A-Z]{7}$ {
    int firstLetter=9;
    int lastLetter=15;
    int flag=1;
    for(int i=firstLetter;i<lastLetter;i++){
        for(int j=i; j<lastLetter;j++){
            if(yytext[i]==yytext[j+1]){
                flag=0;
            }
        }
    }
    if(flag==1){
        printf("%s: Valid eptagwno.\nEnter another input or enter 0 to exit.\n", yytext);
    }else{
        printf("Wrong input: %s!\nEnter another input or enter 0 to exit.\n", yytext);
    }
}

^oktagwno[ \t]+[A-Z]{8}$ {
    int firstLetter=9;
    int lastLetter=16;
    int flag=1;
    for(int i=firstLetter;i<lastLetter;i++){
        for(int j=i; j<lastLetter;j++){
            if(yytext[i]==yytext[j+1]){
                flag=0;
            }
        }
    }
    if(flag==1){
        printf("%s: Valid oktagwno.\nEnter another input or enter 0 to exit.\n", yytext);
    }else{
        printf("Wrong input: %s!\nEnter another input or enter 0 to exit.\n", yytext);
    }
}

0 {
    printf("Exiting the program.\n");
    exit(0);
}

.+ {
    printf("Wrong input: %s!\nEnter another input or enter 0 to exit.\n", yytext);
}

%%

int yywrap() {
    return 1; // indicate end of input
}

int main() {
printf("Available phrases are:\n1.shmeio\n2.eutheia\n3.trigwno\n4.tetragwno\n5.pentagwno\n6.eksagwno\n7.eptagwno\n8.oktagwno\nPlease enter your input (or enter '0' to exit): ");
    yylex();
    return 0;
}