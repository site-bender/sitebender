# Formulator Tokenizer & Parser Architecture Plan

> **Pure functional, lazy, generator-based tokenization and parsing for mathematical and chemical formulas**

## Implementation Status

**Current Phase**: 🚧 **Phase 3 - Parser** (AST construction) - READY TO START

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

**Critical Fixes Applied (Before Phase 3):**
- ✅ Renamed `checkTwoCharOperator` → `checkTwoCharacterOperator` (no abbreviations)
- ✅ Fixed inner function naming: descriptive names, not generic
- ✅ Converted all `undefined` returns to Result monads
- ✅ Applied positive-first logic throughout (no negative conditionals)
- ✅ Integrated Toolsmith functions: `lt`, `increment`, `length` (no raw operators)
- ✅ Updated property names: `character`, `characterClass`, `_tag`
- ✅ All 98 tests passing, linter clean, type check passing

**Next Phase**: 🚧 **Phase 3 - Parser** (AST construction) - READY TO START

**Total Tests Passing**: 98 (56 lexer + 42 tokenizer)
**Linter**: ✅ All files passing
**Type Check**: ✅ All files passing

**Implementation Guides:**
- **Start here:** `docs/context-for-phase3.md` - Critical rules and patterns from Phases 1 & 2
- **Then read:** `docs/prompt.md` - Detailed Phase 3 implementation guide

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

---

**Status**: Planning phase complete, awaiting Toolsmith boxed monads for implementation

**Next Steps**:

1. Complete Toolsmith Result/Validation monads
2. Implement lexer with generators
3. Implement tokenizer with generators
4. Add comprehensive property-based tests
5. Implement parser with Validation accumulation
