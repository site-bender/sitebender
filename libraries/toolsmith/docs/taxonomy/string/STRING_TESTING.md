# String - Testing & Predicate Functions

**Location**: `src/string/`
**Functions**: 15
**Status**: Cataloged
**Created**: 2025-10-07

---

## Function List

### contains

- **Current**: `(substring: string | null | undefined) => (str: string | null | undefined) => boolean`
- **Returns**: Boolean indicating if substring is found
- **Description**: [INFERRED] Checks if a string contains a given substring, returns false for null/undefined inputs
- **Target**: `(substring: string) => (str: string) => Result<ValidationError, string>`

### includes

- **Current**: `(substring: string | null | undefined) => (str: string | null | undefined) => boolean`
- **Returns**: Boolean (alias to contains)
- **Description**: Returns true if the string contains the substring (alias to contains)
- **Target**: `(substring: string) => (str: string) => Result<ValidationError, string>`

### startsWith

- **Current**: `(searchString: string) => (str: string) => boolean`
- **Returns**: Boolean
- **Description**: [INFERRED] Checks if a string starts with the given search string
- **Target**: `(searchString: string) => (str: string) => Result<ValidationError, string>`

### endsWith

- **Current**: `(searchString: string) => (str: string) => boolean`
- **Returns**: Boolean
- **Description**: [INFERRED] Checks if a string ends with the given search string
- **Target**: `(searchString: string) => (str: string) => Result<ValidationError, string>`

### isEmpty

- **Current**: `(str: string) => boolean`
- **Returns**: Boolean
- **Description**: Checks if a string is empty (has length of 0)
- **Target**: `(str: string) => Result<ValidationError, EmptyString>`

### isNotEmpty

- **Current**: `(str: string) => boolean`
- **Returns**: Boolean
- **Description**: Checks if a string is not empty (has at least one character)
- **Target**: `(str: string) => Result<ValidationError, NonEmptyString>`

### test (or `testAgainstPattern`?)

- **Current**: `(pattern: RegExp) => (str: string) => boolean`
- **Returns**: Boolean
- **Description**: [INFERRED] Tests if a string matches a regular expression pattern
- **Target**: `(pattern: RegExp) => (str: string) => Result<ValidationError, string>`

### match (or `matchPattern`)

- **Current**: `(pattern: string | RegExp) => (str: string) => Array<string>`
- **Returns**: Array of matched strings (empty array if no matches)
- **Description**: [INFERRED] Returns all matches of a pattern in a string
- **Target**: `(pattern: string | RegExp) => (str: string) => Result<ValidationError, ReadonlyArray<string>>`

### countMatches

- **Current**: `(pattern: string | RegExp | null | undefined) => (str: string | null | undefined) => number`
- **Returns**: Number of matches found (0 for invalid inputs)
- **Description**: [INFERRED] Counts non-overlapping occurrences of a pattern in a string
- **Target**: `(pattern: string | RegExp) => (str: string) => Result<ValidationError, number>`

### indexOf

- **Current**: `(substring: string | null | undefined) => (fromIndex?: number) => (str: string | null | undefined) => number`
- **Returns**: Index of first occurrence (-1 if not found or invalid input)
- **Description**: [INFERRED] Finds the index of the first occurrence of a substring, starting from an optional index
- **Target**: `(substring: string) => (fromIndex: number) => (str: string) => Result<ValidationError, number>`

### lastIndexOf

- **Current**: `(substring: string | null | undefined) => (fromIndex?: number) => (str: string | null | undefined) => number`
- **Returns**: Index of last occurrence (-1 if not found or invalid input)
- **Description**: [INFERRED] Finds the index of the last occurrence of a substring, searching backwards from an optional index
- **Target**: `(substring: string) => (fromIndex: number) => (str: string) => Result<ValidationError, number>`

### length

- **Current**: `(str: string) => number`
- **Returns**: Length of string
- **Description**: Returns the length of a string
- **Target**: `(str: string) => Result<ValidationError, PositiveInteger>`

### charAt (should be `characterAt`)

- **Current**: `(index: number) => (str: string) => string | null`
- **Returns**: Character at index or null
- **Description**: Returns the character at the given index in a string
- **Target**: `(index: number) => (str: string) => Result<ValidationError, string>`

### charCodeAt (should be `characterCodeAt`)

- **Current**: `(index: number) => (str: string) => number | null`
- **Returns**: Unicode code point or null
- **Description**: Returns the Unicode code point at the given index in a string
- **Target**: `(index: number) => (str: string) => Result<ValidationError, number>`

### levenshtein

- **Current**: `(str1: string | null | undefined) => (str2: string | null | undefined) => number`
- **Returns**: Levenshtein edit distance (Infinity for invalid inputs)
- **Description**: [INFERRED] Calculates the Levenshtein edit distance between two strings using dynamic programming
- **Target**: `(str1: string) => (str2: string) => Result<ValidationError, NonNegativeInteger>`

### similarity

- **Current**: `(str1: string | null | undefined) => (str2: string | null | undefined) => number`
- **Returns**: Similarity percentage (0-100)
- **Description**: [INFERRED] Calculates string similarity as percentage based on Levenshtein distance
- **Target**: `(str1: string) => (str2: string) => Result<ValidationError, Percentage>`

### normalizeForComparison

- **Current**: `(text: string) => string`
- **Returns**: Normalized string
- **Description**: [INFERRED] Normalizes text for comparison by removing diacritics, converting to lowercase, and cleaning whitespace
- **Target**: `(text: string) => Result<ValidationError, NormalizedString>`

---

## Migration Notes

String testing functions will be converted to Result-returning validators that provide detailed error information on failure. The monadic versions will:

1. Return `ok(value)` when the test succeeds (with the validated string or relevant data)
2. Return `error(ValidationError)` when the test fails, with descriptive error messages
3. Maintain currying for all multi-parameter functions
4. Replace null/undefined handling with proper error types
5. Use branded types for specialized string types (EmptyString, NonEmptyString, NormalizedString, etc.)
6. Replace `-1` sentinel values with proper Result types
7. Replace `null` return values with error Results

## Special Considerations

### Null/Undefined Handling

- **contains**, **includes**, **indexOf**, **lastIndexOf**, **countMatches**, **levenshtein**, **similarity**: Currently accept null/undefined and return safe defaults
- Monadic versions should require valid strings and return ValidationError for invalid inputs

### Return Value Semantics

- **indexOf**, **lastIndexOf**: Currently return -1 for "not found" - monadic version should use Result type
- **match**: Returns empty array for no matches - monadic version should return ok([]) vs error
- **countMatches**: Returns 0 for invalid inputs - should distinguish between "no matches" (ok(0)) and "invalid input" (error)
- **charAt**, **charCodeAt**: Return null for out-of-bounds - should return proper error Result
- **levenshtein**: Returns Infinity for invalid inputs - should return ValidationError

### Arrow Function Refactoring

- **contains**, **includes**, **startsWith**, **endsWith**, **test**, **match**, **indexOf**, **lastIndexOf**, **countMatches**, **levenshtein**, **similarity**, **normalizeForComparison**: All use arrow syntax and need conversion to named functions

### Type Constraints

- **isEmpty** should validate and return branded type `EmptyString`
- **isNotEmpty** should validate and return branded type `NonEmptyString`
- **normalizeForComparison** should return branded type `NormalizedString`
- **length** should return `PositiveInteger` or `NonNegativeInteger`
- **similarity** should return `Percentage` (0-100 range)
- **levenshtein** should return `NonNegativeInteger`

### Pattern Matching

- **match** converts string patterns to RegExp with global flag
- **countMatches** adds global flag if not present for RegExp patterns
- **test** uses RegExp.test for boolean matching

### Special Cases

- **countMatches** with empty string returns `str.length + 1` (matches at every position including end)
- **lastIndexOf** treats `Infinity` as "search from end"
- **levenshtein** uses space-optimized dynamic programming (two rows instead of full matrix)
- **similarity** rounds to 2 decimal places
- **normalizeForComparison** handles multiple Unicode ranges and preserves certain non-Latin characters

### Dependencies

- **isEmpty**, **isNotEmpty**, **charAt**, **charCodeAt** depend on other string/validation functions
- **similarity** depends on **levenshtein**
- **includes** is an alias to **contains**
- All functions using isNullish need refactoring to remove that dependency

---

## Function Categories

### Substring Search

- contains, includes, indexOf, lastIndexOf

### Boundary Testing

- startsWith, endsWith

### Emptiness Testing

- isEmpty, isNotEmpty

### Pattern Matching

- test, match, countMatches

### Character Access

- charAt, charCodeAt, length

### Distance/Similarity

- levenshtein, similarity, normalizeForComparison
