# String - String Manipulation Functions

**Location**: `src/string/`
**Functions**: 24
**Status**: Cataloged
**Created**: 2025-10-07

---

## Function List

### replace

- **Current**: `(searchValue: string | RegExp) => (replaceValue: string | ReplacerFunction) => (str: string) => string`
- **Returns**: String with first match replaced
- **Description**: [INFERRED] Replaces the first occurrence of a pattern in a string with a replacement value
- **Target**: `(searchValue: string | RegExp) => (replaceValue: string | ReplacerFunction) => (str: string) => Result<StringError, string>`

### replaceAll

- **Current**: `(searchValue: string | RegExp) => (replaceValue: string | ReplacerFunction) => (str: string) => string`
- **Returns**: String with all matches replaced
- **Description**: [INFERRED] Replaces all occurrences of a pattern in a string with a replacement value
- **Target**: `(searchValue: string | RegExp) => (replaceValue: string | ReplacerFunction) => (str: string) => Result<StringError, string>`

### trim (for consistency with padBoth, shouldn't this be `trimBoth`?)

- **Current**: `(str: string) => string`
- **Returns**: String with leading and trailing whitespace removed
- **Description**: [INFERRED] Removes whitespace from both ends of a string
- **Target**: `(str: string) => Result<StringError, string>`

### trimStart

- **Current**: `(str: string) => string`
- **Returns**: String with leading whitespace removed
- **Description**: [INFERRED] Removes whitespace from the start of a string
- **Target**: `(str: string) => Result<StringError, string>`

### trimEnd

- **Current**: `(str: string) => string`
- **Returns**: String with trailing whitespace removed
- **Description**: [INFERRED] Removes whitespace from the end of a string
- **Target**: `(str: string) => Result<StringError, string>`

### padStart

- **Current**: `(chars: string) => (count: number) => (str: string) => string`
- **Returns**: String padded at the start with specified characters
- **Description**: [INFERRED] Pads the start of a string with a pattern repeated a specified number of times
- **Target**: `(chars: string) => (count: number) => (str: string) => Result<StringError, string>`

### padEnd

- **Current**: `(chars: string) => (count: number) => (str: string) => string`
- **Returns**: String padded at the end with specified characters
- **Description**: [INFERRED] Pads the end of a string with a pattern repeated a specified number of times
- **Target**: `(chars: string) => (count: number) => (str: string) => Result<StringError, string>`

### padBoth

- **Current**: `(chars: string) => (count: number) => (str: string) => string`
- **Returns**: String padded at both ends with specified characters
- **Description**: [INFERRED] Pads both the start and end of a string with a pattern repeated a specified number of times
- **Target**: `(chars: string) => (count: number) => (str: string) => Result<StringError, string>`

### slice

- **Current**: `(start: number) => (end: number = Infinity) => (str: string | null | undefined) => string`
- **Returns**: Extracted substring using slice semantics (negative indices supported)
- **Description**: [INFERRED] Extracts a section of a string and returns it as a new string, using slice semantics
- **Target**: `(start: number) => (end: number = Infinity) => (str: string | null | undefined) => Result<StringError, string>`

### substring

- **Current**: `(start: number) => (end: number = Infinity) => (str: string | null | undefined) => string`
- **Returns**: Extracted substring using substring semantics (negative indices converted to 0)
- **Description**: [INFERRED] Extracts characters from a string between two indices, using substring semantics
- **Target**: `(start: number) => (end: number = Infinity) => (str: string | null | undefined) => Result<StringError, string>`

### splice

- **Current**: `(start: number) => (deleteCount: number) => (replacement: string = "") => (str: string | null | undefined) => string`
- **Returns**: String with characters removed and optionally replaced
- **Description**: [INFERRED] Removes characters from a string and optionally inserts replacement text at the same position
- **Target**: `(start: number) => (deleteCount: number) => (replacement: string = "") => (str: string | null | undefined) => Result<StringError, string>`

### remove (shouldn't this be `removeAll`?)

- **Current**: `(substring: string | null | undefined) => (str: string | null | undefined) => string`
- **Returns**: String with all occurrences of substring removed
- **Description**: [INFERRED] Removes all occurrences of a substring from a string
- **Target**: `(substring: string | null | undefined) => (str: string | null | undefined) => Result<StringError, string>`

### removePrefix

- **Current**: `(prefix: string | null | undefined) => (str: string | null | undefined) => string`
- **Returns**: String with prefix removed if present
- **Description**: [INFERRED] Removes a prefix from a string if the string starts with that prefix
- **Target**: `(prefix: string | null | undefined) => (str: string | null | undefined) => Result<StringError, string>`

### removeSuffix

- **Current**: `(suffix: string | null | undefined) => (str: string | null | undefined) => string`
- **Returns**: String with suffix removed if present
- **Description**: [INFERRED] Removes a suffix from a string if the string ends with that suffix
- **Target**: `(suffix: string | null | undefined) => (str: string | null | undefined) => Result<StringError, string>`

### reverse

- **Current**: `(str: string | null | undefined) => string`
- **Returns**: String with characters in reverse order
- **Description**: [INFERRED] Reverses the order of characters in a string, handling Unicode grapheme clusters properly
- **Target**: `(str: string | null | undefined) => Result<StringError, string>`

### repeat

- **Current**: `(str: string) => (count: number) => string`
- **Returns**: String repeated the specified number of times
- **Description**: [INFERRED] Repeats a string a specified number of times
- **Target**: `(str: string) => (count: number) => Result<StringError, string>`

### truncate (again, should be `truncateToLength` to avoid confusion with truncating floats)

- **Current**: `(maxLength: number) => (suffix: string = "...") => (str: string | null | undefined) => string`
- **Returns**: String truncated to maximum length with optional suffix
- **Description**: [INFERRED] Truncates a string to a maximum length, adding a suffix if truncated
- **Target**: `(maxLength: number) => (suffix: string = "...") => (str: string | null | undefined) => Result<StringError, string>`

### truncateMiddle

- **Current**: `(maxLength: number) => (separator: string = "...") => (str: string | null | undefined) => string`
- **Returns**: String truncated in the middle with separator, preserving start and end
- **Description**: [INFERRED] Truncates a string in the middle to a maximum length, preserving characters from both start and end
- **Target**: `(maxLength: number) => (separator: string = "...") => (str: string | null | undefined) => Result<StringError, string>`

### chomp

- **Current**: `(str: string | null | undefined) => string`
- **Returns**: String with trailing line endings removed
- **Description**: [INFERRED] Removes all trailing line ending characters (\\r and \\n) from a string
- **Target**: `(str: string | null | undefined) => Result<StringError, string>`

### indent

- **Current**: `(indentStr: string | null | undefined) => (str: string | null | undefined) => string`
- **Returns**: String with each line indented
- **Description**: [INFERRED] Adds an indentation string to the beginning of each line in a multi-line string
- **Target**: `(indentStr: string | null | undefined) => (str: string | null | undefined) => Result<StringError, string>`

### escape

- **Current**: `(str: string | null | undefined) => string`
- **Returns**: String with HTML special characters escaped
- **Description**: [INFERRED] Escapes HTML special characters (&, <, >, ", ') to their HTML entity equivalents
- **Target**: `(str: string | null | undefined) => Result<StringError, string>`

### unescape

- **Current**: `(str: string | null | undefined) => string`
- **Returns**: String with HTML entities unescaped
- **Description**: [INFERRED] Converts HTML entities (&amp;, &lt;, &gt;, &quot;, &#39;) back to their character equivalents
- **Target**: `(str: string | null | undefined) => Result<StringError, string>`

### normalize

- **Current**: `(form: "NFC" | "NFD" | "NFKC" | "NFKD" | null | undefined = "NFC") => (str: string | null | undefined) => string`
- **Returns**: Unicode-normalized string
- **Description**: [INFERRED] Normalizes a string using Unicode normalization forms (NFC, NFD, NFKC, NFKD)
- **Target**: `(form: "NFC" | "NFD" | "NFKC" | "NFKD" | null | undefined = "NFC") => (str: string | null | undefined) => Result<StringError, string>`

### deburr

- **Current**: `(str: string | null | undefined) => string`
- **Returns**: String with diacritical marks removed
- **Description**: [INFERRED] Removes combining diacritical marks and converts special Latin characters to base forms
- **Target**: `(str: string | null | undefined) => Result<StringError, string>`

### swapCase

- **Current**: `(str: string | null | undefined) => string`
- **Returns**: String with uppercase characters converted to lowercase and vice versa
- **Description**: [INFERRED] Swaps the case of all alphabetic characters in a string
- **Target**: `(str: string | null | undefined) => Result<StringError, string>`

### toCase

- **Current**: `(caseType: CaseType) => CaseConverter`
- **Returns**: Function that converts strings to specified case style
- **Description**: [INFERRED] Returns a case converter function for the specified case type (camel, kebab, snake, pascal, etc.)
- **Target**: `(caseType: CaseType) => (str: string) => Result<StringError, string>`

### stripIndent

- **Current**: `(str: string | null | undefined) => string`
- **Returns**: String with common leading indentation removed from all lines
- **Description**: [INFERRED] Removes the minimum common indentation from all non-empty lines in a multi-line string
- **Target**: `(str: string | null | undefined) => Result<StringError, string>`

### quote

- **Current**: `(quoteChar: string | null | undefined = '"') => (str: string | null | undefined) => string`
- **Returns**: String wrapped in quote characters
- **Description**: [INFERRED] Wraps a string in quote characters, supporting paired delimiters like brackets and parentheses
- **Target**: `(quoteChar: string | null | undefined = '"') => (str: string | null | undefined) => Result<StringError, string>`

### unquote

- **Current**: `(str: string | null | undefined) => string`
- **Returns**: String with matching quote characters removed from start and end
- **Description**: [INFERRED] Removes matching quote characters from the beginning and end of a string
- **Target**: `(str: string | null | undefined) => Result<StringError, string>`

### wrap

- **Current**: `(width: number) => (str: string | null | undefined) => string`
- **Returns**: String with lines wrapped to specified width
- **Description**: [INFERRED] Wraps text to a specified width, breaking at word boundaries when possible
- **Target**: `(width: number) => (str: string | null | undefined) => Result<StringError, string>`

---

## Migration Notes

String manipulation functions will be converted to Result-returning functions that provide error information on failure. The monadic versions will:

1. Return `ok(transformedString)` when manipulation succeeds with the transformed string value
2. Return `error(StringError)` when manipulation fails, with descriptive error messages indicating:
   - Invalid input types or null/undefined values
   - Out-of-bounds indices or invalid parameters
   - Encoding/decoding errors
   - Pattern matching failures
3. Maintain currying for all multi-parameter functions
4. Preserve all transformation logic while adding comprehensive error reporting

## Special Considerations

### Null/Undefined Handling

Most functions accept `string | null | undefined` and return empty string on invalid input. Monadic versions should:

- Return `error(StringError)` for null/undefined inputs instead of silently returning ""
- Provide clear error messages about the nature of the invalid input
- **Functions affected**: slice, substring, splice, remove, removePrefix, removeSuffix, reverse, truncate, truncateMiddle, chomp, indent, escape, unescape, normalize, deburr, swapCase, stripIndent, quote, unquote, wrap

### Unicode and Grapheme Cluster Handling

- **reverse** - Uses Intl.Segmenter for proper grapheme cluster handling, falls back to spread operator
- **deburr** - Uses Unicode normalization (NFD) to separate diacritical marks
- **normalize** - Provides access to Unicode normalization forms
- **swapCase** - Handles extended Latin character ranges

### Complex Pattern Matching

- **replace** - Supports both string and RegExp search with string or function replacer
- **replaceAll** - Ensures RegExp has global flag, supports function replacers
- **remove** - Uses split/join for efficient removal of all occurrences

### Array-Like Semantics

- **slice** - Mirrors Array.slice behavior, supports negative indices and Infinity
- **substring** - Mirrors String.substring behavior, converts negatives to 0, swaps if start > end
- **splice** - Mirrors Array.splice behavior for strings, supports negative indices

### Padding Functions

- **padStart**, **padEnd**, **padBoth** - All use the `repeat` function internally
- Negative counts are clamped to 0 via `Math.max(0, count)`

### Truncation Functions

- **truncate** - Truncates from the end, adding suffix
- **truncateMiddle** - Preserves start and end, adds separator in middle
- Both handle edge cases where maxLength is less than suffix/separator length

### Line-Oriented Functions

- **chomp** - Removes trailing line endings (handles \\n, \\r\\n, \\r)
- **indent** - Preserves line ending types while adding indentation
- **stripIndent** - Calculates and removes common leading indentation
- **wrap** - Handles multi-line text, preserving paragraph structure

### Quote Functions

- **quote** - Supports paired delimiters ((), [], {}, <>, «», 「」, "", <!---->，{{}})
- **unquote** - Only removes matching quotes from start and end
- Quote handling respects multi-character quote pairs

### Case Conversion

- **toCase** - Factory function that returns appropriate case converter
- Supported cases: camel, kebab, lower, pascal, sentence, snake, SNAKE (screaming), title, train, upper
- **swapCase** - Toggles case without changing structure

### HTML Escaping

- **escape** - Escapes: & < > " '
- **unescape** - Unescapes: &amp; &lt; &gt; &quot; &#39;
- Both use lookup maps for efficiency

### Special Character Handling

- **deburr** - Handles special characters that don't decompose (ø, æ, œ, ð, þ, ß, ł, đ, ı)
- Uses both Unicode normalization and explicit replacement

### Text Wrapping

- **wrap** - Breaks at word boundaries when possible
- Handles words longer than width by force-breaking them
- Preserves paragraph structure (empty lines)

---

## Pattern Summary

String manipulation functions follow these patterns:

1. **Nullary curried**: `(str) => string` - simple transformations (trim, trimStart, trimEnd, reverse, chomp, escape, unescape, deburr, swapCase, stripIndent, unquote)
2. **Unary curried**: `(param) => (str) => string` - single parameter transformations (repeat, indent, quote)
3. **Binary curried**: `(param1) => (param2) => (str) => string` - two parameter transformations (padStart, padEnd, padBoth, slice, substring, truncate, truncateMiddle, wrap, remove, removePrefix, removeSuffix, normalize)
4. **Ternary curried**: `(param1) => (param2) => (param3) => (str) => string` - three parameter transformations (splice, replace, replaceAll)
5. **Factory**: `(caseType) => CaseConverter` - returns a converter function (toCase)

All will convert to Result-returning functions:

- Nullary: `(str) => Result<StringError, string>`
- Unary: `(param) => (str) => Result<StringError, string>`
- Binary: `(param1) => (param2) => (str) => Result<StringError, string>`
- Ternary: `(param1) => (param2) => (param3) => (str) => Result<StringError, string>`
- Factory: `(caseType) => (str) => Result<StringError, string>`
