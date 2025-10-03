# Formulator Phase 3: Parser Implementation Guide

> **For Future AI: Read this first before touching any code**

---

## Context: Where We Are

**Formulator** is a pure functional TypeScript parser for mathematical formulas in the @sitebender/studio ecosystem.

**Your branch:** `ai/formulator`

**Project Status:**

- ✅ **Phase 1: Lexer** - Character-level classification (56 tests passing)
- ✅ **Phase 2: Tokenizer** - Semantic token stream (42 tests passing)
- 🚧 **Phase 3: Parser** - AST construction (YOU ARE HERE)
- ⏳ **Phase 4: Compiler** - Architect IR generation (future)

**Total Tests Passing**: 98

**Critical:** This is a **pure FP, zero-dependencies, Deno-only** project following strict architectural principles.

---

## STEP 1: Read These Files In Order

### Required Reading (20 minutes)

1. **`/docs/studio-overview.yaml`** (lines 1-285)
   - Studio philosophy and constraints
   - Pure FP rules (no classes, no mutations, no loops outside generators)
   - Privacy conventions (underscore folders)
   - Testing requirements (TDD, property-based, no mocking)

2. **`libraries/formulator/docs/plan.md`** (entire file)
   - Overall architecture (Lexer → Tokenizer → Parser → Compiler)
   - Core philosophy ("Write TypeScript as if it were Haskell")
   - Implementation status

3. **`libraries/formulator/src/lexer/README.md`**
   - Phase 1: Character classification
   - What the lexer outputs

4. **`libraries/formulator/src/tokenizer/README.md`**
   - Phase 2: Semantic token generation
   - What tokens look like
   - Symbol mapping (Greek letters, constants)

5. **`libraries/formulator/docs/missing-functions.md`**
   - Toolsmith boxed functions available
   - Result vs Validation monad usage
   - When to use Result (sequential, fail-fast) vs Validation (tree, accumulate)

### Optional Context

- **`libraries/formulator/README.md`** - High-level project overview
- **`libraries/warden/README.md`** - Architectural governance rules
- **`libraries/toolsmith/src/boxed/EXAMPLES.md`** - Boxed function examples

---

## STEP 2: Understand What's Already Done

### Phase 1: Lexer ✅ COMPLETE

**Location:** `libraries/formulator/src/lexer/`

**What it does:**

- Takes input string `"2 * π + α²"`
- Yields lazy stream of character tokens with specific classifications:
  ```typescript
  { char: "2", position: 0, charClass: { tag: "digit", char: "2" } }
  { char: "*", position: 2, charClass: { tag: "multiply", char: "*" } }
  { char: "π", position: 4, charClass: { tag: "pi", char: "π" } }
  ```

**Key features:**

- O(1) Unicode character code maps (not RegEx!)
- Specific classifications: `Letter` vs `letter`, `alpha` vs `Alpha`, etc.
- Generator-based lazy evaluation
- 56 passing tests

**Test it:**

```bash
deno run libraries/formulator/test-lexer.ts "your formula here"
```

### Phase 2: Tokenizer ✅ COMPLETE

**Location:** `libraries/formulator/src/tokenizer/`

**What it does:**

- Consumes lexer's character stream
- Groups characters into semantic tokens:
  ```typescript
  { type: "number", value: "123", position: 0 }
  { type: "identifier", value: "α", position: 4 }  // "alpha" → "α"
  { type: "plus", value: "+", position: 6 }
  ```

**Key features:**

- Number parsing (integers, decimals, signed)
- Identifier parsing with Greek letter/constant mapping
- Result monad error handling
- 42 passing tests

**Test it:**

```bash
deno run libraries/formulator/test-tokenizer.ts "sin(alpha * PI) + 3.14"
```

### What's NOT Done Yet

- ❌ **Parser** (Phase 3) - You will build this
- ❌ **Compiler** (Phase 4) - Future work

---

## STEP 3: Your Mission - Build The Parser

### What Is The Parser?

The parser **consumes the tokenizer's token stream** and **produces an Abstract Syntax Tree (AST)**.

**Input:** Stream of `Result<string, Token>` (from tokenizer)
**Output:** `Result<string, ASTNode>` (single result, not a stream)

### Architecture

```
Tokenizer Output → Parser → AST
Result<string, Token>[]    Result<string, ASTNode>
```

### Parser Responsibilities

1. **Build Expression Tree**
   - Parse infix expressions: `2 + 3 * 4` → `Plus(2, Multiply(3, 4))`
   - Handle operator precedence (PEMDAS)
   - Handle associativity (left vs right)

2. **Parse Function Calls**
   - Recognize function syntax: `sin(x)` → `FunctionCall("sin", [Var("x")])`
   - Handle multiple arguments: `max(1, 2, 3)` → `FunctionCall("max", [...])`

3. **Parse Parenthesized Expressions**
   - Override precedence: `(2 + 3) * 4` → `Multiply(Plus(2, 3), 4)`

4. **Handle Variables and Constants**
   - Variables: `x`, `y`, `myVar`
   - Constants: `π`, `e` (already mapped by tokenizer)
   - Greek letters: `α`, `β` (already mapped by tokenizer)

5. **Error Handling**
   - Missing operands: `2 +` → error
   - Unbalanced parens: `(2 + 3` → error
   - Invalid syntax: `2 3` → error
   - Use **Result monad** (fail-fast)

### Critical Design Decisions

#### Decision 1: AST Node Types

Define clear AST node types:

```typescript
// src/parser/types/index.ts
export type ASTNode =
	| { tag: "number"; value: number; position: number }
	| { tag: "variable"; name: string; position: number }
	| {
		tag: "binaryOp"
		op: BinaryOperator
		left: ASTNode
		right: ASTNode
		position: number
	}
	| { tag: "unaryOp"; op: UnaryOperator; operand: ASTNode; position: number }
	| { tag: "functionCall"; name: string; args: ASTNode[]; position: number }
	| { tag: "group"; expr: ASTNode; position: number } // Parenthesized

export type BinaryOperator = "plus" | "minus" | "multiply" | "divide" | "power"
export type UnaryOperator = "negate" | "factorial"
```

#### Decision 2: Pratt Parser (Precedence Climbing)

**DO:** Use Pratt parsing for operator precedence

**Why?**

- Handles precedence naturally
- Extensible (easy to add new operators)
- Well-understood algorithm
- FP-friendly (recursive descent with precedence)

**Precedence levels:**

1. Addition/Subtraction: `+`, `-` (lowest)
2. Multiplication/Division: `*`, `/`
3. Power: `^` (highest, right-associative)

#### Decision 3: Result Monad Throughout

**DO:** Return `Result<string, ASTNode>` from all parsers

```typescript
// Success
return ok({ tag: "number", value: 123, position: 0 })

// Error
return error("Expected expression after '+' at position 5")
```

**DON'T:** Throw exceptions (violates pure FP)

#### Decision 4: Recursive Descent

**DO:** Use recursive functions for parsing

```typescript
parseExpression(tokens, position, precedence): Result<string, [ASTNode, number]>
parsePrimary(tokens, position): Result<string, [ASTNode, number]>
parseFunctionCall(tokens, position): Result<string, [ASTNode, number]>
```

**Why?** Natural for tree construction, FP-friendly

---

## STEP 4: Implementation Plan (TDD Required!)

### File Structure To Create

```
src/parser/
├── index.ts                      # Main parser entry point
├── index.test.ts                 # Integration tests
├── types/
│   └── index.ts                  # ASTNode, BinaryOperator, etc.
├── parseExpression/              # Expression parser (Pratt)
│   ├── index.ts
│   ├── index.test.ts
│   └── _getPrecedence/           # Precedence lookup helper
│       ├── index.ts
│       └── index.test.ts
├── parsePrimary/                 # Primary expressions (numbers, vars, groups)
│   ├── index.ts
│   └── index.test.ts
├── parseFunctionCall/            # Function call parser
│   ├── index.ts
│   └── index.test.ts
├── parseUnaryOp/                 # Unary operators (-x, x!)
│   ├── index.ts
│   └── index.test.ts
└── constants/
    └── index.ts                  # Precedence levels, associativity
```

### TDD Workflow (MANDATORY)

For **EVERY** function:

1. **Write test first** (use fast-check for properties)
2. **Watch it fail**
3. **Implement to make it pass**
4. **Refactor if needed**
5. **Add more tests**

**Example:**

```typescript
// parsePrimary/index.test.ts - WRITE THIS FIRST
Deno.test("parsePrimary - parses number", () => {
	const tokens = [
		{ _tag: "Ok", value: { type: "number", value: "123", position: 0 } },
	]
	const result = parsePrimary(tokens)(0)

	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		const [ast, consumed] = result.value
		assertEquals(ast.tag, "number")
		assertEquals(ast.value, 123)
	}
})

// parsePrimary/index.ts - THEN IMPLEMENT
export default function parsePrimary(tokens: TokenResult[]) {
	return function withPosition(
		position: number,
	): Result<string, [ASTNode, number]> {
		// Implementation here
	}
}
```

### Implementation Order

1. **Types first** (`parser/types/index.ts`)
   - Define `ASTNode` union
   - Define operator types
   - Define precedence constants

2. **Constants** (`parser/constants/index.ts`)
   - Operator precedence levels
   - Associativity rules

3. **parsePrimary** (TDD)
   - Test: Number token → Number AST
   - Test: Variable token → Variable AST
   - Test: Grouped expression → Group AST
   - Implement

4. **parseFunctionCall** (TDD)
   - Test: `sin(x)` → FunctionCall AST
   - Test: `max(1, 2, 3)` → FunctionCall with multiple args
   - Test: Missing paren → Error
   - Implement

5. **parseUnaryOp** (TDD)
   - Test: `-5` → UnaryOp(negate, 5)
   - Test: `5!` → UnaryOp(factorial, 5)
   - Implement

6. **parseExpression** (Pratt parser - TDD)
   - Test: `2 + 3` → BinaryOp(plus, 2, 3)
   - Test: `2 + 3 * 4` → BinaryOp(plus, 2, BinaryOp(multiply, 3, 4))
   - Test: `2 ^ 3 ^ 4` → BinaryOp(power, 2, BinaryOp(power, 3, 4)) (right-assoc)
   - Test: `(2 + 3) * 4` → BinaryOp(multiply, BinaryOp(plus, 2, 3), 4)
   - Implement

7. **Main parser** (`parser/index.ts`)
   - Materialize token stream
   - Call parseExpression
   - Validate no remaining tokens
   - Return Result<string, ASTNode>

---

## STEP 5: Testing Requirements

### Must Have

✅ **Unit tests** for every function (co-located `index.test.ts`)
✅ **Property-based tests** using fast-check
✅ **Error case tests** (malformed input)
✅ **Integration tests** (full parsing)

### Test Properties

```typescript
// Property: Parsing is deterministic
fc.assert(
	fc.property(
		fc.string(),
		(input: string) => {
			const tokens1 = Array.from(tokenizer(input))
			const tokens2 = Array.from(tokenizer(input))
			const ast1 = parse(tokens1)
			const ast2 = parse(tokens2)

			return deepEqual(ast1, ast2)
		},
	),
)

// Property: Valid expressions parse successfully
fc.assert(
	fc.property(
		fc.integer(),
		fc.integer(),
		(a: number, b: number) => {
			const input = `${a} + ${b}`
			const tokens = Array.from(tokenizer(input))
			const result = parse(tokens)

			return result._tag === "Ok"
		},
	),
)
```

### NO Bullshit

❌ No `assert(true)`
❌ No empty stub implementations marked "done"
❌ No tests that don't actually test behavior

**The Architect will check.**

---

## STEP 6: Key Architectural Rules

### From Studio Overview

1. **One function per file** - `src/parser/parseExpression/index.ts`
2. **Named exports only** - `export default function parseExpression`
3. **Curried, data-last** - `parseExpression(tokens)(position)`
4. **Private helpers in underscore folders** - `_getPrecedence/index.ts`
5. **Envoy comments** - `//++` for public, minimal for private
6. **Frozen outputs** - `Object.freeze()` on all returned AST nodes
7. **No classes, no mutations** - Pure functions only
8. **Recursion allowed** - Parser is tree construction (not iteration)

### From Formulator Plan

1. **Use Result monad** - Import from Toolsmith
2. **Don't throw exceptions** - Return `error()` instead
3. **Materialize token stream** - Convert generator to array for lookahead
4. **Test-first always** - Write failing test, then implement
5. **Return consumed count** - `[ASTNode, number]` pattern for position tracking

---

## STEP 7: Pratt Parser Algorithm

Here's the core algorithm for precedence climbing:

```typescript
// src/parser/parseExpression/index.ts
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ASTNode } from "../types/index.ts"
import parsePrimary from "../parsePrimary/index.ts"
import getPrecedence from "./_getPrecedence/index.ts"

//++ Parses expressions with operator precedence (Pratt parser) (curried)
export default function parseExpression(
	tokens: TokenResult[],
	minPrecedence = 0,
) {
	return function withPosition(
		position: number,
	): Result<string, [ASTNode, number]> {
		// Parse left-hand side (primary expression)
		const leftResult = parsePrimary(tokens)(position)
		if (leftResult._tag === "Error") return leftResult

		let [left, pos] = leftResult.value

		// Consume operators while precedence is sufficient
		while (pos < tokens.length) {
			const token = tokens[pos]
			if (token._tag === "Error") return token

			const operator = token.value.type
			const precedence = getPrecedence(operator)

			if (precedence < minPrecedence) break

			pos++ // Consume operator

			// Right-associative for power (^)
			const nextPrecedence = operator === "power" ? precedence : precedence + 1

			// Parse right-hand side with higher precedence
			const rightResult = parseExpression(tokens, nextPrecedence)(pos)
			if (rightResult._tag === "Error") return rightResult

			const [right, newPos] = rightResult.value
			pos = newPos

			// Build binary operation node
			left = Object.freeze({
				tag: "binaryOp",
				op: operator,
				left,
				right,
				position: left.position,
			})
		}

		return ok(Object.freeze([left, pos]))
	}
}
```

**Key points:**

- ✅ Curried (data-last)
- ✅ Returns Result monad
- ✅ Frozen outputs
- ✅ Precedence climbing
- ✅ Right-associative power operator
- ✅ Descriptive errors with position

---

## STEP 8: Common Pitfalls (Don't Do These!)

### ❌ WRONG: Throwing Exceptions

```typescript
if (!match) {
	throw new Error("Invalid syntax") // NO!
}
```

### ✅ RIGHT: Return Error

```typescript
if (!match) {
	return error("Invalid syntax at position X")
}
```

---

### ❌ WRONG: Mutable AST Nodes

```typescript
let node = { tag: "number", value: 123 }
node.value = 456 // NO!
```

### ✅ RIGHT: Frozen Objects

```typescript
const node = Object.freeze({ tag: "number", value: 123 })
```

---

### ❌ WRONG: Uncurried Functions

```typescript
function parseExpression(tokens: TokenResult[], position: number) {}
```

### ✅ RIGHT: Curried, Data-Last

```typescript
function parseExpression(tokens: TokenResult[]) {
	return function withPosition(position: number) {}
}
```

---

### ❌ WRONG: No Tests

```typescript
// Implement first, test later (or never)
```

### ✅ RIGHT: TDD

```typescript
// 1. Write test
// 2. Watch fail
// 3. Implement
// 4. Watch pass
```

---

## STEP 9: When You're Done

### Completion Checklist

- [ ] All parsers implemented (primary, expression, function, unary)
- [ ] Main parser entry point implemented
- [ ] Precedence and associativity working correctly
- [ ] All tests passing (target: 50+ tests)
- [ ] Property-based tests for determinism and correctness
- [ ] Test script created: `test-parser.ts` (like `test-lexer.ts` and `test-tokenizer.ts`)
- [ ] README.md created: `src/parser/README.md`
- [ ] Plan.md updated with Phase 3 complete
- [ ] Next prompt written: `docs/prompt-phase4.md` for compiler

### Test Your Work

```bash
# Run all parser tests
deno test src/parser/

# Interactive test script
deno run test-parser.ts "2 + 3"
deno run test-parser.ts "sin(alpha * PI) ^ 2"
deno run test-parser.ts "(2 + 3) * (4 - 1)"
```

### Show Results

Create summary showing:

- Number of files created
- Number of tests passing
- Example AST output
- What's next (compiler)

---

## STEP 10: Resources & Help

### Import Paths

```typescript
// Toolsmith Result monad
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"

// Formulator tokenizer (already built)
import tokenizer from "../tokenizer/index.ts"
import type { Token } from "../tokenizer/types/index.ts"

// Testing
import { assertEquals } from "@std/assert"
import fc from "fast-check"
```

### fast-check Arbitraries

```typescript
fc.integer() // Random integers
fc.constantFrom("+", "-", "*", "/") // Pick operator
fc.string() // Random strings
fc.array(fc.integer()) // Array of integers
```

### Getting Unstuck

1. **Re-read the tokenizer implementation** - `src/tokenizer/index.ts` uses Result monad
2. **Check tokenizer tests** - Same Result monad patterns
3. **Review plan.md** - Has parser architecture details
4. **Study Pratt parsing** - Plenty of online resources
5. **Ask The Architect** - If truly stuck, stop and ask

---

## Final Reminders

🎯 **Your Goal:** Build a pure functional parser that converts token streams into AST using Result monads for error handling and Pratt parsing for precedence.

⚠️ **Do NOT:**

- Skip TDD (test first, always)
- Use classes or mutations
- Throw exceptions
- Write `assert(true)` garbage tests
- Touch anything outside `src/parser/` or `test-parser.ts`
- Use iteration (recursion is allowed and encouraged for tree construction)

✅ **DO:**

- Follow the tokenizer's example for Result monad usage
- Write real tests that verify behavior
- Use Result monad for all error cases
- Freeze all AST nodes
- Document with Envoy comments
- Ask before making architectural changes
- Use recursion for tree construction (it's appropriate here)

---

**Good luck, Future AI. The lexer and tokenizer are solid foundations. Now build the parser with the same precision and care.**

— Your Past Self, who just built the tokenizer
