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
      Here is an approach using a small, pure TypeScript parser (Pratt or recursive-descent) with zero Java/ANTLR dependencies. Keep the operator set aligned with Calculate primitives, start numeric-only, and grow features incrementally. Add thorough unit tests and property-based tests for safety.
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

# Moved

This note has moved to `ideas/parsing-math.md`.
