# Plan: Maths reference and parser alignment

## Goals

- Document parser's supported operations and precedence
- Provide clear numeric semantics and type handling
- Align with engine constructor capabilities

## Operator Precedence (Highest to Lowest)

1. Parentheses: `()`
2. Functions: `sin()`, `cos()`, `sqrt()`, etc.
3. Exponentiation: `^` (right-associative)
4. Unary: `+`, `-`, `!`
5. Multiplication/Division: `*`, `/`, `%` (left-associative)
6. Addition/Subtraction: `+`, `-` (left-associative)
7. Comparison: `<`, `<=`, `>`, `>=`, `==`, `!=` (left-associative)
8. Logical AND: `&&` (left-associative)
9. Logical OR: `||` (left-associative)

## Supported Operations (Phase 1)

- Basic arithmetic: `+`, `-`, `*`, `/`
- Exponentiation: `^`
- Grouping: `()`
- Variables: lowercase identifiers (a-z, a-z0-9_)

## Type Semantics

- Default numeric type: "Number"
- Type inference from uniform variable types
- Mixed numeric types resolve to "Number"
- String concatenation with `+` when any operand is String
- No implicit type conversions

## Examples

```typescript
// Simple arithmetic
"a + b" // Add two variables
"(a + b) * c" // Grouped addition then multiply
"a / b + c / d" // Two divisions then add

// With types
"a + b" // If both Integer → Integer result
"a + b" // If mixed types → Number result

// Future: Functions
"sqrt(a^2 + b^2)" // Pythagorean theorem
"max(a, b, c)" // Maximum of three values
```

## Test Strategy

- Behavior tests for each operator precedence level
- Property tests for associativity and commutativity
- Integration tests with engine constructors
- Edge cases: division by zero, type mixing
