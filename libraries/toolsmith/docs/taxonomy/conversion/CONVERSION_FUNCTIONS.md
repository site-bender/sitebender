# Conversion Functions

**Location**: `src/conversion/`
**Functions**: 14 (10 exported + 4 internal helpers)
**Status**: Cataloged
**Created**: 2025-10-07

---

## Function List

### castValue

- **Current**: `<T extends CastType>(type: T) => (value: unknown) => CastResult<T>`
- **Returns**: Curried function returning type-specific cast result
- **Description**: [INFERRED] Type-safe value casting dispatcher that delegates to specific type converters (toBoolean, toFloat, toInteger, toString) based on the requested cast type
- **Target**: `<T extends CastType>(type: T) => (value: unknown) => Result<ConversionError, CastResult<T>>`
- **Notes**: Uses exhaustive type checking with never type; currently throws Error (violates no-exceptions rule)

### fromJson

- **Current**: `(json: unknown) => unknown`
- **Returns**: Parsed JSON value or null
- **Description**: [INFERRED] Safely parses a JSON string into a JavaScript value; returns null for invalid JSON or non-string input
- **Target**: `(json: unknown) => Result<ConversionError, unknown>`
- **Notes**: Uses try/catch (violates no-exceptions rule); returns null for failures

### jsonStringify

- **Current**: `(indent: number) => (value: Value) => string`
- **Returns**: Curried function returning JSON string
- **Description**: Curried wrapper for JSON.stringify with validated indentation (0-12 spaces)
- **Target**: `(indent: number) => (value: Value) => Result<ConversionError, string>`
- **Notes**: Validates indent is integer between 0 and 12; defaults to 0 if invalid

### safeParse

- **Current**: `<T>(parser: (value?: Value) => T) => (value?: Value) => T | null`
- **Returns**: Curried function returning parsed value or null
- **Description**: [INFERRED] Higher-order function that wraps any parser function to safely handle parsing errors, returning null on failure or undefined results
- **Target**: `<T>(parser: (value?: Value) => Result<ConversionError, T>) => (value?: Value) => Result<ConversionError, T>`
- **Notes**: Uses try/catch (violates no-exceptions rule); generic parser wrapper

### safeParseFloat

- **Current**: `(value: unknown) => number | null`
- **Returns**: Parsed floating-point number or null
- **Description**: [INFERRED] Safely converts various types to floating-point numbers with comprehensive type handling (null/undefined → null, boolean → 1/0, number → validated, string → parsed and trimmed)
- **Target**: `(value: unknown) => Result<ConversionError, number>`
- **Notes**: Returns null for NaN, empty strings, and invalid types; trims whitespace from strings

### safeParseInt

- **Current**: `(radix: number = 10) => (value: unknown) => number | null`
- **Returns**: Curried function returning parsed integer or null
- **Description**: [INFERRED] Safely converts various types to integers with configurable radix (2-36); performs strict validation including decimal point rejection for radix 10 and round-trip verification
- **Target**: `(radix: number = 10) => (value: unknown) => Result<ConversionError, number>`
- **Notes**: Validates radix 2-36; rejects strings with decimals in radix 10; uses round-trip verification; uses regex (violates FP purity)

### stringify (we need clarity on the difference between this and `jsonStringify`)

- **Current**: `(value: Value) => string`
- **Returns**: String representation
- **Description**: Converts a value to a string similar to JSON.stringify; handles arrays as semicolon-delimited lists, objects as sorted key:value pairs, and primitives via toString
- **Target**: `(value: Value) => Result<ConversionError, string>`
- **Notes**: Sorts object keys alphabetically; uses semicolon as delimiter; recursive for nested structures

### toJson

- **Current**: `(indent: number = 0) => (value?: Serializable) => string | null`
- **Returns**: Curried function returning JSON string or null
- **Description**: [INFERRED] Converts serializable values to JSON strings with optional pretty-printing indentation; returns null for non-serializable values or circular references
- **Target**: `(indent: number = 0) => (value?: Serializable) => Result<ConversionError, string>`
- **Notes**: Uses try/catch (violates no-exceptions rule); validates serializability first; indent 0 means no formatting

### toPercent

- **Current**: `(options?: { decimals?: number, includeSign?: boolean }) => (value: number) => string`
- **Returns**: Curried function returning percentage string
- **Description**: [INFERRED] Converts a decimal number to percentage format (multiplies by 100) with configurable decimal places and optional percent sign; handles special numeric values (NaN, Infinity)
- **Target**: `(options?: { decimals?: number, includeSign?: boolean }) => (value: number) => Result<ConversionError, string>`
- **Notes**: Default decimals = 2, includeSign = true; handles NaN, Infinity, -Infinity specially

---

## Internal Helper Functions

These functions are used internally by castValue and are located in `src/conversion/castValue/`:

### toBoolean

- **Current**: `(value: unknown) => boolean`
- **Returns**: Boolean
- **Description**: [INFERRED] Converts values to boolean using context-aware logic: nullish → false, strings match against true/false keywords (case-insensitive), numbers consider finiteness and non-zero, objects are truthy
- **Target**: `(value: unknown) => boolean` (pure conversion, no Result needed)
- **Notes**: Recognizes "true", "yes", "y", "1", "on" as true; "false", "no", "n", "0", "off" as false; empty strings are false

### toFloat

- **Current**: `(value: unknown) => number`
- **Returns**: Number (float)
- **Description**: [INFERRED] Converts values to floating-point numbers: null → 0, undefined → NaN, booleans → 1/0, strings parsed with special case handling for Infinity/-Infinity/NaN, single-element arrays recursively converted
- **Target**: `(value: unknown) => number` (pure conversion, no Result needed)
- **Notes**: Handles special string values "Infinity", "-Infinity", "NaN"; empty strings → 0; multi-element arrays → NaN; recursive for single-element arrays

### toInteger

- **Current**: `(value: unknown) => number`
- **Returns**: Number (integer)
- **Description**: [INFERRED] Converts values to integers: null → 0, undefined → NaN, booleans → 1/0, numbers truncated to integer, strings strictly validated as integer-only format (no decimals)
- **Target**: `(value: unknown) => number` (pure conversion, no Result needed)
- **Notes**: Uses regex for strict integer validation; rejects strings with decimal points; truncates float numbers; returns NaN for invalid types

### toString

- **Current**: `(value: unknown) => string`
- **Returns**: String
- **Description**: [INFERRED] Comprehensively converts any value to string with specialized handling: null/undefined → literal strings, primitives → String(), Dates → ISO format, RegExp/Errors → toString(), Map/Set → JSON with type metadata, objects → JSON.stringify with circular reference detection
- **Target**: `(value: unknown) => string` (pure conversion, no Result needed)
- **Notes**: Special handling for -0 → "0"; circular reference detection for objects; uses WeakSet for tracking seen objects; fallback to Object.prototype.toString

---

## Migration Notes

Conversion functions will be migrated to return Result monads for operations that can fail (parsing, validation, casting). The monadic versions will:

1. Return `ok(value)` when conversion succeeds
2. Return `error(ConversionError)` when conversion fails, with detailed error context
3. Maintain currying for functions like `jsonStringify`, `safeParse`, `safeParseInt`, `toJson`, `toPercent`
4. Preserve type safety while adding error context
5. Remove try/catch blocks in favor of Result-based error handling

Internal helper functions (toBoolean, toFloat, toInteger, toString) may remain as pure converters that always return a value (using sensible defaults like NaN, 0, false, or empty string) since they are used as foundational primitives.

---

## Special Considerations

### Exception Handling Violations

Multiple functions violate the no-exceptions constitutional rule:

- **castValue**: Throws Error for unknown cast types (uses exhaustive type checking)
- **fromJson**: Uses try/catch for JSON.parse errors
- **safeParse**: Uses try/catch to wrap arbitrary parsers
- **toJson**: Uses try/catch for circular reference detection
- **toString**: Uses try/catch for JSON.stringify errors in Map/Set handling

All of these must be refactored to use Result monads.

### Type Safety

- **castValue**: Uses discriminated union CastType and mapped CastResult type for type-safe casting
- **safeParse**: Generic higher-order function that preserves parser return types
- **toJson**: Uses Serializable type constraint to prevent non-serializable values at type level

### Null Return Semantics

Many functions use null to indicate failure:

- **fromJson**: Returns null for non-string input or parse errors
- **safeParse**: Returns null for parser errors or undefined results
- **safeParseFloat**: Returns null for NaN results, empty strings, invalid types
- **safeParseInt**: Returns null for invalid radix, non-numeric strings, invalid types
- **toJson**: Returns null for non-serializable values or circular references

These null-returning patterns should be replaced with Result monads.

### Currying

Functions with configuration parameters use proper currying:

- **jsonStringify**: Takes indent first, then value
- **safeParse**: Takes parser function first, then value
- **safeParseInt**: Takes radix first (default 10), then value
- **toJson**: Takes indent first (default 0), then value
- **toPercent**: Takes options first (with defaults), then value

All currying should be preserved in monadic versions.

### Validation and Sanitization

- **jsonStringify**: Validates indent is integer between 0-12 using allPass
- **safeParseInt**: Validates radix is integer between 2-36; rejects decimal strings in radix 10; performs round-trip verification
- **safeParseFloat**: Trims whitespace from strings; explicitly handles special numeric string values
- **toBoolean**: Normalizes strings to lowercase and trims before comparison

### Special Value Handling

- **toPercent**: Explicitly handles NaN, Infinity, -Infinity
- **toFloat**: Recognizes "Infinity", "-Infinity", "NaN" string literals
- **toString**: Special handling for -0 to return "0" (using Object.is comparison)
- **safeParseFloat**: Returns null for NaN; converts booleans to 1/0

### Complex Type Conversions

- **toString**: Comprehensive type handling with specialized logic for Date (ISO string), RegExp (toString), Error (name + message), Map/Set (JSON with metadata), objects (JSON.stringify with circular detection)
- **toFloat**: Handles single-element arrays recursively
- **stringify**: Custom format using semicolon delimiters and sorted key:value pairs for objects

### Regex Usage

- **safeParseInt**: Uses `/^[+-]?\d+$/` for integer validation and `/^[+-]?0*\d+$/` for leading zero validation (violates FP purity)
- **toInteger**: Uses `/^[+-]?\d+$/` for strict integer format validation (violates FP purity)

These regex patterns should be refactored to use functional validation combinators.

### Dependencies

Conversion functions have extensive dependencies on validation, string, array, and logic functions:

- **castValue**: Depends on toBoolean, toFloat, toInteger, toString
- **fromJson**: Depends on isNonEmptyString
- **jsonStringify**: Depends on allPass, gte, lte, isInteger
- **safeParse**: Depends on isUndefined
- **safeParseFloat**: Depends on isEmpty, trim, isBoolean, isNaN, isNullish, isNumber, isString, toFloat
- **safeParseInt**: Depends on not, truncate, contains, slice, startsWith, trim, validation functions (allPass, anyPass, gt, lt, isBoolean, isEqual, isFinite, isInteger, isNaN, isNullish, isNumber, isString), toString
- **stringify**: Depends on isEmpty, join, map, sort, toString, entries, isArray, isNullish, isObject
- **toJson**: Depends on isSerializable
- **toPercent**: Depends on isNaN, isNegativeInfinity, isPositiveInfinity
- **toBoolean**: Depends on includes, pipe, and, toLower, trim, isBoolean, isFinite, isNonEmptyString, isNonZero, isNullish, isNumber, isString
- **toFloat**: Depends on length, isEmpty, trim, isArray, isBoolean, isEqual, isNull, isNumber, isString, isUndefined
- **toInteger**: Depends on not, truncate, isEmpty, trim, isBoolean, isFinite, isNull, isNumber, isString, isUndefined
- **toString**: Depends on is, isBigInt, isBoolean, isDate, isError, isFunction, isMap, isNull, isNumber, isObject, isRegExp, isSet, isString, isSymbol, isUndefined, jsonReplacer

---

## Function Categories

### JSON Operations (3)

- **fromJson**: Parse JSON string to value
- **jsonStringify**: Stringify value to JSON with formatting
- **toJson**: Convert serializable value to JSON string

### Safe Parsing (3)

- **safeParse**: Generic parser wrapper
- **safeParseFloat**: Parse to floating-point number
- **safeParseInt**: Parse to integer with radix

### Type Casting (5)

- **castValue**: Dispatcher for type casting
- **toBoolean**: Convert to boolean
- **toFloat**: Convert to float
- **toInteger**: Convert to integer
- **toString**: Convert to string

### Formatting (2)

- **stringify**: Custom string representation
- **toPercent**: Format number as percentage

### Value Conversion (1)

- **castValue**: Type-safe value casting (uses helpers)

---

## Implementation Priority

For monadic migration, suggested order:

1. **Phase 1 - Pure Converters** (no Result needed):
   - toBoolean, toFloat, toInteger, toString (keep as pure converters)

2. **Phase 2 - Simple Parsing**:
   - safeParseFloat, safeParseInt (straightforward Result conversion)

3. **Phase 3 - JSON Operations**:
   - fromJson, toJson (remove try/catch, use Result)
   - jsonStringify (add Result for validation failures)

4. **Phase 4 - Complex Functions**:
   - safeParse (generic higher-order Result wrapper)
   - castValue (remove throw, use Result)

5. **Phase 5 - Formatting**:
   - stringify (already mostly pure, add Result for completeness)
   - toPercent (already pure, add Result for invalid inputs)

---

## Notes

- All conversion functions are located in `/src/conversion/`
- Internal helpers (toBoolean, toFloat, toInteger, toString) are in `/src/conversion/castValue/`
- Most functions have `[REFACTOR]` comments indicating need for description updates
- Several functions violate constitutional rules (exceptions, regex) and need refactoring
- Consistent pattern of returning null for failures should be replaced with Result monads
- Currying pattern is well-established and should be preserved
- Strong type safety through branded types and discriminated unions
