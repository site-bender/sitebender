# String - Utility Functions

**Location**: `src/string/`
**Functions**: 16
**Status**: Cataloged
**Created**: 2025-10-07

---

## Function List

### split

- **Current**: `(separator: string | RegExp) => (str: string) => Array<string>`
- **Returns**: Array of string segments
- **Description**: [INFERRED] Splits a string into an array of substrings using the specified separator (string or RegExp)
- **Target**: `(separator: string | RegExp) => (str: string) => Result<ValidationError, Array<string>>`

### concat

- **Current**: `(first: string) => (second: string) => string`
- **Returns**: Concatenated string
- **Description**: [INFERRED] Concatenates the first string with the second string
- **Target**: `(first: string) => (second: string) => Result<ValidationError, string>`

### concatTo (do we need this or is `flip(concat)` sufficient?)

- **Current**: `(toAppend: string) => (baseString: string) => string`
- **Returns**: Concatenated string
- **Description**: [INFERRED] Appends a string to a base string (reversed parameter order from concat)
- **Target**: `(toAppend: string) => (baseString: string) => Result<ValidationError, string>`

### repeat

- **Current**: `(str: string) => (count: number) => string`
- **Returns**: Repeated string or empty string
- **Description**: [INFERRED] Repeats a string a specified number of times. Returns empty string if count <= 0
- **Target**: `(str: string) => (count: number) => Result<ValidationError, string>`

### reverse

- **Current**: `(str: string | null | undefined) => string`
- **Returns**: Reversed string or empty string
- **Description**: [INFERRED] Reverses a string using Intl.Segmenter for proper grapheme cluster handling, with fallback to spread operator for basic Unicode handling
- **Target**: `(str: string) => Result<ValidationError, string>`

### length

- **Current**: `(str: string) => number`
- **Returns**: String length as number
- **Description**: Returns the length of a string
- **Target**: `(str: string) => Result<ValidationError, number>`

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

### lines

- **Current**: `(str: string | null | undefined) => Array<string>`
- **Returns**: Array of lines
- **Description**: [INFERRED] Splits string on all common line endings (\r\n, \n, \r). Returns empty array for nullish values
- **Target**: `(str: string) => Result<ValidationError, Array<string>>`

### words

- **Current**: `(str: string | null | undefined) => Array<string>`
- **Returns**: Array of words
- **Description**: [INFERRED] Splits string into words, handling camelCase, PascalCase, snake_case, kebab-case, numbers, and acronyms intelligently
- **Target**: `(str: string) => Result<ValidationError, Array<string>>`

### chars (should be `characters`)

- **Current**: `(str: string | null | undefined) => Array<string>`
- **Returns**: Array of characters (grapheme clusters)
- **Description**: [INFERRED] Converts string to array of characters using Intl.Segmenter for proper grapheme cluster handling, with spread operator fallback
- **Target**: `(str: string) => Result<ValidationError, Array<string>>`

### slice

- **Current**: `(start: number) => (end: number = Infinity) => (str: string | null | undefined) => string`
- **Returns**: Sliced substring or empty string
- **Description**: [INFERRED] Extracts a section of a string using native slice, supporting Infinity as end value
- **Target**: `(start: number) => (end: number) => (str: string) => Result<ValidationError, string>`

### substring

- **Current**: `(start: number) => (end: number = Infinity) => (str: string | null | undefined) => string`
- **Returns**: Substring or empty string
- **Description**: [INFERRED] Extracts substring using native substring method. Converts negative values to 0 and handles Infinity
- **Target**: `(start: number) => (end: number) => (str: string) => Result<ValidationError, string>`

### substr (do we really need both this and substring?)

- **Current**: `(start: number) => (length: number = Infinity) => (str: string | null | undefined) => string`
- **Returns**: Substring or empty string
- **Description**: [INFERRED] Extracts substring starting at position for specified length. Handles negative start indices
- **Target**: `(start: number) => (length: number) => (str: string) => Result<ValidationError, string>`

### indexOf

- **Current**: `(substring: string | null | undefined) => (fromIndex: number = 0) => (str: string | null | undefined) => number`
- **Returns**: Index of substring or -1
- **Description**: [INFERRED] Returns the first index where substring is found, starting search at fromIndex. Returns -1 if not found
- **Target**: `(substring: string) => (fromIndex: number) => (str: string) => Result<ValidationError, number>`

### lastIndexOf

- **Current**: `(substring: string | null | undefined) => (fromIndex: number = Infinity) => (str: string | null | undefined) => number`
- **Returns**: Last index of substring or -1
- **Description**: [INFERRED] Returns the last index where substring is found, searching backwards from fromIndex. Returns -1 if not found
- **Target**: `(substring: string) => (fromIndex: number) => (str: string) => Result<ValidationError, number>`

### splitEvery

- **Current**: `(n: number) => (str: string) => Array<string>`
- **Returns**: Array of string chunks
- **Description**: [INFERRED] Splits string into chunks of n characters using recursion. Returns empty array if n <= 0 or string is empty
- **Target**: `(n: number) => (str: string) => Result<ValidationError, Array<string>>`

### splitAt

- **Current**: `(index: number) => (str: string) => Array<string>`
- **Returns**: Two-element array [before, after]
- **Description**: [INFERRED] Splits string at specified index into two parts. Handles negative indices
- **Target**: `(index: number) => (str: string) => Result<ValidationError, [string, string]>`

### splice

- **Current**: `(start: number) => (deleteCount: number) => (replacement: string = "") => (str: string | null | undefined) => string`
- **Returns**: Modified string or empty string
- **Description**: [INFERRED] Removes characters starting at index and replaces them with replacement string. Array-like splice for strings
- **Target**: `(start: number) => (deleteCount: number) => (replacement: string) => (str: string) => Result<ValidationError, string>`

### truncate (maybe `truncateToLength` to avoid confusion with truncating floats?)

- **Current**: `(maxLength: number) => (suffix: string = "...") => (str: string | null | undefined) => string`
- **Returns**: Truncated string or empty string
- **Description**: [INFERRED] Truncates string to maxLength, adding suffix if truncated. If maxLength <= suffix length, returns truncated suffix
- **Target**: `(maxLength: number) => (suffix: string) => (str: string) => Result<ValidationError, string>`

### indent

- **Current**: `(indentStr: string | null | undefined) => (str: string | null | undefined) => string`
- **Returns**: Indented string or empty string
- **Description**: [INFERRED] Adds indentation string to the beginning of each line, preserving line ending types
- **Target**: `(indentStr: string) => (str: string) => Result<ValidationError, string>`

### wrap

- **Current**: `(width: number) => (str: string | null | undefined) => string`
- **Returns**: Wrapped text or empty string
- **Description**: [INFERRED] Wraps text to specified width, breaking on word boundaries. Force-breaks words longer than width. Preserves paragraph breaks
- **Target**: `(width: number) => (str: string) => Result<ValidationError, string>`

---

## Migration Notes

String utility functions will be converted to Result-returning functions that provide detailed error information on failure. The monadic versions will:

1. Return `ok(value)` when operation succeeds
2. Return `error(ValidationError)` when operation fails (e.g., invalid indices, null/undefined inputs)
3. Maintain currying for all functions
4. Remove null/undefined handling from function signatures - validation will return errors instead
5. Preserve advanced Unicode handling (grapheme clusters via Intl.Segmenter)

## Special Considerations

### Arrow Function Violations

These functions use arrow syntax and need refactoring to named functions:

- **split**
- **concat**
- **concatTo**
- **repeat**
- **slice**
- **substring**
- **substr**
- **indexOf**
- **lastIndexOf**
- **splitEvery**
- **splitAt**
- **splice**
- **truncate**
- **indent**
- **wrap**

### Unicode Handling

- **reverse**, **chars** use Intl.Segmenter when available for proper grapheme cluster handling
- **length** returns UTF-16 code unit count, not grapheme count (emoji may have length > 1)

### Null Safety

Most functions currently accept `string | null | undefined` and return empty values:

- Monadic versions will require non-null strings and return errors for invalid inputs
- **charAt**, **charCodeAt** currently return `null` for invalid indices - should return errors

### Default Parameters

Several functions use default parameters that should become explicit:

- **slice**, **substring**, **substr** use `Infinity` as default
- **indexOf** uses `0` as default fromIndex
- **lastIndexOf** uses `Infinity` as default fromIndex
- **truncate** uses `"..."` as default suffix
- **splice** uses `""` as default replacement

### Edge Cases

- **repeat** returns empty string for count <= 0
- **splitEvery** returns empty array for n <= 0 or empty string
- **indexOf**, **lastIndexOf** return -1 when not found (should return Result)
- **wrap** handles words longer than width by force-breaking them
