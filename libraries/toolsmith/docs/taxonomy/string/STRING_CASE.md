# String - Case Conversion Functions

**Location**: `src/string/toCase/` and `src/string/`
**Functions**: 14
**Status**: Cataloged
**Created**: 2025-10-07

---

## Function List

I am thinking that for clarity, maybe we need the "Case" as in `toCamelCase`, `toPascalCase`, etc..

### toCamel

- **Current**: `(str: string | null | undefined) => string`
- **Returns**: string (empty string on null/undefined or no words)
- **Description**: [INFERRED] Converts string to camelCase: first word lowercase, subsequent words capitalized; handles various input formats
- **Target**: `(str: string) => Result<StringError, string>`

### toPascal

- **Current**: `(s: string) => string`
- **Returns**: string (returns input unchanged on null/undefined)
- **Description**: [INFERRED] Converts string to PascalCase: all words capitalized and joined; handles kebab-case, snake_case, and space-separated inputs
- **Target**: `(s: string) => Result<StringError, string>`

### toKebab

- **Current**: `(s: string) => string`
- **Returns**: string (returns input unchanged on null/undefined)
- **Description**: [INFERRED] Converts string to kebab-case: lowercase with hyphens; handles camelCase, PascalCase, snake_case, and space-separated inputs
- **Target**: `(s: string) => Result<StringError, string>`

### toSnake

- **Current**: `(s: string) => string`
- **Returns**: string (returns input unchanged on null/undefined)
- **Description**: [INFERRED] Converts string to snake_case: lowercase with underscores; handles camelCase, PascalCase, kebab-case, and space-separated inputs
- **Target**: `(s: string) => Result<StringError, string>`

### toScreamingSnake

- **Current**: `(s: string) => string`
- **Returns**: string (returns input unchanged on null/undefined)
- **Description**: [INFERRED] Converts string to SCREAMING_SNAKE_CASE: uppercase with underscores; handles camelCase, PascalCase, kebab-case, and space-separated inputs
- **Target**: `(s: string) => Result<StringError, string>`

### toTitle

- **Current**: `(s: string) => string`
- **Returns**: string (returns input unchanged on null/undefined)
- **Description**: [INFERRED] Converts string to Title Case following standard rules: capitalizes first/last words and all other words except articles, conjunctions, and short prepositions
- **Target**: `(s: string) => Result<StringError, string>`

### toSentence

- **Current**: `(s: string) => string`
- **Returns**: string (returns input unchanged on null/undefined)
- **Description**: [INFERRED] Converts string to sentence case: capitalizes only the first letter, rest lowercase
- **Target**: `(s: string) => Result<StringError, string>`

### toTrain

- **Current**: `(s: string) => string`
- **Returns**: string (returns input unchanged on null/undefined)
- **Description**: [INFERRED] Converts string to Train-Case: each word capitalized with hyphens; handles camelCase, PascalCase, snake_case, kebab-case, and space-separated inputs
- **Target**: `(s: string) => Result<StringError, string>`

### toUpper

- **Current**: `(str: string) => string`
- **Returns**: string
- **Description**: [INFERRED] Converts string to uppercase using locale-aware toLocaleUpperCase
- **Target**: `(str: string) => Result<StringError, string>`

### toLower

- **Current**: `(str: string) => string`
- **Returns**: string
- **Description**: [INFERRED] Converts string to lowercase using locale-aware toLocaleLowerCase
- **Target**: `(str: string) => Result<StringError, string>`

### toUpperFirst

- **Current**: `(str: string | null | undefined) => string`
- **Returns**: string (empty string on null/undefined or empty input)
- **Description**: [INFERRED] Capitalizes the first character, leaves rest unchanged
- **Target**: `(str: string) => Result<StringError, string>`

### toLowerFirst

- **Current**: `(str: string | null | undefined) => string`
- **Returns**: string (empty string on null/undefined or empty input)
- **Description**: [INFERRED] Lowercases the first character, leaves rest unchanged
- **Target**: `(str: string) => Result<StringError, string>`

### swapCase

- **Current**: `(str: string | null | undefined) => string`
- **Returns**: string (empty string on null/undefined or non-string input)
- **Description**: [INFERRED] Swaps the case of all alphabetic characters including extended Latin characters (U+00C0-U+024F, U+1E00-U+1EFF)
- **Target**: `(str: string) => Result<StringError, string>`

### toCase

- **Current**: `(caseType: CaseType) => CaseConverter`
- **Returns**: Function that converts to specified case type
- **Description**: [INFERRED] Factory function that returns appropriate case converter based on case type; supports camel, kebab, lower, pascal, sentence, snake, SNAKE, title, train, upper
- **Target**: `(caseType: CaseType) => (str: string) => Result<StringError, string>`

---

## Migration Notes

Case conversion functions will be converted to Result-returning functions that provide detailed error information on failure. The monadic versions will:

1. Return `ok(value)` when conversion succeeds with valid string input
2. Return `error(StringError)` when conversion fails, with descriptive error messages
3. Maintain currying for all multi-parameter functions
4. Preserve locale-aware case conversion where applicable
5. Replace empty string returns for null/undefined with explicit error values
6. Maintain support for multiple input formats (camelCase, snake_case, kebab-case, etc.)

## Special Considerations

### Return Value Patterns

#### Functions Returning Empty String

- **toCamel**, **toUpperFirst**, **toLowerFirst**, **swapCase** return empty string on null/undefined input
- Should return `error(StringError)` in monadic form

#### Functions Returning Input Unchanged

- **toPascal**, **toKebab**, **toSnake**, **toScreamingSnake**, **toTitle**, **toSentence**, **toTrain** return input unchanged when `not(s)` is true
- Should return `error(StringError)` in monadic form for invalid input

#### Locale-Aware Functions

- **toUpper** uses `toLocaleUpperCase()`
- **toLower** uses `toLocaleLowerCase()`
- Should maintain locale awareness in monadic versions

### Title Case Exception Words

**toTitle** maintains a list of words that should not be capitalized (except when first or last):

**Articles**: a, an, the

**Coordinating Conjunctions**: and, but, for, nor, or, so, yet

**Prepositions (≤4 letters)**: as, at, by, in, of, on, to, up, via, with, from, into, like, near, once, onto, over, past, than, till, upon

**Other**: vs, versus, v, per

### Arrow Function Syntax

Several functions use arrow syntax and need refactoring to named functions:

- **toUpper** (arrow function)
- **toLower** (arrow function)
- All others already use proper function declarations

### Complex Validation Logic

#### toCamel

- Uses `words()` helper to split input into word array
- Returns empty string if no words found
- Destructures first word separately from rest
- First word converted to lowercase, remaining words capitalized

#### toPascal

- Uses regex `/[-_\s]+/` to split on kebab, snake, and space separators
- Maps each word to capitalize first char, lowercase rest

#### toKebab

- Uses regex to insert hyphens: `/([a-z])([A-Z])/g` for camelCase/PascalCase boundaries
- Replaces spaces and underscores with hyphens
- Converts all to lowercase

#### toSnake

- Uses regex to insert underscores: `/([a-z])([A-Z])/g` for camelCase/PascalCase boundaries
- Replaces hyphens and spaces with underscores
- Converts all to lowercase

#### toScreamingSnake

- Same logic as toSnake but converts to uppercase instead of lowercase

#### toTitle

- Normalizes input by inserting spaces at camelCase boundaries
- Replaces kebab/snake separators with spaces
- Applies capitalization rules based on word position and exception list
- Always capitalizes first and last words regardless of exception list

#### toSentence

- Trims input
- Capitalizes only first character
- Lowercases everything else

#### toTrain

- Similar to toKebab but capitalizes each word after splitting
- Creates Title-Case-With-Hyphens format

#### swapCase

- Uses regex `/[a-zA-Z\u00C0-\u024F\u1E00-\u1EFF]/g` to match ASCII and extended Latin characters
- Swaps uppercase to lowercase and vice versa for each character

### Function Dependencies

#### toCamel

- Depends on: `words` (from `../../words/index.ts`)
- Uses array destructuring and map

#### toPascal, toKebab, toSnake, toScreamingSnake, toTitle, toSentence, toTrain

- Depend on: `not` (from `../../../validation/not/index.ts`)
- Use regex for pattern matching and replacement

#### toUpperFirst, toLowerFirst, swapCase

- Depend on: `isNullish` (from `../../../predicates/isNullish/index.ts`)
- **toUpperFirst** and **toLowerFirst** also check `typeof str !== "string"`

#### toCase

- Depends on: All individual case conversion functions
- Uses switch statement to map CaseType to converter function

### Type Definitions

#### CaseType

```typescript
type CaseType =
	| "camel"
	| "kebab"
	| "lower"
	| "pascal"
	| "sentence"
	| "snake"
	| "SNAKE" // Screaming snake case
	| "title"
	| "train"
	| "upper"
```

#### CaseConverter

```typescript
type CaseConverter = (str: string | null | undefined) => string
```

Should be updated to:

```typescript
type CaseConverter = (str: string) => Result<StringError, string>
```

### Special Cases and Edge Cases

#### Empty String Handling

- **toCamel**: Returns empty string for null/undefined or when `words()` returns empty array
- **toUpperFirst**, **toLowerFirst**: Return empty string for null/undefined, empty string, or zero length
- **swapCase**: Returns empty string for null/undefined or non-string input

#### Single Character Strings

- All functions should handle single character strings correctly
- **toUpperFirst**, **toLowerFirst**: Use index access `str[0]` which works for single chars
- **swapCase**: Works character-by-character so handles single chars

#### Unicode Support

- **toUpper**, **toLower**: Use locale-aware methods for proper Unicode handling
- **swapCase**: Explicitly supports extended Latin characters (U+00C0-U+024F, U+1E00-U+1EFF)
- Other functions may need Unicode consideration for word boundary detection

#### Multi-Format Input Support

Most conversion functions handle multiple input formats:

- camelCase / PascalCase
- snake_case
- kebab-case
- space-separated words

#### Regex Patterns Used

- `/([a-z])([A-Z])/g` - Detects camelCase/PascalCase boundaries
- `/[-_\s]+/g` - Matches hyphens, underscores, and spaces
- `/[a-zA-Z\u00C0-\u024F\u1E00-\u1EFF]/g` - Matches ASCII and extended Latin alphabetic chars

---

## Implementation Dependencies

When planning migration, consider these dependency chains:

### Validation Dependencies

- **toCamel**, **toPascal**, **toKebab**, **toSnake**, **toScreamingSnake**, **toTitle**, **toSentence**, **toTrain** depend on `not`
- **toUpperFirst**, **toLowerFirst**, **swapCase** depend on `isNullish`

### String Operation Dependencies

- **toCamel** depends on `words` helper function
- All functions use native String methods (charAt, slice, toLowerCase, toUpperCase, etc.)
- Should migrate to functional equivalents where applicable

### Factory Function

- **toCase** serves as factory/dispatcher for all case conversion functions
- Useful for dynamic case conversion based on runtime configuration
- Should maintain this pattern in monadic version

### Refactoring Requirements

- Functions with arrow syntax need rewrites to named functions:
  - **toUpper**
  - **toLower**
- All functions need to handle null/undefined through error values rather than special return values
- Consider whether to maintain permissive input handling or enforce stricter types

---

## Notes

### Missing Case Conversion Functions

Consider implementing these during migration:

- **toDotCase**: Converts to dot.case (common in namespacing)
- **toPathCase**: Converts to path/case (filesystem paths)
- **toConstantCase**: Alias for SCREAMING_SNAKE_CASE (more descriptive name)
- **capitalize**: Capitalize first letter only (simpler than toSentence which also lowercases rest)
- **capitalizeWords**: Capitalize first letter of each word without case rules
- **deburr**: Remove diacritics before case conversion (currently exists separately)

### Related String Functions

The codebase has related string manipulation functions:

- `words` - Word extraction (used by toCamel)
- `deburr` - Diacritic removal (useful before case conversion)
- `normalize` - Unicode normalization (useful for consistent case conversion)

### Testing Considerations

When migrating, ensure comprehensive tests for:

- Null and undefined inputs
- Empty strings
- Single character strings
- Unicode characters (including extended Latin)
- Multi-format inputs (camelCase, snake_case, kebab-case, etc.)
- Strings with numbers and special characters
- Locale-specific case conversions
- Title case exception words at different positions
- Edge cases for regex patterns

### Performance Considerations

- Regex-heavy functions (toKebab, toSnake, etc.) may benefit from optimization
- Consider caching compiled regexes if performance becomes an issue
- **toCase** factory pattern allows for single import and dynamic dispatch
