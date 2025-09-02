# EBNF for math parser

```antlr
grammar MathExpr;

// Parser rules
expression : logicalExpression;

logicalExpression
    : comparisonExpression (('&&' | '||') comparisonExpression)*
    ;

comparisonExpression
    : additiveExpression (('==' | '!=' | '<' | '<=' | '>' | '>=') additiveExpression)*
    ;

additiveExpression
    : multiplicativeExpression (('+' | '-') multiplicativeExpression)*
    ;

multiplicativeExpression
    : powerExpression (('*' | '/') powerExpression)*
    ;

powerExpression
    : unaryExpression ('^' unaryExpression)*
    ;

unaryExpression
    : ('+' | '-') unaryExpression
    | primaryExpression
    ;

primaryExpression
    : NUMBER
    | CONSTANT
    | VARIABLE
    | '(' expression ')'
    | functionCall
    ;

functionCall
    : FUNCTION_NAME '(' (expression (',' expression)*)? ')'
    ;

// Lexer rules
NUMBER : [0-9]+ ('.' [0-9]+)?;
CONSTANT : [A-Z][A-Z0-9_]*;
VARIABLE : [a-zA-Z_][a-zA-Z_0-9]*;
FUNCTION_NAME : [a-zA-Z_][a-zA-Z_0-9]*;

WS : [ \t\r\n]+ -> skip;
```
