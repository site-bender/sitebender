# Formulator Tokenizer & Parser Architecture Plan

> **Pure functional, lazy, generator-based tokenization and parsing for mathematical and chemical formulas**

## Implementation Status

**Current Phase**: ✅ **Phase 4 - Compiler** - COMPLETE

**Completed:**

- ✅ **Phase 1: Lexer** (Character-level classification) - COMPLETE
  - O(1) Unicode character code map classification
  - Generator-based lazy evaluation
  - Specific character classifications (Letter vs letter, alpha vs Alpha, etc.)
  - Two-character operator detection with Result monad
  - All Toolsmith functions properly used (lt, increment, length)
  - Positive-first logic throughout
  - 56 passing tests (unit + property-based)
  - See `src/lexer/README.md` for details

- ✅ **Phase 2: Tokenizer** (Semantic token stream) - COMPLETE
  - Number parsing with decimal support and validation
  - Identifier parsing with Greek letter/constant mapping
  - Operator and punctuation token generation
  - Result monad error handling throughout
  - Positive-first logic (no negative conditionals)
  - All Toolsmith functions properly integrated
  - 42 passing tests (unit + property-based + integration)
  - See `src/tokenizer/README.md` for details

- ✅ **Phase 3: Parser** (AST construction with infix notation) - COMPLETE
  - Pratt parser with operator precedence climbing
  - Binary operators with correct precedence
  - Unary operators (prefix negation, postfix factorial)
  - Function calls with multiple arguments
  - Grouped expressions (parentheses)
  - Result monad error handling throughout
  - All Toolsmith functions properly integrated
  - 22 passing tests (unit + integration)

- ✅ **Phase 4: Compiler** (Enriched AST + metadata) - COMPLETE
  - Type inference (datatype annotations on AST nodes)
  - Semantic operator naming (plus → add, minus → subtract, etc.)
  - Metadata collection (variables, constants, functions)
  - Mathematical constant recognition (π, e, τ, φ)
  - Structure preservation (no flattening for reversibility)
  - Uniform `left`/`right` structure for all binary operators (semantic accessors deferred to Architect)
  - 17 passing tests (unit + integration)

**Next Phase**: 📋 **Phase 5 - Polish/RPN Notation Support** - PLANNED (see below)

**Note for Architect Integration**: Binary operators use uniform `left`/`right` fields for simplicity. Architect should provide semantic accessor functions that return `Result` monads (e.g., `getMinuend`/`getSubtrahend` for subtract, `getAugend`/`getAddend` for add, `getDividend`/`getDivisor` for divide, `getMultiplicand`/`getMultiplier` for multiply, `getBase`/`getExponent` for power). See "Semantic Accessors for Architect" section below.

**Total Tests Passing**: 137 (56 lexer + 42 tokenizer + 22 parser + 17 compiler)
**Linter**: ✅ All files passing
**Type Check**: ✅ All files passing (Temporal errors are in Toolsmith, not Formulator)

---

## Core Philosophy

Write TypeScript **as if it were Haskell**:

- **Lazy evaluation by default** (generators are our lazy lists)
- **Pure functions** (same input → same output)
- **Immutable data structures** (frozen return values)
- **No recursion** (use generators with trampolining if needed)
- **No loops** (except hidden inside generators as implementation detail)
- **Separation of concerns** (lexer ≠ tokenizer ≠ parser)

---

## Architecture Overview

### Three Layers, Three Concerns

```
Input String
    ↓
┌─────────────────────────┐
│  LEXER                  │  Character-level classification
│  (Generator)            │  Yields: { char, position, charClass }
└─────────────────────────┘
    ↓
┌─────────────────────────┐
│  TOKENIZER              │  Token-level stream processing
│  (Generator)            │  Yields: Token
└─────────────────────────┘
    ↓
┌─────────────────────────┐
│  PARSER                 │  Tree construction from token stream
│  (Generator → Result)   │  Returns: AST (via Result monad)
└─────────────────────────┘
```

---

## Layer 1: Lexer (Character Stream)

### Purpose

Character-level classification and streaming. The lexer doesn't know about tokens, only characters.

### Character Classification Strategy: Unicode Character Code Maps

Instead of RegEx patterns, we use **Unicode character code point lookups** for O(1) classification. This approach:

- **Accepts multiple variants** - `*`, `×`, `·`, `⋅` all map to MULTIPLY
- **Performs in O(1)** - Object property lookup vs O(n) regex testing
- **Explicit and clear** - Every supported character documented
- **Culturally inclusive** - Support international mathematical notation
- **Type-safe** - TypeScript can verify map completeness

#### Character Code Map Structure

```typescript
// src/lexer/types/index.ts
type CharType =
	| "DIGIT"
	| "ALPHA"
	| "WHITESPACE"
	| "MULTIPLY"
	| "DIVIDE"
	| "PLUS"
	| "MINUS"
	| "POWER"
	| "LEFT_PAREN"
	| "RIGHT_PAREN"
	| "DECIMAL_POINT"
	| "UNKNOWN"

// src/lexer/constants/charMap.ts
//++ Character code to character type mapping for O(1) classification
export const CHAR_MAP: Record<number, CharType> = {
	// Digits 0-9
	0x30: "DIGIT",
	0x31: "DIGIT",
	0x32: "DIGIT",
	0x33: "DIGIT",
	0x34: "DIGIT",
	0x35: "DIGIT",
	0x36: "DIGIT",
	0x37: "DIGIT",
	0x38: "DIGIT",
	0x39: "DIGIT",

	// Multiplication operators (multiple Unicode variants!)
	0x002a: "MULTIPLY", // * (asterisk)
	0x00d7: "MULTIPLY", // × (multiplication sign)
	0x00b7: "MULTIPLY", // · (middle dot)
	0x22c5: "MULTIPLY", // ⋅ (dot operator)
	0x2217: "MULTIPLY", // ∗ (asterisk operator)

	// Division operators
	0x002f: "DIVIDE", // / (solidus)
	0x00f7: "DIVIDE", // ÷ (division sign)
	0x2215: "DIVIDE", // ∕ (division slash)

	// Addition
	0x002b: "PLUS", // + (plus sign)
	0x2795: "PLUS", // ➕ (heavy plus sign)

	// Subtraction
	0x002d: "MINUS", // - (hyphen-minus)
	0x2212: "MINUS", // − (minus sign)
	0x2796: "MINUS", // ➖ (heavy minus sign)

	// Power/exponentiation
	0x005e: "POWER", // ^ (circumflex)
	0x2038: "POWER", // ‸ (caret)

	// Parentheses (multiple styles!)
	0x0028: "LEFT_PAREN", // ( (left parenthesis)
	0x0029: "RIGHT_PAREN", // ) (right parenthesis)
	0x2768: "LEFT_PAREN", // ❨ (medium left parenthesis ornament)
	0x2769: "RIGHT_PAREN", // ❩ (medium right parenthesis ornament)

	// Decimal point
	0x002e: "DECIMAL_POINT", // . (full stop)

	// Greek letters (lowercase)
	0x03b1: "ALPHA", // α
	0x03b2: "ALPHA", // β
	0x03b3: "ALPHA", // γ
	0x03c0: "ALPHA", // π
	// ... (generated programmatically - see buildCharMap)

	// Greek letters (uppercase)
	0x0391: "ALPHA", // Α
	0x0392: "ALPHA", // Β
	0x0393: "ALPHA", // Γ
	// ... (generated programmatically - see buildCharMap)

	// ASCII letters A-Z
	0x41: "ALPHA",
	0x42: "ALPHA",
	0x43: "ALPHA", // A, B, C
	// ... (generated programmatically - see buildCharMap)

	// ASCII letters a-z
	0x61: "ALPHA",
	0x62: "ALPHA",
	0x63: "ALPHA", // a, b, c
	// ... (generated programmatically - see buildCharMap)

	// Whitespace
	0x0020: "WHITESPACE", // space
	0x0009: "WHITESPACE", // tab
	0x000a: "WHITESPACE", // newline
	0x000d: "WHITESPACE", // carriage return
	0x00a0: "WHITESPACE", // non-breaking space
}
```

#### Programmatic Map Generation

Don't write thousands of entries by hand - generate them!

```typescript
// src/lexer/buildCharMap/index.ts

import type { CharType } from "../types/index.ts"

//++ Builds character classification map from declarative ranges and lists
export default function buildCharMap(): Record<number, CharType> {
	const map: Record<number, CharType> = {}

	// Add digit range 0-9
	addRangeToMap(map)(0x30)(0x39)("DIGIT")

	// Add ASCII uppercase letters A-Z
	addRangeToMap(map)(0x41)(0x5a)("ALPHA")

	// Add ASCII lowercase letters a-z
	addRangeToMap(map)(0x61)(0x7a)("ALPHA")

	// Add Greek lowercase letters α-ω
	addRangeToMap(map)(0x03b1)(0x03c9)("ALPHA")

	// Add Greek uppercase letters Α-Ω
	addRangeToMap(map)(0x0391)(0x03a9)("ALPHA")

	// Add multiplication symbols
	addListToMap(map)([
		0x002a, // *
		0x00d7, // ×
		0x00b7, // ·
		0x22c5, // ⋅
		0x2217, // ∗
	])("MULTIPLY")

	// Add division symbols
	addListToMap(map)([
		0x002f, // /
		0x00f7, // ÷
		0x2215, // ∕
	])("DIVIDE")

	// ... continue for all operators

	return Object.freeze(map)
}

// src/lexer/buildCharMap/addRangeToMap/index.ts
//++ Adds a range of character codes to the map with the given type (curried)
export default function addRangeToMap(map: Record<number, CharType>) {
	return function withMap(start: number) {
		return function withStart(end: number) {
			return function withEnd(type: CharType): void {
				let code = start

				/*++ [EXCEPTION]
				 | While loop permitted for efficient range iteration.
				 | This is a build-time function, not runtime.
				 */
				while (code <= end) {
					map[code] = type
					code++
				}
			}
		}
	}
}

// src/lexer/buildCharMap/addListToMap/index.ts
//++ Adds a list of character codes to the map with the given type (curried)
export default function addListToMap(map: Record<number, CharType>) {
	return function withMap(codes: ReadonlyArray<number>) {
		return function withCodes(type: CharType): void {
			let index = 0

			/*++ [EXCEPTION]
			 | While loop permitted for efficient list iteration.
			 | This is a build-time function, not runtime.
			 */
			while (index < codes.length) {
				map[codes[index]] = type
				index++
			}
		}
	}
}
```

#### Character Classification Function

```typescript
// src/lexer/classifyChar/index.ts

import type { CharType } from "../types/index.ts"

import { CHAR_MAP } from "../constants/charMap.ts"
import isUnicodeDigit from "./_isUnicodeDigit/index.ts"
import isUnicodeLetter from "./_isUnicodeLetter/index.ts"
import isUnicodeWhitespace from "./_isUnicodeWhitespace/index.ts"

//++ Classifies a character by its Unicode code point using O(1) map lookup
export default function classifyChar(char: string): CharType {
	const code = char.charCodeAt(0)
	const type = CHAR_MAP[code]

	if (type !== undefined) {
		return type
	}

	// Fallback: check Unicode categories for unmapped chars
	if (isUnicodeDigit(code)) {
		return "DIGIT"
	}

	if (isUnicodeLetter(code)) {
		return "ALPHA"
	}

	if (isUnicodeWhitespace(code)) {
		return "WHITESPACE"
	}

	return "UNKNOWN"
}

// src/lexer/classifyChar/_isUnicodeDigit/index.ts
//++ Checks if code point is a Unicode digit category Nd (all number systems)
export default function isUnicodeDigit(code: number): boolean {
	const char = String.fromCharCode(code)

	return /\p{Nd}/u.test(char)
}

// src/lexer/classifyChar/_isUnicodeLetter/index.ts
//++ Checks if code point is a Unicode letter (categories Ll, Lu, Lt, Lm, Lo)
export default function isUnicodeLetter(code: number): boolean {
	const char = String.fromCharCode(code)

	return /\p{L}/u.test(char)
}

// src/lexer/classifyChar/_isUnicodeWhitespace/index.ts
//++ Checks if code point is Unicode whitespace
export default function isUnicodeWhitespace(code: number): boolean {
	const char = String.fromCharCode(code)

	return /\s/u.test(char)
}
```

#### Multi-Character Operator Detection

For operators like `<=`, `>=`, `!=`:

```typescript
// src/lexer/checkTwoCharOperator/index.ts

import type { TokenType } from "../../tokenizer/types/index.ts"

import { TWO_CHAR_MAP } from "../constants/twoCharMap.ts"
import makeCompositeKey from "./_makeCompositeKey/index.ts"

//++ Checks if current position starts a two-character operator (curried)
export default function checkTwoCharOperator(input: string) {
	return function withInput(position: number): TokenType | undefined {
		if (position + 1 >= input.length) {
			return undefined
		}

		const code1 = input.charCodeAt(position)
		const code2 = input.charCodeAt(position + 1)
		const key = makeCompositeKey(code1)(code2)

		return TWO_CHAR_MAP[key]
	}
}

// src/lexer/checkTwoCharOperator/_makeCompositeKey/index.ts
//++ Creates composite key from two character codes for operator lookup (curried)
export default function makeCompositeKey(code1: number) {
	return function withFirstCode(code2: number): string {
		const hex1 = code1.toString(16).toUpperCase()
		const hex2 = code2.toString(16).toUpperCase()

		return `0x${hex1}_0x${hex2}`
	}
}

// src/lexer/constants/twoCharMap.ts
//++ Two-character operator mapping for composite key lookup
export const TWO_CHAR_MAP: Record<string, TokenType> = {
	"0x003C_0x003D": "LTE", // <=
	"0x003E_0x003D": "GTE", // >=
	"0x0021_0x003D": "NEQ", // !=
	"0x003D_0x003D": "EQ", // ==
	"0x0026_0x0026": "AND", // &&
	"0x007C_0x007C": "OR", // ||
	"0x005E_0x005E": "XOR", // ^^
	"0x002D_0x003E": "IMPLIES", // ->

	// Also support single-char Unicode variants
	"0x2264_0x0000": "LTE", // ≤ (treat as two chars with null second)
	"0x2265_0x0000": "GTE", // ≥
	"0x2260_0x0000": "NEQ", // ≠
}
```

### Implementation Strategy

**Generator-based lazy character stream:**

```typescript
type CharClass =
	| { tag: "Digit" }
	| { tag: "Alpha" }
	| { tag: "Whitespace" }
	| { tag: "OperatorChar"; char: string }
	| { tag: "Punctuation"; char: string }
	| { tag: "Unknown"; char: string }

//++ Lazily yields characters with position and classification
export function* lexer(input: string): Generator<{
	char: string
	position: number
	charClass: CharClass
}> {
	let position = 0

	/*++ [EXCEPTION]
	 | While loop inside generator is permitted for performance.
	 |
	 | **Rationale**: Generators ARE the Haskell lazy list equivalent.
	 | The while loop is an implementation detail (like Haskell's internal
	 | tail recursion). The function remains pure: same input always yields
	 | the same character sequence.
	 |
	 | **Alternatives considered**:
	 | - Recursion: Would blow stack on long formulas
	 | - Trampolining: Adds complexity without benefit
	 | - Array methods: Forces eager evaluation (defeats lazy purpose)
	 |
	 | **Purity guarantee**: This generator is deterministic and side-effect free.
	 */
	while (position < input.length) {
		const char = input[position]
		yield {
			char,
			position,
			charClass: classifyChar(char),
		}
		position++
	}
}
```

### Character Classification

```typescript
//++ Classifies a single character into its lexical category
export const classifyChar = (char: string): CharClass => {
	if (/\d/.test(char)) return { tag: "Digit" }
	if (/[a-zA-Z_]/.test(char)) return { tag: "Alpha" }
	if (/\s/.test(char)) return { tag: "Whitespace" }
	if (/[+\-*\/^%=<>!&|~]/.test(char)) return { tag: "OperatorChar", char }
	if (/[()[\]{}.,;:]/.test(char)) return { tag: "Punctuation", char }
	return { tag: "Unknown", char }
}
```

### Peek-Ahead Helper

For multi-character operators (e.g., `<=`, `>=`, `!=`):

```typescript
//++ Returns substring starting at position for lookahead operations (curried for composition)
export const peekAhead =
	(input: string) => (position: number) => (count: number): string =>
		input.slice(position, position + count)
```

---

## Layer 2: Tokenizer (Token Stream)

### Purpose

Converts character patterns into tokens. Consumes lexer output and produces token stream.

### Token Types

```typescript
type TokenType =
	| "NUMBER"
	| "IDENTIFIER"
	| "PLUS"
	| "MINUS"
	| "MULTIPLY"
	| "DIVIDE"
	| "POWER"
	| "MODULO"
	| "LT"
	| "GT"
	| "LTE"
	| "GTE"
	| "EQ"
	| "NEQ"
	| "AND"
	| "OR"
	| "NOT"
	| "XOR"
	| "IMPLIES"
	| "LEFT_PAREN"
	| "RIGHT_PAREN"
	| "LEFT_BRACKET"
	| "RIGHT_BRACKET"
	| "LEFT_BRACE"
	| "RIGHT_BRACE"
	| "COMMA"
	| "SEMICOLON"
	| "EOF"

type Token = {
	type: TokenType
	value: string
	position: number
}
```

### Implementation Strategy

**Generator-based lazy token stream:**

```typescript
//++ Lazily yields tokens by consuming input string character by character
export function* tokenStream(input: string): Generator<Token> {
	let position = 0

	/*++ [EXCEPTION]
	 | While loop inside generator is permitted for performance.
	 |
	 | **Rationale**: This generator implements lazy token streaming,
	 | equivalent to Haskell's `unfoldr` for list generation. The while
	 | loop is an implementation detail that enables iterative advancement
	 | through the input without recursion or stack frames.
	 |
	 | **Purity guarantee**: Deterministic - same input always yields
	 | the same token sequence. No external state modification.
	 */
	while (position < input.length) {
		// Skip whitespace
		while (position < input.length && isWhitespace(input[position])) {
			position++
		}

		if (position >= input.length) break

		// Parse next token
		const [token, consumed] = parseNextToken(input, position)
		yield token
		position += consumed
	}

	yield { type: "EOF", value: "", position }
}
```

### Token Parsing Dispatch

```typescript
type TokenParseResult = readonly [token: Token, consumed: number]

//++ Parses the next token at the current position (curried for composition)
export const parseNextToken =
	(input: string) => (position: number): TokenParseResult => {
		const char = input[position]
		const charClass = classifyChar(char)

		// Pattern match on character class to dispatch to specialized parsers
		return match(charClass, {
			Digit: () => parseNumber(input)(position),
			Alpha: () => parseIdentifierOrKeyword(input)(position),
			OperatorChar: () => parseOperator(input)(position),
			Punctuation: () => parsePunctuation(input)(position),
			Whitespace: () => [null, 1], // Should be filtered out before this
			Unknown: () => {
				throw new TokenizeError(
					`Unexpected character '${char}' at position ${position}`,
					position,
				)
			},
		})
	}
```

### Specialized Token Parsers

All parsers are **curried** for composition and return `[Token, number]` tuples.

#### Number Parser

```typescript
//++ Parses numeric literals (integers and decimals) with validation (curried)
export const parseNumber =
	(input: string) => (position: number): TokenParseResult => {
		// Match: optional sign, digits, optional decimal point and digits
		const pattern = /^[+-]?(\d+\.?\d*|\.\d+)/
		const match = pattern.exec(input.slice(position))

		if (!match) {
			throw new TokenizeError(
				`Expected number at position ${position}`,
				position,
			)
		}

		const value = match[0]
		const consumed = value.length

		// Validate: check for invalid formats like "3.14.159"
		const afterNumber = input.slice(position + consumed)
		if (afterNumber.startsWith(".") && /^\.\d/.test(afterNumber)) {
			throw new TokenizeError(
				`Invalid number format: multiple decimal points at position ${position}`,
				position,
			)
		}

		return [{ type: "NUMBER", value, position }, consumed]
	}
```

#### Identifier/Keyword Parser

```typescript
//++ Parses identifiers and converts recognized keywords to symbols (curried)
export const parseIdentifierOrKeyword =
	(input: string) => (position: number): TokenParseResult => {
		// Match: letter or underscore, followed by letters, digits, or underscores
		const pattern = /^[a-zA-Z_][a-zA-Z0-9_]*/
		const match = pattern.exec(input.slice(position))

		if (!match) {
			throw new TokenizeError(
				`Expected identifier at position ${position}`,
				position,
			)
		}

		const value = match[0]
		const consumed = value.length

		// Check if it's a keyword/symbol that should be transformed
		const symbolMapping = getSymbolMapping(value)

		return [
			{
				type: "IDENTIFIER",
				value: symbolMapping ?? value,
				position,
			},
			consumed,
		]
	}
```

#### Symbol Mapping & Reserved Words

**Strategy**: Simple, clean mapping with reserved words for Greek letters, constants, and functions.

**Naming Conventions**:

- **Variables**: camelCase starting with lowercase (`x`, `age`, `daysLeft`, `totalWeight`)
- **Greek lowercase**: Lowercase word (`alpha` → `α`, `beta` → `β`, `pi` → `π`)
- **Greek uppercase**: Capitalized word (`Alpha` → `Α`, `Beta` → `Β`, `Pi` → `Π`)
- **Constants**: SCREAMING_SNAKE (`PI`, `E`, `PHI`, `INFINITY`)
- **Functions**: Lowercase word (`sin`, `cos`, `log`, `sum`, `integral`)

**Reserved Words**: Greek letter names, constant names, and function names cannot be used as variable names. Users must use camelCase alternatives (e.g., `alphaValue`, `piApproximation`, `totalSum`).

```typescript
// src/tokenizer/constants/greekMap.ts

//++ Maps Greek letter names to their Unicode symbols
export const GREEK_MAP: Record<string, string> = {
	// Lowercase Greek
	alpha: "α",
	beta: "β",
	gamma: "γ",
	delta: "δ",
	epsilon: "ε",
	zeta: "ζ",
	eta: "η",
	theta: "θ",
	iota: "ι",
	kappa: "κ",
	lambda: "λ",
	mu: "μ",
	nu: "ν",
	xi: "ξ",
	omicron: "ο",
	pi: "π",
	rho: "ρ",
	sigma: "σ",
	tau: "τ",
	upsilon: "υ",
	phi: "φ",
	chi: "χ",
	psi: "ψ",
	omega: "ω",

	// Uppercase Greek (Alpha → Α, no prefix needed!)
	Alpha: "Α",
	Beta: "Β",
	Gamma: "Γ",
	Delta: "Δ",
	Epsilon: "Ε",
	Zeta: "Ζ",
	Eta: "Η",
	Theta: "Θ",
	Iota: "Ι",
	Kappa: "Κ",
	Lambda: "Λ",
	Mu: "Μ",
	Nu: "Ν",
	Xi: "Ξ",
	Omicron: "Ο",
	Pi: "Π",
	Rho: "Ρ",
	Sigma: "Σ",
	Tau: "Τ",
	Upsilon: "Υ",
	Phi: "Φ",
	Chi: "Χ",
	Psi: "Ψ",
	Omega: "Ω",
}

// src/tokenizer/constants/constantMap.ts

//++ Maps constant names to their symbolic or numeric values
export const CONSTANT_MAP: Record<string, string> = {
	PI: "π",
	E: "e",
	PHI: "φ",
	GOLDEN_RATIO: "φ",
	INFINITY: "∞",
	INF: "∞",
	NAN: "NaN",
}

// src/tokenizer/constants/operatorSymbolMap.ts

//++ Maps operator words to their Unicode symbols
export const OPERATOR_SYMBOL_MAP: Record<string, string> = {
	times: "×",
	div: "÷",
	lte: "≤",
	gte: "≥",
	neq: "≠",
	approx: "≈",
	plusminus: "±",
	pm: "±",
	dot: "·",
	cross: "×",
	integral: "∫",
	partial: "∂",
	nabla: "∇",
	grad: "∇",
	sum: "Σ",
	Sum: "Σ",
	product: "Π",
	Product: "Π",
	subset: "⊂",
	superset: "⊃",
	union: "∪",
	intersection: "∩",
	in: "∈",
	notin: "∉",
	emptyset: "∅",
	forall: "∀",
	exists: "∃",
	and: "∧",
	or: "∨",
	not: "¬",
	implies: "→",
	otimes: "⊗",
	oplus: "⊕",
}

// src/tokenizer/constants/functionMap.ts

//++ Maps function names (reserved words)
export const FUNCTION_MAP: Record<string, string> = {
	sin: "sin",
	cos: "cos",
	tan: "tan",
	log: "log",
	ln: "ln",
	exp: "exp",
	sqrt: "sqrt",
	abs: "abs",
	sum: "sum",
	integral: "integral",
	// ... more functions
}
```

**Friendly Error Messages** when reserved words are used as variables:

```
// User tries: Alpha = 5
Error: "Alpha" is reserved for the Greek letter Α.
💡 Tip: Use camelCase like "alphaValue" or "coefficient"

// User tries: pi = 3.14
Error: "pi" is reserved for the Greek letter π.
💡 Tip: Use PI for the constant, or "piValue" for a variable
```

#### Operator Parser

```typescript
//++ Parses operators (single or multi-character) (curried)
export const parseOperator =
	(input: string) => (position: number): TokenParseResult => {
		const char = input[position]
		const peek = peekAhead(input)(position)

		// Try two-character operators first
		const twoChar = peek(2)
		const twoCharToken = matchTwoCharOperator(twoChar)
		if (twoCharToken) {
			return [{ type: twoCharToken, value: twoChar, position }, 2]
		}

		// Fall back to single-character operators
		const oneCharToken = matchOneCharOperator(char)
		if (oneCharToken) {
			return [{ type: oneCharToken, value: char, position }, 1]
		}

		throw new TokenizeError(
			`Unknown operator '${char}' at position ${position}`,
			position,
		)
	}

//++ Maps two-character operator strings to token types
const matchTwoCharOperator = (op: string): TokenType | undefined => {
	const operators: Record<string, TokenType> = {
		"<=": "LTE",
		">=": "GTE",
		"==": "EQ",
		"!=": "NEQ",
		"&&": "AND",
		"||": "OR",
		"^^": "XOR",
		"->": "IMPLIES",
	}
	return operators[op]
}

//++ Maps single-character operator strings to token types
const matchOneCharOperator = (op: string): TokenType | undefined => {
	const operators: Record<string, TokenType> = {
		"+": "PLUS",
		"-": "MINUS",
		"*": "MULTIPLY",
		"/": "DIVIDE",
		"^": "POWER",
		"%": "MODULO",
		"<": "LT",
		">": "GT",
		"=": "EQ",
		"!": "NOT",
		"&": "AND",
		"|": "OR",
		"~": "NOT",
	}
	return operators[op]
}
```

### Public API (Materialized)

```typescript
//++ Tokenizes formula string into immutable array of tokens (lazy internally, materialized for consumption)
export const tokenize = (
	input: string,
): Result<ReadonlyArray<Token>, TokenizeError> => {
	try {
		const tokens = Array.from(tokenStream(input))
		return { ok: true, value: Object.freeze(tokens) }
	} catch (error) {
		if (error instanceof TokenizeError) {
			return { ok: false, error }
		}
		throw error // Re-throw unexpected errors
	}
}
```

---

## Layer 3: Parser (AST Construction)

### Purpose

Consumes token stream and builds Abstract Syntax Tree. Works with tree structure, so can accumulate errors.

### Error Handling Strategy

**Tokenizer**: Use **Result monad** (short-circuit)

- Sequential dependencies - one error makes rest unreliable
- Fail fast on invalid character or malformed number

**Parser**: Use **Validation applicative** (accumulate)

- Tree structure allows independent validation of branches
- Can report multiple errors: "missing operand at position 5 AND unbalanced parens at position 12"
- Collect all errors for better developer experience

### AST Node Types

```typescript
type ASTNode =
	| { tag: "Number"; value: number; position: number }
	| { tag: "Identifier"; name: string; position: number }
	| {
		tag: "BinaryOp"
		operator: string
		left: ASTNode
		right: ASTNode
		position: number
	}
	| { tag: "UnaryOp"; operator: string; operand: ASTNode; position: number }
	| {
		tag: "FunctionCall"
		name: string
		args: Array<ASTNode>
		position: number
	}
	| { tag: "Grouped"; expr: ASTNode; position: number }
```

### Parser Implementation (Placeholder)

_Implementation deferred until Toolsmith's boxed monads are complete._

The parser will use **Validation applicative** to accumulate errors across independent branches of the parse tree, while maintaining the curried, pure functional style.

---

## Composability & Lazy Evaluation

### Generator Combinators

```typescript
//++ Skips first n items from a generator
export function* skip<T>(n: number, gen: Generator<T>): Generator<T> {
	let count = 0
	/*++ [EXCEPTION]
	 | for-of loop is permitted inside generator combinator.
	 | Same rationale as tokenStream - implementation detail of lazy iteration.
	 */
	for (const item of gen) {
		if (count++ >= n) yield item
	}
}

//++ Takes first n items from a generator
export function* take<T>(n: number, gen: Generator<T>): Generator<T> {
	let count = 0
	/*++ [EXCEPTION]
	 | for-of loop is permitted inside generator combinator.
	 | Same rationale as tokenStream - implementation detail of lazy iteration.
	 */
	for (const item of gen) {
		if (count++ >= n) return
		yield item
	}
}

//++ Maps a function over generator items
export function* map<T, U>(fn: (t: T) => U, gen: Generator<T>): Generator<U> {
	/*++ [EXCEPTION]
	 | for-of loop is permitted inside generator combinator.
	 | Same rationale as tokenStream - implementation detail of lazy iteration.
	 */
	for (const item of gen) {
		yield fn(item)
	}
}

//++ Filters generator items by predicate
export function* filter<T>(
	pred: (t: T) => boolean,
	gen: Generator<T>,
): Generator<T> {
	/*++ [EXCEPTION]
	 | for-of loop is permitted inside generator combinator.
	 | Same rationale as tokenStream - implementation detail of lazy iteration.
	 */
	for (const item of gen) {
		if (pred(item)) yield item
	}
}
```

### Usage Example

```typescript
// Only tokenize first 10 tokens (lazy - stops early)
const tokens = tokenStream("very long formula with many tokens...")
const firstTen = Array.from(take(10, tokens))

// Filter out certain token types
const onlyNumbers = filter(
	(token) => token.type === "NUMBER",
	tokenStream(formula),
)

// Transform tokens
const enriched = map(
	(token) => ({ ...token, metadata: analyzeToken(token) }),
	tokenStream(formula),
)
```

---

## Performance Characteristics

### Tokenizer (Generator-based)

**Time Complexity**: O(n) where n = input length

- Single pass through input
- No backtracking
- Each character examined once

**Space Complexity**: O(1) per token

- Lazy evaluation - only current token in memory
- No intermediate arrays
- Final materialization: O(k) where k = number of tokens

**Stack Safety**: ✅

- No recursion
- Generator suspension points prevent stack buildup
- Can tokenize arbitrarily long formulas

### Comparison with Alternatives

| Approach        | Time | Space  | Stack-Safe | Lazy |
| --------------- | ---- | ------ | ---------- | ---- |
| **Generator**   | O(n) | O(1)\* | ✅         | ✅   |
| Recursion       | O(n) | O(n)   | ❌         | ❌   |
| Trampoline      | O(n) | O(n²)† | ✅         | ❌   |
| Imperative Loop | O(n) | O(n)   | ✅         | ❌   |

\* O(1) during streaming, O(k) when materialized\
† Array spread creates new array on each iteration

---

## Implementation Checklist

### Phase 1: Lexer

- [ ] Character classification (`classifyChar`)
- [ ] Lazy character stream generator (`lexer`)
- [ ] Peek-ahead helper (`peekAhead`)
- [ ] Unit tests with property-based testing

### Phase 2: Tokenizer

- [ ] Token type definitions
- [ ] Number parser (with decimal validation)
- [ ] Identifier parser (with symbol mapping)
- [ ] Operator parser (single & multi-char)
- [ ] Punctuation parser
- [ ] Token stream generator (`tokenStream`)
- [ ] Public tokenize API (`tokenize`)
- [ ] Error handling (TokenizeError)
- [ ] Unit tests with property-based testing

### Phase 3: Generator Combinators

- [ ] `skip` combinator
- [ ] `take` combinator
- [ ] `map` combinator
- [ ] `filter` combinator
- [ ] Additional combinators as needed
- [ ] Unit tests

### Phase 4: Parser (Deferred)

- [ ] Wait for Toolsmith boxed monads (Result/Validation)
- [ ] AST node definitions
- [ ] Recursive descent parser with Validation accumulation
- [ ] Operator precedence handling
- [ ] Error recovery strategies
- [ ] Property-based testing

---

## Design Decisions Log

### Why Generators?

**Decision**: Use generator functions for tokenization\
**Rationale**: Generators are TypeScript's equivalent to Haskell's lazy lists\
**Benefits**:

- Lazy evaluation - only compute what's needed
- Memory efficient - O(1) space during streaming
- Composable - can chain with map/filter/take
- Stack-safe - no recursion needed

**Alternative Considered**: Trampolining\
**Why Rejected**: Not lazy, array spread O(n²) memory, more verbose, same while loop anyway

### Why `while` Inside Generators?

**Decision**: Allow `while` loops inside generators as implementation detail\
**Rationale**: Generators are pure at the interface level (deterministic, side-effect free)\
**Marking**: Use `[EXCEPTION]` Envoy comment with detailed rationale\
**Comparison**: Haskell uses tail recursion internally - same principle

### Why Separate Lexer and Tokenizer?

**Decision**: Keep lexer (character-level) and tokenizer (token-level) separate\
**Rationale**: Single responsibility, easier testing, clearer concerns\
**Alternative Considered**: Merge into single tokenizer\
**Why Rejected**: Violates separation of concerns, harder to reason about

### Why Result for Tokenizer, Validation for Parser?

**Decision**: Use different monads for different layers\
**Rationale**:

- Tokenizer is sequential - one error invalidates rest
- Parser is tree-based - can collect independent errors
  **Benefits**: Better error messages, fail-fast where appropriate, accumulate where helpful

---

## References

### Internal

- `@sitebender/toolsmith` - For Result/Validation monads (in development)
- `@sitebender/quarrier` - For property-based testing
- `@sitebender/envoy` - For documentation generation

### External

- Haskell's `unfoldr` - Conceptual model for generators
- Category Theory - Monad/Applicative patterns
- Parsec - Inspiration for parser combinators

---

---

## Phase 5: Polish/RPN Notation Support (PLANNED)

### Purpose

Extend the parser to support **Polish notation (prefix)** and **Reverse Polish notation (postfix)** in addition to the current infix notation. This provides flexibility for users who prefer alternative mathematical notations.

### Notation Types

**Infix (current)**: `a + b`

- Operators between operands
- Requires precedence rules
- Needs parentheses for grouping

**Prefix (Polish)**: `+ a b`

- Operators before operands
- No precedence needed (structure is explicit)
- No parentheses needed

**Postfix (RPN)**: `a b +`

- Operators after operands
- No precedence needed (structure is explicit)
- No parentheses needed
- Stack-based evaluation

### Architecture

**Shared Components:**

- ✅ **Lexer** - Character classification is notation-agnostic
- ✅ **Tokenizer** - Token recognition is notation-agnostic
- ✅ **Compiler** - AST enrichment is notation-agnostic

**Notation-Specific Components:**

- ❌ **Parser** - Requires three different implementations:
  - `parseInfix` - Current Pratt parser (already implemented)
  - `parsePrefix` - Recursive descent parser (new)
  - `parsePostfix` - Stack-based parser (new)

### Auto-Detection Strategy

**No explicit notation parameter needed!** The parser will auto-detect notation based on token patterns.

**Detection Algorithm:**

```typescript
//++ Detects notation from token stream pattern
function detectNotation(tokens: Array<Token>): Notation {
	if (tokens.length === 0) {
		return "infix" // default
	}

	const firstToken = tokens[0]
	const lastToken = tokens[tokens.length - 1]

	// Postfix: last token is an operator
	if (isOperator(lastToken.type)) {
		return "postfix"
	}

	// Prefix: first token is an operator
	if (isOperator(firstToken.type)) {
		return "prefix"
	}

	// Infix: operators between operands (default)
	return "infix"
}
```

**Why This Works:**

1. **Unary operators handled by tokenizer**:
   - `-3` tokenizes as single number token (negative literal)
   - `- 3` tokenizes as operator token + number token
   - This spacing rule eliminates ambiguity

2. **Deterministic patterns**:
   - Postfix formulas ALWAYS end with operator: `a b +`, `2 3 4 + *`
   - Prefix formulas ALWAYS start with operator: `+ a b`, `* + a b c`
   - Infix formulas have operators between operands: `a + b`, `(2 + 3) * 4`

3. **Single-operand edge case**:
   - Formula `42` is valid in all notations
   - Produces identical AST regardless
   - No ambiguity in practice

### Implementation Plan

#### 1. Parser Dispatcher (Update `src/parser/index.ts`)

```typescript
import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { Token } from "../tokenizer/types/index.ts"
import type { AstNode } from "./types/index.ts"

import parseInfix from "./parseInfix/index.ts"
import parsePrefix from "./parsePrefix/index.ts"
import parsePostfix from "./parsePostfix/index.ts"
import detectNotation from "./detectNotation/index.ts"

//++ Parses formula with automatic notation detection (curried)
export default function parser(formula: string): Result<string, AstNode> {
	const tokenizerResult = tokenizer(formula)

	if (tokenizerResult._tag === "Error") {
		return tokenizerResult
	}

	const tokens = Array.from(tokenizerResult.value)
		.filter((result) => result._tag === "Ok")
		.map((result) => result.value)

	const notation = detectNotation(tokens)

	// Dispatch to appropriate parser
	if (notation === "prefix") {
		return parsePrefix(tokens)(0)
	}

	if (notation === "postfix") {
		return parsePostfix(tokens)
	}

	// Default: infix
	return parseInfix(tokens)(0)
}
```

#### 2. Prefix Parser (New: `src/parser/parsePrefix/index.ts`)

**Algorithm**: Recursive descent (simpler than infix!)

```typescript
//++ Parses prefix (Polish) notation: + a b
export default function parsePrefix(tokens: Array<Result<string, Token>>) {
	return function parsePrefixWithPosition(
		position: number,
	): Result<string, [AstNode, number]> {
		if (gte(length(tokens))(position)) {
			return error(`Unexpected end of input at position ${position}`)
		}

		const tokenResult = tokens[position]

		if (tokenResult._tag === "Error") {
			return tokenResult
		}

		const token = tokenResult.value

		// Operand: number or identifier
		if (token.type === "number") {
			const node: AstNode = Object.freeze({
				_tag: "numberLiteral",
				value: Number.parseFloat(token.value),
				position: token.position,
			})
			return ok([node, increment(position)])
		}

		if (token.type === "identifier") {
			const node: AstNode = Object.freeze({
				_tag: "variable",
				name: token.value,
				position: token.position,
			})
			return ok([node, increment(position)])
		}

		// Binary operator: parse operator, then two operands
		const operatorResult = tokenTypeToBinaryOperator(token.type)

		if (operatorResult._tag === "Ok") {
			const operator = operatorResult.value
			const nextPosition = increment(position)

			// Recursively parse left operand
			const leftResult = parsePrefix(tokens)(nextPosition)

			if (leftResult._tag === "Error") {
				return leftResult
			}

			const [left, positionAfterLeft] = leftResult.value

			// Recursively parse right operand
			const rightResult = parsePrefix(tokens)(positionAfterLeft)

			if (rightResult._tag === "Error") {
				return rightResult
			}

			const [right, finalPosition] = rightResult.value

			const node: AstNode = Object.freeze({
				_tag: "binaryOperator",
				operator,
				left,
				right,
				position: token.position,
			})

			return ok([node, finalPosition])
		}

		// Unary operator: parse operator, then one operand
		const unaryResult = tokenTypeToUnaryOperator(token.type)

		if (unaryResult._tag === "Ok") {
			const operator = unaryResult.value
			const operandResult = parsePrefix(tokens)(increment(position))

			if (operandResult._tag === "Error") {
				return operandResult
			}

			const [operand, finalPosition] = operandResult.value

			const node: AstNode = Object.freeze({
				_tag: "unaryOperator",
				operator,
				operand,
				position: token.position,
			})

			return ok([node, finalPosition])
		}

		return error(`Unexpected token '${token.value}' at position ${position}`)
	}
}
```

#### 3. Postfix Parser (New: `src/parser/parsePostfix/index.ts`)

**Algorithm**: Stack-based (even simpler!)

```typescript
//++ Parses postfix (RPN) notation: a b +
export default function parsePostfix(
	tokens: Array<Result<string, Token>>,
): Result<string, AstNode> {
	const stack: Array<AstNode> = []
	let position = 0

	/*++ [EXCEPTION]
   | While loop permitted for stack-based RPN parsing.
   | This is the standard algorithm for postfix evaluation.
   | Remains pure: same tokens always produce same AST.
   */
	while (lt(length(tokens))(position)) {
		const tokenResult = tokens[position]

		if (tokenResult._tag === "Error") {
			return tokenResult
		}

		const token = tokenResult.value

		// Operand: push to stack
		if (token.type === "number") {
			const node: AstNode = Object.freeze({
				_tag: "numberLiteral",
				value: Number.parseFloat(token.value),
				position: token.position,
			})
			stack.push(node)
			position = increment(position)
			continue
		}

		if (token.type === "identifier") {
			const node: AstNode = Object.freeze({
				_tag: "variable",
				name: token.value,
				position: token.position,
			})
			stack.push(node)
			position = increment(position)
			continue
		}

		// Binary operator: pop two operands
		const operatorResult = tokenTypeToBinaryOperator(token.type)

		if (operatorResult._tag === "Ok") {
			if (lt(length(stack))(2)) {
				return error(
					`Insufficient operands for operator '${token.value}' at position ${token.position}`,
				)
			}

			const right = stack.pop()!
			const left = stack.pop()!

			const node: AstNode = Object.freeze({
				_tag: "binaryOperator",
				operator: operatorResult.value,
				left,
				right,
				position: token.position,
			})

			stack.push(node)
			position = increment(position)
			continue
		}

		// Unary operator: pop one operand
		const unaryResult = tokenTypeToUnaryOperator(token.type)

		if (unaryResult._tag === "Ok") {
			if (lt(length(stack))(1)) {
				return error(
					`Insufficient operands for operator '${token.value}' at position ${token.position}`,
				)
			}

			const operand = stack.pop()!

			const node: AstNode = Object.freeze({
				_tag: "unaryOperator",
				operator: unaryResult.value,
				operand,
				position: token.position,
			})

			stack.push(node)
			position = increment(position)
			continue
		}

		return error(
			`Unexpected token '${token.value}' at position ${token.position}`,
		)
	}

	if (isEqual(length(stack))(1)) {
		return ok(stack[0])
	}

	if (lt(1)(length(stack))) {
		return error(
			`Multiple expressions found (stack has ${length(stack)} items)`,
		)
	}

	return error("Empty expression")
}
```

#### 4. Notation Detection (New: `src/parser/detectNotation/index.ts`)

```typescript
import type { Token } from "../../tokenizer/types/index.ts"

export type Notation = "infix" | "prefix" | "postfix"

//++ Detects notation from token pattern (first/last token analysis)
export default function detectNotation(tokens: Array<Token>): Notation {
	if (isEqual(length(tokens))(0)) {
		return "infix" // default for empty
	}

	const firstToken = tokens[0]
	const lastToken = tokens[length(tokens) - 1]

	// Check if token is an operator (not operand)
	const isOperatorToken = (token: Token): boolean => {
		return token.type === "plus" ||
			token.type === "minus" ||
			token.type === "multiply" ||
			token.type === "divide" ||
			token.type === "power"
		// Add more operators as needed
	}

	// Postfix: last token is operator
	if (isOperatorToken(lastToken)) {
		return "postfix"
	}

	// Prefix: first token is operator
	if (isOperatorToken(firstToken)) {
		return "prefix"
	}

	// Default: infix
	return "infix"
}
```

### Testing Strategy

**Test Cases for Each Notation:**

```typescript
// Infix tests (already exist)
"2 + 3"           → { _tag: "binaryOperator", operator: "add", ... }
"a * b + c"       → precedence preserved
"(a + b) * c"     → grouping preserved

// Prefix tests (new)
"+ 2 3"           → { _tag: "binaryOperator", operator: "add", ... }
"* + a b c"       → nested structure
"- 5"             → unary negation

// Postfix tests (new)
"2 3 +"           → { _tag: "binaryOperator", operator: "add", ... }
"a b + c *"       → nested structure
"5 -"             → unary negation

// Auto-detection tests (new)
detectNotation(tokens("2 + 3"))   → "infix"
detectNotation(tokens("+ 2 3"))   → "prefix"
detectNotation(tokens("2 3 +"))   → "postfix"
detectNotation(tokens("42"))      → "infix" (default)
```

**Round-trip Testing:**

```typescript
// Verify all notations produce same AST
const infixAST = parser("a + b")
const prefixAST = parser("+ a b")
const postfixAST = parser("a b +")

// All should produce identical structure (positions differ)
assertEquals(infixAST.value._tag, prefixAST.value._tag)
assertEquals(infixAST.value.operator, prefixAST.value.operator)
// etc.
```

### Benefits

1. **No API complexity** - Single `parser(formula)` signature
2. **User choice** - Users can write formulas in their preferred notation
3. **Simpler notation** - Polish/RPN require no parentheses or precedence
4. **Same output** - All notations produce identical AST structure
5. **Shared infrastructure** - Reuses lexer, tokenizer, and compiler

### Implementation Checklist

- [ ] Implement `detectNotation` with token pattern analysis
- [ ] Implement `parsePrefix` with recursive descent
- [ ] Implement `parsePostfix` with stack-based algorithm
- [ ] Update parser dispatcher to auto-detect and route
- [ ] Add helper: `tokenTypeToBinaryOperator` shared across parsers
- [ ] Add helper: `tokenTypeToUnaryOperator` shared across parsers
- [ ] Add helper: `isOperatorToken` for detection
- [ ] Write unit tests for prefix parser (15+ tests)
- [ ] Write unit tests for postfix parser (15+ tests)
- [ ] Write unit tests for notation detection (10+ tests)
- [ ] Write integration tests for round-trip equivalence
- [ ] Update demo script to show all three notations
- [ ] Add documentation with examples

**Estimated effort**: ~200 lines of production code, ~300 lines of tests

---

## Semantic Accessors for Architect

### Purpose

Formulator maintains a **uniform structure** for binary operators using `left` and `right` fields. This simplifies internal implementation and allows consistent traversal patterns. However, **Architect** (the AST consumer) benefits from **semantic terminology** for clarity and correctness.

### Design Decision

**Formulator**: Keep uniform structure

```typescript
type BinaryOperatorNode = {
	_tag: "binaryOperator"
	operator: BinaryOperation
	left: EnrichedAstNode // uniform for all operators
	right: EnrichedAstNode // uniform for all operators
	position: number
	datatype: Datatype
}
```

**Architect**: Provide semantic accessor functions that return `Result` monads

### Accessor Functions to Implement in Architect

All accessors follow this pattern:

1. Validate node is `binaryOperator`
2. Validate operator matches expected type
3. Return appropriate operand wrapped in `Result`

#### Addition Accessors

```typescript
// @sitebender/architect/src/ast/accessors/getAugend/index.ts
//++ Extracts the augend (left operand) from an add operation
export default function getAugend(
	node: EnrichedAstNode,
): Result<string, EnrichedAstNode> {
	if (node._tag !== "binaryOperator") {
		return error(`Expected binaryOperator, got ${node._tag}`)
	}
	if (node.operator !== "add") {
		return error(`Expected add operator, got ${node.operator}`)
	}
	return ok(node.left)
}

// @sitebender/architect/src/ast/accessors/getAddend/index.ts
//++ Extracts the addend (right operand) from an add operation
export default function getAddend(
	node: EnrichedAstNode,
): Result<string, EnrichedAstNode> {
	if (node._tag !== "binaryOperator") {
		return error(`Expected binaryOperator, got ${node._tag}`)
	}
	if (node.operator !== "add") {
		return error(`Expected add operator, got ${node.operator}`)
	}
	return ok(node.right)
}
```

#### Subtraction Accessors

```typescript
// @sitebender/architect/src/ast/accessors/getMinuend/index.ts
//++ Extracts the minuend (left operand) from a subtract operation
export default function getMinuend(
	node: EnrichedAstNode,
): Result<string, EnrichedAstNode> {
	if (node._tag !== "binaryOperator") {
		return error(`Expected binaryOperator, got ${node._tag}`)
	}
	if (node.operator !== "subtract") {
		return error(`Expected subtract operator, got ${node.operator}`)
	}
	return ok(node.left)
}

// @sitebender/architect/src/ast/accessors/getSubtrahend/index.ts
//++ Extracts the subtrahend (right operand) from a subtract operation
export default function getSubtrahend(
	node: EnrichedAstNode,
): Result<string, EnrichedAstNode> {
	if (node._tag !== "binaryOperator") {
		return error(`Expected binaryOperator, got ${node._tag}`)
	}
	if (node.operator !== "subtract") {
		return error(`Expected subtract operator, got ${node.operator}`)
	}
	return ok(node.right)
}
```

#### Multiplication Accessors

```typescript
// @sitebender/architect/src/ast/accessors/getMultiplicand/index.ts
//++ Extracts the multiplicand (left operand) from a multiply operation
export default function getMultiplicand(
	node: EnrichedAstNode,
): Result<string, EnrichedAstNode> {
	if (node._tag !== "binaryOperator") {
		return error(`Expected binaryOperator, got ${node._tag}`)
	}
	if (node.operator !== "multiply") {
		return error(`Expected multiply operator, got ${node.operator}`)
	}
	return ok(node.left)
}

// @sitebender/architect/src/ast/accessors/getMultiplier/index.ts
//++ Extracts the multiplier (right operand) from a multiply operation
export default function getMultiplier(
	node: EnrichedAstNode,
): Result<string, EnrichedAstNode> {
	if (node._tag !== "binaryOperator") {
		return error(`Expected binaryOperator, got ${node._tag}`)
	}
	if (node.operator !== "multiply") {
		return error(`Expected multiply operator, got ${node.operator}`)
	}
	return ok(node.right)
}
```

#### Division Accessors

```typescript
// @sitebender/architect/src/ast/accessors/getDividend/index.ts
//++ Extracts the dividend (left operand) from a divide operation
export default function getDividend(
	node: EnrichedAstNode,
): Result<string, EnrichedAstNode> {
	if (node._tag !== "binaryOperator") {
		return error(`Expected binaryOperator, got ${node._tag}`)
	}
	if (node.operator !== "divide") {
		return error(`Expected divide operator, got ${node.operator}`)
	}
	return ok(node.left)
}

// @sitebender/architect/src/ast/accessors/getDivisor/index.ts
//++ Extracts the divisor (right operand) from a divide operation
export default function getDivisor(
	node: EnrichedAstNode,
): Result<string, EnrichedAstNode> {
	if (node._tag !== "binaryOperator") {
		return error(`Expected binaryOperator, got ${node._tag}`)
	}
	if (node.operator !== "divide") {
		return error(`Expected divide operator, got ${node.operator}`)
	}
	return ok(node.right)
}
```

#### Exponentiation Accessors

```typescript
// @sitebender/architect/src/ast/accessors/getBase/index.ts
//++ Extracts the base (left operand) from a power operation
export default function getBase(
	node: EnrichedAstNode,
): Result<string, EnrichedAstNode> {
	if (node._tag !== "binaryOperator") {
		return error(`Expected binaryOperator, got ${node._tag}`)
	}
	if (node.operator !== "power") {
		return error(`Expected power operator, got ${node.operator}`)
	}
	return ok(node.left)
}

// @sitebender/architect/src/ast/accessors/getExponent/index.ts
//++ Extracts the exponent (right operand) from a power operation
export default function getExponent(
	node: EnrichedAstNode,
): Result<string, EnrichedAstNode> {
	if (node._tag !== "binaryOperator") {
		return error(`Expected binaryOperator, got ${node._tag}`)
	}
	if (node.operator !== "power") {
		return error(`Expected power operator, got ${node.operator}`)
	}
	return ok(node.right)
}
```

### Usage Example in Architect

```typescript
import subtract from "@sitebender/toolsmith/math/subtract/index.ts"
import getMinuend from "./ast/accessors/getMinuend/index.ts"
import getSubtrahend from "./ast/accessors/getSubtrahend/index.ts"
import map2 from "@sitebender/toolsmith/monads/result/map2/index.ts"

//++ Compiles subtract AST node to executable function
function compileSubtract(node: EnrichedAstNode) {
	const minuendResult = getMinuend(node)
	const subtrahendResult = getSubtrahend(node)

	return map2(
		(minuend) => (subtrahend) =>
			subtract(compile(minuend))(compile(subtrahend)),
	)(minuendResult)(subtrahendResult)
}
```

### Benefits

1. **Separation of concerns**: Formulator stays simple, Architect gets semantic clarity
2. **Type safety**: Result monad catches incorrect operator access
3. **Readability**: `getMinuend(node)` is clearer than `node.left` when operator is subtract
4. **No redundancy**: No duplicate fields in AST structure
5. **Clean architecture**: Each library handles its own concerns

### Complete Accessor List

| Operation      | Left Operand Accessor | Right Operand Accessor |
| -------------- | --------------------- | ---------------------- |
| Addition       | `getAugend()`         | `getAddend()`          |
| Subtraction    | `getMinuend()`        | `getSubtrahend()`      |
| Multiplication | `getMultiplicand()`   | `getMultiplier()`      |
| Division       | `getDividend()`       | `getDivisor()`         |
| Exponentiation | `getBase()`           | `getExponent()`        |

---

## Future Enhancements

### Chemical Formula Support (Possible Future Extension)

**Note**: Chemical formula support is not currently planned. ChemML has limited adoption and modern chemical visualization typically uses specialized tools (JSMol, 3Dmol.js) or SVG/Canvas rendering. If added in the future:

- Separate tokenizer for chemical notation
- Subscript/superscript handling
- Element symbol recognition
- Equation balancing
- Integration with existing chemistry visualization libraries

### Advanced Features

- Better error recovery in parser
- Incremental parsing for live editing
- Source mapping for error positions
- Multiple error reporting strategies

### Performance Optimizations

- Token interning for common identifiers
- Memoization of symbol mappings
- Streaming compilation (tokenize → parse → compile in one pass)
