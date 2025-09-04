# @sitebender/maths

Pure TypeScript formula parser for mathematical expressions. Compiles formula strings to @sitebender/engine configuration objects.

## Installation

```bash
deno add @sitebender/maths
```

## Usage

```typescript
import { parseFormula } from "@sitebender/maths"

// Define variables with injector configurations
const variables = {
  a: { tag: "Constant", type: "injector", datatype: "Integer", value: 99 },
  b: { tag: "FromElement", type: "injector", datatype: "Integer", source: "#divisor" },
  c: { tag: "Constant", type: "injector", datatype: "Integer", value: 44 },
  d: { tag: "Constant", type: "injector", datatype: "Integer", value: 2 }
}

// Parse formula into engine configuration
const result = parseFormula("(a / b) + (c / d)", variables)

if (result.ok) {
  console.log(result.value) // Engine configuration object
} else {
  console.error(result.error) // Parse error details
}
```

## Features

### Phase 1 (Current)
- ✅ Basic arithmetic: `+`, `-`, `*`, `/`, `^`
- ✅ Parentheses for grouping
- ✅ Variables (lowercase identifiers)
- ✅ Unary operators: `+`, `-`
- ✅ Type inference from variables
- ✅ All injector types supported (Constant, FromElement, etc.)

### Phase 2 (Planned)
- Comparison operators: `<`, `<=`, `>`, `>=`, `==`, `!=`
- Logical operators: `&&`, `||`

### Phase 3 (Future)
- Mathematical functions: `sin`, `cos`, `sqrt`, `max`, `min`
- Constants: `PI`, `E`

## Operator Precedence

From highest to lowest:
1. Parentheses `()`
2. Exponentiation `^` (right-associative)
3. Unary `+`, `-`
4. Multiplication/Division `*`, `/` (left-associative)
5. Addition/Subtraction `+`, `-` (left-associative)

## Type System

- Default numeric type: `"Number"`
- Type inference: When all variables share the same numeric type, that type is used
- Mixed types: Default to `"Number"`
- Supported types: `Number`, `Integer`, `Float`, `Precision`

## Error Handling

The parser uses a Result type for error handling:

```typescript
type Result<T, E> = { ok: true; value: T } | { ok: false; error: E }
```

Common errors:
- Undefined variables
- Syntax errors
- Mismatched parentheses
- Invalid characters

## Development

```bash
# Run tests
deno task test

# Run with coverage
deno task test:cov

# Type check
deno task type-check

# Lint
deno task lint

# Format
deno task fmt
```

## Architecture

Pure functional TypeScript with:
- Tokenizer for lexical analysis
- Pratt parser with precedence climbing
- Compiler using @sitebender/engine constructors
- Zero external dependencies
- Comprehensive test coverage