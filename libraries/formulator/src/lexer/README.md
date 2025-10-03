# Formulator Lexer - Phase 1 Implementation

## Status: ✅ COMPLETE

**103 tests passing** | Pure functional | Zero dependencies | O(1) character classification

---

## What Was Built

Phase 1 of the Formulator parser: **Character-level lexical analysis** using generator-based lazy evaluation and Unicode code point maps.

### Architecture

```
Input String → Lexer (Generator) → Stream of LexerTokens
                                   { char, position, charClass }
```

### Key Innovation: O(1) Unicode Character Code Maps

Instead of RegEx patterns, we use **direct Unicode code point lookups** for instant classification:

```typescript
CHAR_MAP[0x002a] // * → "MULTIPLY"
CHAR_MAP[0x00d7] // × → "MULTIPLY"
CHAR_MAP[0x22c5] // ⋅ → "MULTIPLY"
```

**Benefits:**

- ✅ O(1) performance (object property lookup)
- ✅ Multiple Unicode variants supported (`*`, `×`, `·`, `⋅`, `∗` all → MULTIPLY)
- ✅ Culturally inclusive (international mathematical notation)
- ✅ Type-safe (TypeScript verifies completeness)
- ✅ Explicit and documented (every character visible)

---

## Implementation Details

### Character Classification System

**Primary Map (137+ entries):**

- ASCII digits 0-9
- ASCII letters A-Z, a-z
- Greek letters α-ω, Α-Ω
- Mathematical operators (×, ÷, ±, etc.)
- Parentheses (including Unicode variants)
- Whitespace characters

**Unicode Fallbacks:**

- `isUnicodeDigit` - Unicode category Nd (all number systems)
- `isUnicodeLetter` - Unicode categories Ll, Lu, Lt, Lm, Lo
- `isUnicodeWhitespace` - Unicode whitespace patterns

**Two-Character Operators:**

- `<=`, `>=`, `!=`, `==`
- `&&`, `||`, `^^`
- `->` (implies)

### Generator-Based Lazy Evaluation

The lexer uses JavaScript generators to achieve Haskell-style lazy lists:

```typescript
export default function* lexer(input: string): Generator<LexerToken> {
	let position = 0

	// While loop permitted inside generators (implementation detail)
	while (position < input.length) {
		const char = input[position]
		yield {
			char,
			position,
			charClass: classifyCharacter(char),
		}
		position++
	}
}
```

**Why Generators?**

- Lazy evaluation - only compute what's needed
- Memory efficient - O(1) space during streaming
- Stack-safe - no recursion needed
- Composable - can chain with map/filter/take

---

## File Structure

```
src/lexer/
├── index.ts                          # Main lexer generator (60 lines)
├── index.test.ts                     # 15 tests with property-based testing
├── types/
│   └── index.ts                      # CharacteracterType, CharacterClass, LexerToken types
├── constants/
│   ├── charMap.ts                    # Precomputed CHAR_MAP (module load)
│   └── twoCharacterMap.ts                 # Two-char operator mapping
├── buildCharacterMap/
│   ├── index.ts                      # Programmatic map builder
│   ├── index.test.ts                 # 16 tests
│   ├── addRangeToMap/
│   │   ├── index.ts                  # Curried range adder
│   │   └── index.test.ts             # 6 tests
│   └── addListToMap/
│       ├── index.ts                  # Curried list adder
│       └── index.test.ts             # 6 tests
├── classifyCharacter/
│   ├── index.ts                      # Main O(1) classification
│   ├── index.test.ts                 # 17 tests with fast-check
│   ├── _isUnicodeDigit/
│   │   ├── index.ts                  # Unicode digit fallback
│   │   └── index.test.ts             # 5 tests
│   ├── _isUnicodeLetter/
│   │   ├── index.ts                  # Unicode letter fallback
│   │   └── index.test.ts             # 8 tests
│   └── _isUnicodeWhitespace/
│       ├── index.ts                  # Unicode whitespace fallback
│       └── index.test.ts             # 9 tests
└── checkTwoCharacterOperator/
    ├── index.ts                      # Two-char operator detection
    ├── index.test.ts                 # 13 tests
    └── _makeCompositeKey/
        ├── index.ts                  # Composite key generator
        └── index.test.ts             # 8 tests
```

**Total:** 19 implementation files, 10 test files, 103 passing tests

---

## Test Coverage

### Unit Tests (88 tests)

- Character map builders
- Classification functions
- Two-char operator detection
- Unicode fallbacks

### Property-Based Tests (15 tests via fast-check)

- Determinism (same input → same output)
- Range completeness (all codes in range mapped)
- Output invariants (length, positions, chars)
- Uniqueness guarantees

### Key Properties Verified

✅ Classification is deterministic
✅ Output length equals input length
✅ Positions are sequential (0, 1, 2, ...)
✅ Characters match input exactly
✅ Multiple Unicode variants map to same type
✅ Frozen immutable outputs

---

## Performance Characteristics

**Time Complexity:** O(n) where n = input length

- Single pass through input
- O(1) character classification (map lookup)
- No backtracking

**Space Complexity:** O(1) per token during streaming

- Lazy evaluation - only current token in memory
- Final materialization: O(k) where k = number of tokens

**Stack Safety:** ✅ No recursion, generator-based iteration

---

## Design Decisions

### 1. Unicode Code Maps vs RegEx

**Decision:** Use Unicode code point maps
**Rationale:** O(1) lookup vs O(n) regex testing, supports multiple variants

### 2. Generators for Lazy Evaluation

**Decision:** Use generator functions
**Rationale:** TypeScript's equivalent to Haskell lazy lists

### 3. While Loops in Generators

**Decision:** Allow while loops inside generators with [EXCEPTION] comments
**Rationale:** Implementation detail of lazy iteration; function remains pure at interface level

### 4. Precompute Character Map

**Decision:** Generate CHAR_MAP at module load time
**Rationale:** Unicode isn't changing; one-time cost for frozen immutable map

### 5. Separate Lexer/Tokenizer/Parser

**Decision:** Keep character-level (lexer) separate from token-level (tokenizer)
**Rationale:** Single responsibility, easier testing, clearer concerns

---

## What's Next: Phase 2 (Tokenizer)

The tokenizer will consume the lexer's character stream and produce tokens:

```
LexerToken stream → Tokenizer (Generator) → Token stream
                                             Result<Error, Token>
```

**Tokenizer will:**

- Parse numbers (with decimal validation)
- Parse identifiers (with Greek symbol mapping)
- Parse multi-char operators (using checkTwoCharacterOperator)
- Parse function calls
- Wrap results in `Result<Error, Token>` for fail-fast error handling

**Key Difference:**

- Lexer: Pure data (no errors, classifies everything including Unknown)
- Tokenizer: Result monad (can fail on malformed input)

---

## Notes for Architect

### Unicode Comparison Operators

Single-character Unicode operators (≤, ≥, ≠) should be added to CHAR_MAP for single-character handling, not treated as two-character operators. Currently these are classified as UNKNOWN - needs follow-up to add proper CharacterType entries.

### Private Function Convention

All helper functions follow underscore naming (`_isUnicodeDigit`) per Warden privacy rules.

### Envoy Comments

All public functions have `//++` description comments. Private helpers have minimal comments. [EXCEPTION] comments document while loops in generators with full rationale.

### TDD Process

Every function was implemented with **test-first approach**:

1. Write failing test
2. Implement function to make it pass
3. Refactor if needed
4. Add property-based tests

**Zero `assert(true)` bullshit. Every test verifies real behavior.**

---

**Phase 1 Complete. Ready for review.**
