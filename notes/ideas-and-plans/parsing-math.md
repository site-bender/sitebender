# Parsing math equations as calculation shortcut

Our system of using JSX for declarative calculations is wonderful and extremely powerful, but can be quite verbose. Consider this example:

```tsx
<Calculate>
  <Add>
    <Divide type="Integer">
      <Dividend>
        <From.Constant type="Integer">99</From.Constant>
      </Dividend>
      <Divisor>
        <From.Element id="divisor" type="Integer" />{" "}
        {/* Can use any injector */}
      </Divisor>
    </Divide>
    <Divide type="Integer">
      <Dividend>
        <From.Constant type="Integer">44</From.Constant>
      </Dividend>
      <Divisor>
        <From.Constant type="Integer">2</From.Constant>
      </Divisor>
    </Divide>
  </Add>
</Calculate>
```

What if we could do this optionally?

```tsx
<Calculate formula="(a / b) + (c / d)">
  <Set.Variable name="a" type="Integer">
    99
  </Set.Variable>
  <Set.Variable name="b" type="Integer">
    <From.Element id="divisor" type="Integer" /> {/* Can use any injector */}
  </Set.Variable>
  <Set.Variable name="c" type="Integer">
    44
  </Set.Variable>
  <Set.Variable name="d" type="Integer">
    2
  </Set.Variable>
</Calculate>
```

To do this we need to be able to parse the `formula`. Here is an approach to that using ANTLR4 and TypeScript:

## ANTLR4 Grammar for Mathematical Expressions with TypeScript Target

Here is a complete solution using ANTLR4 to generate a TypeScript parser for mathematical formulas. This will include the grammar file, instructions for generating the parser, and example TypeScript code to use the generated parser.

### ANTLR4 Grammar (MathExpr.g4)

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

### Generating the TypeScript Parser

1. First, install ANTLR4 and the TypeScript target:

```bash
# Install ANTLR4 (if you haven't already)
npm install -g antlr4ts

# Or download the JAR from https://www.antlr.org/download.html
```

2. Generate the TypeScript parser files:

```bash
# Using the ANTLR4 tool
antlr4 -Dlanguage=TypeScript MathExpr.g4 -visitor

# Or using the JAR
java -jar antlr-4.9.3-complete.jar -Dlanguage=TypeScript MathExpr.g4 -visitor
```

This will generate several TypeScript files including:

- `MathExprLexer.ts`
- `MathExprParser.ts`
- `MathExprVisitor.ts`
- `MathExprListener.ts`

## TypeScript Evaluation Code

Create a file `MathEvaluator.ts`:

```typescript
import { CharStreams, CommonTokenStream } from "antlr4ts";
import { MathExprLexer } from "./MathExprLexer";
import { MathExprParser } from "./MathExprParser";
import { AbstractParseTreeVisitor } from "antlr4ts/tree/AbstractParseTreeVisitor";
import { MathExprVisitor } from "./MathExprVisitor";

// Define the interface for variable values
interface VariableValues {
  [key: string]: number;
}

// Custom visitor to evaluate expressions
class MathEvalVisitor
  extends AbstractParseTreeVisitor<number>
  implements MathExprVisitor<number>
{
  private variables: VariableValues;

  constructor(variables: VariableValues = {}) {
    super();
    this.variables = variables;
  }

  protected defaultResult(): number {
    return 0;
  }

  visitExpression(ctx: MathExprParser.ExpressionContext): number {
    return this.visit(ctx.logicalExpression());
  }

  visitLogicalExpression(ctx: MathExprParser.LogicalExpressionContext): number {
    let result = this.visit(ctx.comparisonExpression(0));

    for (let i = 1; i < ctx.comparisonExpression().length; i++) {
      const operator = ctx._operator[i - 1].text;
      const right = this.visit(ctx.comparisonExpression(i));

      if (operator === "&&") {
        result = result && right ? 1 : 0;
      } else if (operator === "||") {
        result = result || right ? 1 : 0;
      }
    }

    return result;
  }

  visitComparisonExpression(
    ctx: MathExprParser.ComparisonExpressionContext,
  ): number {
    let result = this.visit(ctx.additiveExpression(0));

    for (let i = 1; i < ctx.additiveExpression().length; i++) {
      const operator = ctx._operator[i - 1].text;
      const right = this.visit(ctx.additiveExpression(i));

      switch (operator) {
        case "==":
          result = result === right ? 1 : 0;
          break;
        case "!=":
          result = result !== right ? 1 : 0;
          break;
        case "<":
          result = result < right ? 1 : 0;
          break;
        case "<=":
          result = result <= right ? 1 : 0;
          break;
        case ">":
          result = result > right ? 1 : 0;
          break;
        case ">=":
          result = result >= right ? 1 : 0;
          break;
      }
    }

    return result;
  }

  visitAdditiveExpression(
    ctx: MathExprParser.AdditiveExpressionContext,
  ): number {
    let result = this.visit(ctx.multiplicativeExpression(0));

    for (let i = 1; i < ctx.multiplicativeExpression().length; i++) {
      const operator = ctx._operator[i - 1].text;
      const right = this.visit(ctx.multiplicativeExpression(i));

      if (operator === "+") {
        result += right;
      } else if (operator === "-") {
        result -= right;
      }
    }

    return result;
  }

  visitMultiplicativeExpression(
    ctx: MathExprParser.MultiplicativeExpressionContext,
  ): number {
    let result = this.visit(ctx.powerExpression(0));

    for (let i = 1; i < ctx.powerExpression().length; i++) {
      const operator = ctx._operator[i - 1].text;
      const right = this.visit(ctx.powerExpression(i));

      if (operator === "*") {
        result *= right;
      } else if (operator === "/") {
        result /= right;
      }
    }

    return result;
  }

  visitPowerExpression(ctx: MathExprParser.PowerExpressionContext): number {
    let result = this.visit(ctx.unaryExpression(0));

    for (let i = 1; i < ctx.unaryExpression().length; i++) {
      const right = this.visit(ctx.unaryExpression(i));
      result = Math.pow(result, right);
    }

    return result;
  }

  visitUnaryExpression(ctx: MathExprParser.UnaryExpressionContext): number {
    if (ctx._operator) {
      const operator = ctx._operator.text;
      const value = this.visit(ctx.unaryExpression());

      if (operator === "-") {
        return -value;
      } else if (operator === "+") {
        return value;
      }
    }

    return this.visit(ctx.primaryExpression());
  }

  visitPrimaryExpression(ctx: MathExprParser.PrimaryExpressionContext): number {
    if (ctx.NUMBER()) {
      return parseFloat(ctx.NUMBER().text);
    } else if (ctx.CONSTANT()) {
      const constant = ctx.CONSTANT().text;
      switch (constant) {
        case "PI":
          return Math.PI;
        case "E":
          return Math.E;
        default:
          throw new Error(`Unknown constant: ${constant}`);
      }
    } else if (ctx.VARIABLE()) {
      const varName = ctx.VARIABLE().text;
      if (this.variables[varName] !== undefined) {
        return this.variables[varName];
      } else {
        throw new Error(`Undefined variable: ${varName}`);
      }
    } else if (ctx.expression()) {
      return this.visit(ctx.expression());
    } else if (ctx.functionCall()) {
      return this.visit(ctx.functionCall());
    }

    return 0;
  }

  visitFunctionCall(ctx: MathExprParser.FunctionCallContext): number {
    const funcName = ctx.FUNCTION_NAME().text;
    const args = ctx.expression()
      ? ctx.expression().map((expr) => this.visit(expr))
      : [];

    switch (funcName) {
      case "sin":
        return Math.sin(args[0]);
      case "cos":
        return Math.cos(args[0]);
      case "tan":
        return Math.tan(args[0]);
      case "sqrt":
        return Math.sqrt(args[0]);
      case "log":
        return args.length > 1
          ? Math.log(args[0]) / Math.log(args[1])
          : Math.log(args[0]);
      case "abs":
        return Math.abs(args[0]);
      case "max":
        return Math.max(...args);
      case "min":
        return Math.min(...args);
      default:
        throw new Error(`Unknown function: ${funcName}`);
    }
  }
}

// Function to parse and evaluate a mathematical expression
export function evaluateExpression(
  expression: string,
  variables: VariableValues = {},
): number {
  const inputStream = CharStreams.fromString(expression);
  const lexer = new MathExprLexer(inputStream);
  const tokenStream = new CommonTokenStream(lexer);
  const parser = new MathExprParser(tokenStream);

  const tree = parser.expression();
  const visitor = new MathEvalVisitor(variables);

  return visitor.visit(tree);
}

// Function to create an evaluator function
export function createEvaluator(
  expression: string,
): (variables: VariableValues) => number {
  return (variables: VariableValues = {}) => {
    return evaluateExpression(expression, variables);
  };
}
```

### Usage Example

Create a file `main.ts` to demonstrate usage:

```typescript
import { evaluateExpression, createEvaluator } from "./MathEvaluator";

// Example 1: Direct evaluation
const result1 = evaluateExpression("(a + b) * PI / 2", { a: 3, b: 5 });
console.log(`Result 1: ${result1}`);

// Example 2: Create a reusable evaluator function
const areaOfCircle = createEvaluator("PI * r^2");
const area = areaOfCircle({ r: 5 });
console.log(`Area of circle with radius 5: ${area}`);

// Example 3: More complex expression with function
const complexResult = evaluateExpression("sin(PI/2) + max(3, 7, 2)", {});
console.log(`Complex result: ${complexResult}`);

// Example 4: Expression with comparison
const comparisonResult = evaluateExpression("x > 5 && y < 10", { x: 7, y: 8 });
console.log(`Comparison result: ${comparisonResult}`); // 1 for true, 0 for false
```

### Setup and Execution

1. Install the required dependencies:

```bash
npm install antlr4ts
```

2. Compile and run the TypeScript code:

```bash
# If using tsc
tsc && node main.js

# If using ts-node
ts-node main.ts
```

### Key Features

1. **Variables**: Lowercase identifiers (e.g., `x`, `radius`)
2. **Constants**: Uppercase identifiers (e.g., `PI`, `E`)
3. **Operations**: Basic arithmetic (`+`, `-`, `*`, `/`), exponentiation (`^`), comparisons (`==`, `!=`, `<`, `<=`, `>`, `>=`), and logical operations (`&&`, `||`)
4. **Functions**: Common mathematical functions (`sin`, `cos`, `tan`, `sqrt`, `log`, `abs`, `max`, `min`)
5. **Parentheses**: Full support for grouping expressions
6. **Error Handling**: Proper error reporting for undefined variables and functions

This solution provides a complete ANTLR4 grammar for mathematical expressions and a TypeScript-based evaluator that can parse expressions and evaluate them with provided variable values.

Question: **Can this be done in a strictly FP manner?**
