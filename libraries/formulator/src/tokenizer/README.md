# Formulator Tokenizer (Phase 2)

> **Pure functional semantic token stream generator with Result monad error handling**

## Status: ✅ Complete

**Tests**: 42/42 passing (unit + property-based + integration)

## What Is This?

The tokenizer consumes the lexer's **character stream** and produces a **semantic token stream**. It groups consecutive characters into meaningful units (numbers, identifiers, operators) and handles symbol mapping.

## Input/Output

**Input**: Formula string (same as lexer)
**Output**: Generator yielding `Result<string, Token>`

```typescript
// Input
"sin(alpha * PI) + 3.14"

// Output stream
Ok({ type: "identifier", value: "sin", position: 0 })
Ok({ type: "leftParen", value: "(", position: 3 })
Ok({ type: "identifier", value: "α", position: 4 }) // "alpha" → "α"
Ok({ type: "multiply", value: "*", position: 10 })
Ok({ type: "identifier", value: "π", position: 12 }) // "PI" → "π"
Ok({ type: "rightParen", value: ")", position: 14 })
Ok({ type: "plus", value: "+", position: 16 })
Ok({ type: "number", value: "3.14", position: 18 })
```

## Architecture

### File Structure

```
src/tokenizer/
├── index.ts                    # Main tokenizer generator (9 tests)
├── index.test.ts
├── types/
│   └── index.ts                # Token, TokenType definitions
├── constants/
│   └── index.ts                # Greek/constant/function maps
├── parseNumber/                # Number parser (12 tests)
│   ├── index.ts
│   └── index.test.ts
├── parseIdentifier/            # Identifier parser (12 tests)
│   ├── index.ts
│   └── index.test.ts
├── parseOperator/              # Operator parser (6 tests)
│   ├── index.ts
│   └── index.test.ts
└── parsePunctuation/           # Punctuation parser (3 tests)
    ├── index.ts
    └── index.test.ts
```

### Design Decisions

#### 1. Result Monad for Error Handling

**Why**: Tokenization is sequential and fail-fast. One malformed token invalidates subsequent parsing.

```typescript
// Success
yield { _tag: "Ok", value: { type: "number", value: "123", position: 0 }}

// Error
yield { _tag: "Error", error: "Invalid number format at position 5" }
```

#### 2. Curried, Data-Last Functions

All parsers follow the studio convention:

```typescript
parseNumber(input: string)(position: number): Result<string, [Token, number]>
parseIdentifier(input: string)(position: number): Result<string, [Token, number]>
```

#### 3. Symbol Mapping

Greek letters and constants are mapped during tokenization:

- `"alpha"` → `"α"` (Greek letter)
- `"Alpha"` → `"Α"` (uppercase Greek)
- `"PI"`, `"Pi"`, `"pi"` → `"π"` (constant)
- `"sin"`, `"cos"`, etc. → preserved as-is (function names)

#### 4. Generator-Based Streaming

Same as lexer - lazy evaluation with while loops as implementation detail:

```typescript
export default function* tokenizer(
	input: string,
): Generator<Result<string, Token>> {
	const lexerTokens = Array.from(lexer(input)) // Materialize for lookahead
	let position = 0

	while (position < lexerTokens.length) {
		// Tokenization logic
	}
}
```

## Token Types

```typescript
export type TokenType =
	| "number" // 123, 3.14, -99, +42, .5
	| "identifier" // variables, functions, Greek letters, constants
	| "plus" // +
	| "minus" // -
	| "multiply" // *, ×, ·, ⋅, ∗
	| "divide" // /, ÷, ∕
	| "power" // ^, ‸
	| "leftParen" // (, ❨
	| "rightParen" // ), ❩
	| "comma" // ,
	| "lessThan" // <
	| "greaterThan" // >
	| "lessThanOrEqual" // <= (multi-char)
	| "greaterThanOrEqual" // >= (multi-char)
	| "equalTo" // == (multi-char)
	| "notEqual" // != (multi-char)
	| "and" // && (multi-char)
	| "or" // || (multi-char)
	| "xor" // ^^ (multi-char)
	| "implies" // -> (multi-char)
	| "exclamation" // !
```

## Key Features

### Number Parsing

- **Integers**: `123`
- **Decimals**: `3.14`
- **Leading signs**: `+42`, `-99`
- **Decimal starting with dot**: `.5`
- **Validation**: Rejects `3.14.159` (multiple decimal points)

### Identifier Parsing

- **Variables**: `x`, `myVar`, `foo`
- **Greek letters**: `alpha` → `α`, `Beta` → `Β`
- **Constants**: `PI` → `π`, `E` → `e`, `PHI` → `φ`
- **Functions**: `sin`, `cos`, `sqrt` (preserved as-is)

### Multi-Character Operators

Uses lexer's `checkTwoCharacterOperator` for:

- `<=` → `lessThanOrEqual`
- `>=` → `greaterThanOrEqual`
- `==` → `equalTo`
- `!=` → `notEqual`
- `&&` → `and`
- `||` → `or`
- `^^` → `xor`
- `->` → `implies`

## Testing

### Unit Tests (33 tests)

- `parseNumber`: 12 tests (integers, decimals, signs, errors)
- `parseIdentifier`: 12 tests (variables, Greek, constants, functions)
- `parseOperator`: 6 tests (all operator types)
- `parsePunctuation`: 3 tests (parens)

### Integration Tests (9 tests)

- Simple expressions: `"2 + 3"`
- Functions: `"sin(x)"`
- Greek letters: `"alpha + beta"`
- Constants: `"2 * PI"`
- Decimals: `"3.14 + 2.71"`
- Whitespace handling
- Empty input
- Determinism (property-based)

### Property-Based Tests

Using fast-check:

- Deterministic output for same input
- Consumed characters match token value length
- All token positions are valid

## Usage

```typescript
import tokenizer from "./src/tokenizer/index.ts"

// Basic usage
for (const result of tokenizer("2 + 3")) {
  if (result._tag === "Ok") {
    console.log(result.value)  // { type: "number", value: "2", position: 0 }
  } else {
    console.error(result.error)
  }
}

// CLI test script
deno run test-tokenizer.ts "sin(alpha * PI) + 3.14"
```

## What's Next: Phase 3 - Parser

The parser will consume this token stream and build an Abstract Syntax Tree (AST):

```typescript
Token Stream → Parser → AST

[number, plus, number] → BinaryOp(Plus, Number(2), Number(3))
```

See `docs/prompt.md` for Phase 3 implementation guide.

## Architectural Compliance

✅ **Pure FP**: All functions pure, frozen outputs
✅ **Curried, data-last**: Consistent with studio conventions
✅ **Result monad**: Toolsmith integration for error handling
✅ **Generator-based**: Lazy evaluation with while loops
✅ **TDD**: Tests written first, 100% coverage
✅ **One function per file**: `index.ts` pattern
✅ **Envoy comments**: `//++` for all public functions
✅ **No classes, no mutations**: Pure functional approach
✅ **Property-based testing**: fast-check for invariants
