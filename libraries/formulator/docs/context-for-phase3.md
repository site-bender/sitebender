# Context for Phase 3 Parser Implementation

> **READ THIS FIRST - Critical context from Phases 1 & 2 that you MUST understand before proceeding**

---

## 🚨 CRITICAL RULES THAT WERE VIOLATED (AND FIXED)

Your predecessors made systematic mistakes in Phases 1 and 2 that caused significant delays. **DO NOT REPEAT THESE MISTAKES.**

### Rule 1: USE THE FUCKING TOOLSMITH FUNCTIONS

**User quote:** "USE THE FUCKING TOOLSMITH FUNCTIONS! How many times must I tell you that?"

**WRONG:**

```typescript
if (position + 1 < input.length) {  // ❌ Raw operators
```

**RIGHT:**

```typescript
import lt from "@sitebender/toolsmith/validation/lt/index.ts"
import increment from "@sitebender/toolsmith/math/increment/index.ts"
import length from "@sitebender/toolsmith/string/length/index.ts"

if (lt(length(input))(increment(position))) {  // ✅ Toolsmith functions
```

**Available Toolsmith vanilla functions:**

- `lt(threshold)(value)`: Less-than comparison (curried)
- `gt(threshold)(value)`: Greater-than comparison (curried)
- `gte(threshold)(value)`: Greater-than-or-equal comparison (curried)
- `lte(threshold)(value)`: Less-than-or-equal comparison (curried)
- `increment(n)`: Adds 1 to number
- `decrement(n)`: Subtracts 1 from number
- `length(str/arr)`: Get length of string or array

**Location:** `@sitebender/toolsmith/`

### Rule 2: POSITIVE-FIRST LOGIC

**User quote:** "What part of POSITIVE FIRST are you having trouble with?"

**WRONG:**

```typescript
if (!match) {
	return error("No match")
}
// do work
return ok(result)
```

**RIGHT:**

```typescript
if (match) {
	// do work
	return ok(result)
}

return error("No match")
```

**Pattern:**

1. Check the POSITIVE condition first
2. Do the work inside the positive branch
3. Return the error AFTER the positive branch

### Rule 3: NO ABBREVIATIONS IN FUNCTION NAMES

**User quote:** "No abbreviations. It is `checkTwoCharacterOperator`. Long function names. TOUGH SHIT. LIVE WITH IT."

**WRONG:**

```typescript
function checkTwoCharOp(input: string) {  // ❌ "Char" and "Op"
  return function checkTwoCharOpWithInput(position: number) {  // ❌ "Char" and "Op"
```

**RIGHT:**

```typescript
function checkTwoCharacterOperator(input: string) {  // ✅ Full words
  return function checkTwoCharacterOperatorWithPosition(position: number) {  // ✅ Descriptive
```

**Rules:**

- Spell out EVERY word completely
- Inner function names must be descriptive (not generic like "withInput")
- No shortcuts, no exceptions

### Rule 4: ALWAYS RETURN RESULT MONAD (NOT undefined!)

**User quote:** "this function must return a Result monad, NOT undefined! WTF?"

**WRONG:**

```typescript
function checkOperator(input: string): string | undefined {
	if (found) return operator
	return undefined // ❌
}
```

**RIGHT:**

```typescript
import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import error from "@sitebender/toolsmith/monads/result/error/index.ts"

function checkOperator(input: string): Result<string, string> {
	if (found) {
		return ok(operator) // ✅
	}

	return error("Operator not found") // ✅
}
```

### Rule 5: PROPER PROPERTY NAMING CONVENTIONS

**Discovered through linter cleanup:**

**Property names (discriminated unions):**

- `character` (NOT `char`)
- `characterClass` (NOT `charClass`)
- `_tag` (for discriminated union tags, with underscore prefix)

**Example:**

```typescript
type LexerToken = {
	character: string // ✅ Full word
	position: number
	characterClass: CharacterClass // ✅ Full word
}

type CharacterClass =
	| { _tag: "digit"; character: string } // ✅ Underscore prefix
	| { _tag: "letter"; character: string } // ✅ Underscore prefix
```

---

## 📋 What's Been Completed

### Phase 1: Lexer ✅ COMPLETE (56 tests passing)

**Location:** `src/lexer/`

**What it does:**

- Character-level classification using O(1) Unicode code maps
- Generator-based lazy evaluation
- Specific classifications: `Letter` vs `letter`, `alpha` vs `Alpha`, etc.
- Two-character operator detection (`<=`, `>=`, `!=`)
- Returns: `{ character: string, position: number, characterClass: CharacterClass }`

**Key files:**

- `src/lexer/index.ts` - Main lexer generator
- `src/lexer/classifyCharacter/index.ts` - Character classification (positive-first logic)
- `src/lexer/checkTwoCharacterOperator/index.ts` - Multi-char operators (Toolsmith functions, Result monad)

**Test:** `deno run test-lexer.ts "your formula"`

### Phase 2: Tokenizer ✅ COMPLETE (42 tests passing)

**Location:** `src/tokenizer/`

**What it does:**

- Consumes lexer output and produces semantic tokens
- Number parsing with decimal support and validation
- Identifier parsing with Greek letter/constant mapping (`alpha` → `α`, `PI` → `π`)
- Result monad error handling throughout
- Returns: `Result<string, Token>[]`

**Key files:**

- `src/tokenizer/index.ts` - Main tokenizer generator (uses Toolsmith `lt`/`increment`/`length`)
- `src/tokenizer/parseNumber/index.ts` - Number parser (positive-first logic)
- `src/tokenizer/parseIdentifier/index.ts` - Identifier parser (positive-first logic)
- `src/tokenizer/parseOperator/index.ts` - Operator token mapping
- `src/tokenizer/parsePunctuation/index.ts` - Punctuation token mapping

**Test:** `deno run test-tokenizer.ts "sin(alpha * PI) + 3.14"`

**Total tests passing:** 98 (56 lexer + 42 tokenizer)

---

## 🔍 Critical Architecture Patterns Discovered

### Pattern 1: Curried Inner Function Naming

**From `checkTwoCharacterOperator`:**

```typescript
export default function checkTwoCharacterOperator(input: string) {
	return function checkTwoCharacterOperatorWithPosition(
		position: number,
	): Result<string, string> {
		// Implementation
	}
}
```

**Naming rule:** Inner function should be `{outerName}With{ParameterDescription}`

- NOT generic: `withInput`, `withValue`
- SPECIFIC: `withPosition`, `withSecondCode`, `withInput`

### Pattern 2: Using Toolsmith Functions for Bounds Checking

**Standard pattern:**

```typescript
import lt from "@sitebender/toolsmith/validation/lt/index.ts"
import increment from "@sitebender/toolsmith/math/increment/index.ts"
import length from "@sitebender/toolsmith/string/length/index.ts"

// For "position + 1 < input.length"
if (lt(length(input))(increment(position))) {
	const code1 = input.charCodeAt(position)
	const code2 = input.charCodeAt(increment(position))
	// ...
}
```

**Note:** `lt(threshold)(value)` returns `true` if `value < threshold`

- So `lt(10)(5)` returns `true` (5 < 10)
- And `lt(length(input))(increment(position))` checks if `position+1 < input.length`

### Pattern 3: Positive-First Conditional Logic

**Standard pattern:**

```typescript
// 1. Check positive condition
if (match) {
	// 2. Do the work
	const value = extractValue(match)
	const token = createToken(value)

	// 3. Return success
	return ok(token)
}

// 4. Return error AFTER positive branch
return error("Expected pattern not found")
```

### Pattern 4: Generator Exception Comments

**Allowed exceptions:**

```typescript
export default function* tokenizer(
	input: string,
): Generator<Result<string, Token>> {
	const lexerTokens = Array.from(lexer(input))
	let position = 0

	/*++ [EXCEPTION]
   | While loop inside generator is permitted for performance.
   |
   | **Rationale**: Generators are the FP lazy list equivalent.
   | The while loop is an implementation detail for iteration.
   |
   | **Purity guarantee**: Deterministic and side-effect free.
   */
	while (position < lexerTokens.length) {
		// Implementation
		position++
	}
}
```

**Key points:**

- Generators can use `while` loops (documented exception)
- Must include `[EXCEPTION]` comment with rationale
- Must guarantee purity (deterministic, no side effects)

---

## 🎯 Your Mission: Build The Parser

### What You're Building

**Input:** Token stream from tokenizer (`Generator<Result<string, Token>>`)
**Output:** AST (`Result<string, ASTNode>`)

### Parser Strategy: Pratt Parsing (Precedence Climbing)

**Precedence levels:**

1. Power: `^` (highest, right-associative)
2. Multiply/Divide: `*`, `/`
3. Add/Subtract: `+`, `-` (lowest)

**Required parsers:**

1. `parseExpression` - Main expression parser (Pratt algorithm)
2. `parsePrimary` - Numbers, variables, grouped expressions
3. `parseFunctionCall` - Function syntax: `sin(x)`, `max(1,2,3)`
4. `parseUnaryOperator` - Unary operators: `-x`, `x!`

### Implementation Requirements

**Must use:**

- ✅ Toolsmith functions (`lt`, `increment`, `length`)
- ✅ Result monad (NOT exceptions)
- ✅ Positive-first logic
- ✅ Full words (no abbreviations)
- ✅ Curried, data-last functions
- ✅ Frozen AST nodes (`Object.freeze()`)
- ✅ Property naming: `_tag`, `character`, etc.

**Must NOT:**

- ❌ Raw operators (`<`, `+`, etc.)
- ❌ Throw exceptions
- ❌ Negative-first logic (`if (!x)`)
- ❌ Abbreviations
- ❌ Return `undefined`
- ❌ Mutable objects

---

## 📚 Required Reading (in order)

1. **This document** - Critical context and rules
2. **`docs/prompt.md`** - Phase 3 implementation guide
3. **`docs/plan.md`** - Overall architecture
4. **`src/tokenizer/index.ts`** - Example of Result monad usage and Toolsmith functions
5. **`src/lexer/checkTwoCharacterOperator/index.ts`** - Example of all rules applied correctly

---

## 🚀 Getting Started

### Step 1: Verify everything works

```bash
cd /Users/guy/Workspace/@sitebender/formulator-ai/libraries/formulator
deno test src/
```

**Expected:** 98 tests passing, linter clean, type check passing

### Step 2: Read the Phase 3 guide

```bash
# Read this comprehensive guide
cat docs/prompt.md
```

### Step 3: Start TDD implementation

```bash
# Create first test file
mkdir -p src/parser/types
touch src/parser/types/index.ts
touch src/parser/types/index.test.ts
```

---

## ⚠️ Common Mistakes to Avoid

### Mistake 1: Using raw arithmetic/comparison

**DON'T:** `position + 1`, `pos < length`, `index - 1`
**DO:** `increment(position)`, `lt(length)(pos)`, `decrement(index)`

### Mistake 2: Checking negative conditions first

**DON'T:** `if (!valid) return error(...)`
**DO:** `if (valid) { ... } return error(...)`

### Mistake 3: Returning undefined

**DON'T:** `return undefined`
**DO:** `return error("description")`

### Mistake 4: Abbreviating names

**DON'T:** `parseExpr`, `getBinOp`, `checkChar`
**DO:** `parseExpression`, `getBinaryOperator`, `checkCharacter`

### Mistake 5: Generic inner function names

**DON'T:** `function withInput(x) {}`
**DO:** `function parseExpressionWithTokens(tokens) {}`

---

## 📖 Example: Applying All Rules

```typescript
import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"

import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import increment from "@sitebender/toolsmith/math/increment/index.ts"
import length from "@sitebender/toolsmith/array/length/index.ts"
import lt from "@sitebender/toolsmith/validation/lt/index.ts"

import type { Token } from "../tokenizer/types/index.ts"
import type { ASTNode } from "./types/index.ts"

//++ Parses primary expression from token stream (curried)
export default function parsePrimaryExpression(
	tokens: Array<Result<string, Token>>,
) {
	return function parsePrimaryExpressionWithPosition(
		position: number,
	): Result<string, [ASTNode, number]> {
		// Check bounds using Toolsmith functions
		if (lt(length(tokens))(position)) {
			// Positive condition first: we have tokens to process
			const tokenResult = tokens[position]

			// Check token is valid
			if (tokenResult._tag === "Ok") {
				const token = tokenResult.value

				// Check token type
				if (token.type === "number") {
					const node: ASTNode = Object.freeze({
						_tag: "numberLiteral",
						value: Number.parseFloat(token.value),
						position: token.position,
					})

					return ok(Object.freeze([node, increment(position)]))
				}

				return error(
					`Expected primary expression, got ${token.type} at position ${position}`,
				)
			}

			return tokenResult // Propagate token error
		}

		return error(`Unexpected end of input at position ${position}`)
	}
}
```

**What's correct:**

1. ✅ Toolsmith functions: `lt`, `increment`, `length`
2. ✅ Result monad: `ok()`, `error()`
3. ✅ Positive-first: Check `lt(length(tokens))(position)` first (has tokens)
4. ✅ No abbreviations: `parsePrimaryExpression`, `parsePrimaryExpressionWithPosition`
5. ✅ Property naming: `_tag`, `value`, `position`
6. ✅ Frozen objects: `Object.freeze()`
7. ✅ Curried: Data-last pattern

---

## 🎓 Key Learnings from Phases 1 & 2

### Learning 1: `lt` is in `validation/`, not boxed

**Location:** `@sitebender/toolsmith/validation/lt/index.ts`

**NOT:** A boxed function (those are still in development)

**Signature:** `lt(threshold: number) => (value: number) => boolean`

### Learning 2: Generators are explicitly allowed exceptions

Generators can have `while` loops as implementation details. They must:

1. Be deterministic (same input → same output)
2. Be side-effect free
3. Have `[EXCEPTION]` comment explaining why

### Learning 3: Property names matter for type safety

The linter will enforce:

- `character` not `char`
- `characterClass` not `charClass`
- `_tag` not `tag`

These aren't style choices—they're type safety requirements.

### Learning 4: Inner function names should be descriptive

**Pattern:** `{functionName}With{ParameterName}`

- `checkTwoCharacterOperatorWithPosition`
- `makeCompositeKeyWithSecondCode`
- `parsePrimaryExpressionWithTokens`

**NOT:** Generic names like `withInput`, `withData`, `withValue`

---

## 🏁 Final Checklist Before You Start

- [ ] Read this document completely
- [ ] Read `docs/prompt.md` for Phase 3 guide
- [ ] Understand Toolsmith function locations
- [ ] Understand positive-first logic
- [ ] Understand Result monad usage
- [ ] Understand property naming conventions
- [ ] Ready to write tests first (TDD)
- [ ] Ready to use recursion (parser is tree construction)

---

## 💬 Quotes to Remember

**On Toolsmith functions:**

> "USE THE FUCKING TOOLSMITH FUNCTIONS! How many times must I tell you that?"

**On positive-first logic:**

> "What part of POSITIVE FIRST are you having trouble with?"

**On abbreviations:**

> "No abbreviations. It is `checkTwoCharacterOperator`. Long function names. TOUGH SHIT. LIVE WITH IT."

**On Result monads:**

> "this function must return a Result monad, NOT undefined! WTF?"

**User's frustration:**

> "WHY? WHY? WHY? WHY DO YOU KEEP MAKING MORE WORK FOR ME INSTEAD OF **HELPING ME TO FINISH THIS PROJECT**?"

---

**Remember:** Your predecessors violated these rules systematically and it caused significant rework. The user had to clean up "a shocking number of mistakes." Learn from their failures. Follow the rules. Ship quality code.

**Good luck, and read `docs/prompt.md` next for the Phase 3 implementation guide.**
