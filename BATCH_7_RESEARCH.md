# Batch 7 Color Types Implementation Research

## Research Completion Date: 2025-11-01

This document captures all research findings for implementing Batch 7 color types (HexColor, OklchColor, P3Color) in Toolsmith.

---

## Part 1: Reference Implementations (Batch 6 String Types)

### File Structure Pattern

All Batch 6 string types follow an identical folder structure:

```
newtypes/stringTypes/[typeName]/
├── index.ts                          # Smart constructor
├── index.test.ts                     # Smart constructor tests
├── unsafe[TypeName]/
│   └── index.ts                      # Unsafe constructor (no validation)
├── unwrap[TypeName]/
│   └── index.ts                      # Extract raw value
```

**Example Paths (Batch 6 - Completed):**
- `/Users/guy/Workspace/@sitebender/toolsmith-ai/libraries/toolsmith/src/newtypes/stringTypes/nonEmptyString/index.ts`
- `/Users/guy/Workspace/@sitebender/toolsmith-ai/libraries/toolsmith/src/newtypes/stringTypes/char/index.ts`
- `/Users/guy/Workspace/@sitebender/toolsmith-ai/libraries/toolsmith/src/newtypes/stringTypes/base58/index.ts`

### Smart Constructor Pattern

**Key characteristics:**

1. **Function signature**: Takes primitive value (string for string types), returns `Result<ValidationError, BrandedType>`
2. **Error handling**: Returns `error()` monad for validation failures, `ok()` for success
3. **Validation flow**: 
   - First check: basic constraints (empty, length, format)
   - Secondary checks: character validity, format compliance
   - Return branded value via `unsafeConstructor(value)`

**Example from NonEmptyString:**
```typescript
export default function nonEmptyString(
	value: string,
): Result<ValidationError, NonEmptyString> {
	const trimmed = value.trim()

	if (trimmed.length === 0) {
		return error({
			code: "NON_EMPTY_STRING_EMPTY",
			field: "nonEmptyString",
			messages: ["The system needs a non-empty string with at least one character."],
			received: value,
			expected: "Non-empty string with at least one non-whitespace character",
			suggestion: "Provide a string with visible content like 'Hello' or 'A'",
			severity: "requirement",
		})
	}

	return ok(unsafeNonEmptyString(trimmed))
}
```

**Example from Base58 (with functional filtering):**
```typescript
const BASE58_ALPHABET = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"

export default function base58(
	value: string,
): Result<ValidationError, Base58> {
	if (value.length === 0) {
		return error({ /* ... */ })
	}

	const chars = Array.from(value)
	const invalidChars = chars.filter(function filterInvalidChars(ch) {
		return !BASE58_ALPHABET.includes(ch)
	})

	if (invalidChars.length > 0) {
		return error({
			code: "BASE58_INVALID_CHARACTERS",
			field: "base58",
			messages: ["The system needs a Base58 string with only valid alphabet characters."],
			received: value,
			expected: "Base58 characters (123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz)",
			suggestion: "Remove invalid characters like 0, O, I, l which are excluded from Base58",
			constraints: { invalidCharacters: invalidChars },
			severity: "requirement",
		})
	}

	return ok(unsafeBase58(value))
}
```

### Unsafe Constructor Pattern

**Location**: `unsafe[TypeName]/index.ts`

**Purpose**: Create branded type without validation (for internal use after validation)

**Pattern**:
```typescript
import type { NonEmptyString } from "@sitebender/toolsmith/types/branded/index.ts"

export default function unsafeNonEmptyString(value: string): NonEmptyString {
	return value as NonEmptyString
}
```

**Key points:**
- No validation
- Direct type casting with `as BrandedType`
- No tests required (just type branding)

### Unwrap Function Pattern

**Location**: `unwrap[TypeName]/index.ts`

**Purpose**: Extract raw value from branded type

**Pattern**:
```typescript
import type { NonEmptyString } from "@sitebender/toolsmith/types/branded/index.ts"

export default function unwrapNonEmptyString(nonEmptyString: NonEmptyString): string {
	return nonEmptyString
}
```

**Key points:**
- Simple extraction of underlying value
- Type-safe - only accepts branded type
- No logic required

### ValidationError Structure

**Location**: `/Users/guy/Workspace/@sitebender/toolsmith-ai/libraries/toolsmith/src/types/fp/validation/index.ts`

**Required fields for all errors:**
- `code: string` - Machine-readable error code (e.g., "HEX_COLOR_INVALID_FORMAT")
- `field: string` - Field name (e.g., "hexColor")
- `messages: Array<string>` - Human-readable messages
- `received: any` - The value that failed validation
- `expected: string` - What the system needs
- `suggestion: string` - Actionable guidance to fix the issue
- `severity: "requirement"` - Use "requirement" for validation errors

**Optional helpful fields:**
- `examples?: ReadonlyArray<any>` - Valid examples
- `constraints?: Readonly<Record<string, any>>` - Validation constraints
- `helpUrl?: string` - Documentation link

**Error philosophy**: "Help, don't scold" - explain system limitations with actionable guidance

---

## Part 2: Checklist Requirements for Batch 7

**Source**: `libraries/toolsmith/docs/NEWTYPES_IMPLEMENTATION_CHECKLIST.md` (Lines 458-491)

### HexColor Requirements

**Validation**: `#RGB` or `#RRGGBB` format (3 or 6 hex digits)

**Checklist items**:
- [ ] Type definition in `types/branded/index.ts`
- [ ] Smart constructor `hexColor()` - validates #RGB or #RRGGBB
- [ ] Unsafe constructor `unsafeHexColor()`
- [ ] Unwrap function `unwrapHexColor()`
- [ ] Type predicate `isHexColor()`
- [ ] All tests passing

**Validation specifics**:
- Must start with `#` character
- Followed by exactly 3 or 6 hexadecimal digits (0-9, a-f, A-F)
- Case-insensitive input (should normalize to lowercase)
- Examples: `#fff`, `#FFFFFF`, `#f0f0f0`, `#abc`

### OklchColor Requirements

**Validation**: `oklch()` CSS function format

**Checklist items**:
- [ ] Type definition in `types/branded/index.ts`
- [ ] Smart constructor `oklchColor()` - validates oklch() CSS format
- [ ] Unsafe constructor `unsafeOklchColor()`
- [ ] Unwrap function `unwrapOklchColor()`
- [ ] Type predicate `isOklchColor()`
- [ ] All tests passing

**Validation specifics**:
- Format: `oklch(L C H)` or `oklch(L C H / A)`
- L (lightness): 0-1 or 0%-100%
- C (chroma): 0-1 (unitless)
- H (hue): 0-360 degrees or 0-1 normalized
- A (alpha, optional): 0-1
- Examples: `oklch(0.5 0.1 120)`, `oklch(80% 0.15 240 / 0.8)`
- Whitespace variations should be normalized
- Case-insensitive function name

### P3Color Requirements

**Validation**: `color(display-p3 ...)` CSS function format

**Checklist items**:
- [ ] Type definition in `types/branded/index.ts`
- [ ] Smart constructor `p3Color()` - validates color(display-p3 ...) format
- [ ] Unsafe constructor `unsafeP3Color()`
- [ ] Unwrap function `unwrapP3Color()`
- [ ] Type predicate `isP3Color()`
- [ ] All tests passing

**Validation specifics**:
- Format: `color(display-p3 R G B)` or `color(display-p3 R G B / A)`
- R, G, B: 0-1 or 0%-100%
- A (alpha, optional): 0-1
- Examples: `color(display-p3 1 0 0)`, `color(display-p3 100% 0% 50% / 0.8)`
- Whitespace variations should be normalized
- Case-insensitive function names

---

## Part 3: Regex-Based Validation Pattern

### Reference: PhoneNumber Implementation

**Location**: `/Users/guy/Workspace/@sitebender/toolsmith-ai/libraries/toolsmith/src/predicates/isPhoneNumber/index.ts`

**Pattern for regex validation**:

```typescript
import type { PhoneNumber } from "@sitebender/toolsmith/types/branded/index.ts"

export default function isPhoneNumber(value: string): value is PhoneNumber {
	if (typeof value !== "string") {
		return false
	}

	//++ [EXCEPTION] Using regex for E.164 validation
	//++ Pattern: + followed by 1-3 digits (country code) followed by 4-14 digits (number)
	const e164Pattern = /^\+[1-9]\d{0,2}\d{4,14}$/

	return e164Pattern.test(value)
}
```

**Key points**:
- Type guard function with `value is BrandedType` signature
- Comments explain regex exceptions (marked with `[EXCEPTION]`)
- Regex pattern includes anchors (`^` and `$`) to match entire string
- Regex comment explains what pattern validates
- Simple `test()` return for boolean result
- Type checking first (`typeof value !== "string"`)

### Reference: UUID Implementation

**Location**: `/Users/guy/Workspace/@sitebender/toolsmith-ai/libraries/toolsmith/src/newtypes/stringTypes/uuid/`

**Pattern for complex validation**:

UUID uses a decomposed approach:
1. Main function (`uuid()`) calls helper
2. Helper (`_validateUuidFormat()`) performs actual validation
3. Predicate (`isUuid()`) reuses the validation helper
4. Normalization in separate helper (`_normalizeUuid()`)

**Structure**:
```
uuid/
├── index.ts                              # Smart constructor
├── _validateUuidFormat/
│   ├── index.ts                          # Helper for validation
│   ├── _checkHyphen/index.ts             # Sub-helper
│   ├── _checkSegment/index.ts            # Sub-helper
│   └── index.test.ts
├── _normalizeUuid/
│   ├── index.ts                          # Helper for normalization
│   └── index.test.ts
└── index.test.ts
```

**When to use decomposition**:
- Complex format validation (multiple checks)
- Shared validation between smart constructor and predicate
- Normalization that needs testing
- Internal private helpers (prefix with `_`)

---

## Part 4: Type Definition Template

**Location**: `libraries/toolsmith/src/types/branded/index.ts` (current line 93)

**Current Batch 6 definitions**:
```typescript
//++ Non-empty string with at least one character after trimming
export type NonEmptyString = Brand<string, "NonEmptyString">

//++ Single Unicode character (exactly one code point)
export type Char = Brand<string, "Char">

//++ Base58-encoded string using Bitcoin/IPFS alphabet (no 0OIl characters)
export type Base58 = Brand<string, "Base58">
```

**Template for Batch 7 color types**:
```typescript
//++ Hexadecimal color in #RGB or #RRGGBB format (3 or 6 hex digits)
export type HexColor = Brand<string, "HexColor">

//++ CSS Oklch color in oklch(L C H) or oklch(L C H / A) format
export type OklchColor = Brand<string, "OklchColor">

//++ CSS display-p3 color in color(display-p3 R G B) or color(display-p3 R G B / A) format
export type P3Color = Brand<string, "P3Color">
```

---

## Part 5: Testing Pattern

**Source**: `libraries/toolsmith/src/newtypes/stringTypes/base58/index.test.ts`

**Test structure**:
1. Valid cases (multiple examples)
2. Empty/edge cases
3. Invalid characters/format
4. Property-based tests (for character sets)

**Example test cases for color types**:

```typescript
Deno.test("hexColor returns Ok for valid #RGB format", function returnsOkForRgb() {
	const result = hexColor("#fff")
	assertEquals(result._tag, "Ok")
})

Deno.test("hexColor returns Ok for valid #RRGGBB format", function returnsOkForRrggbb() {
	const result = hexColor("#ffffff")
	assertEquals(result._tag, "Ok")
})

Deno.test("hexColor returns Error for empty string", function returnsErrorForEmpty() {
	const result = hexColor("")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "HEX_COLOR_EMPTY")
	}
})

Deno.test("hexColor returns Error for invalid format", function returnsErrorForInvalid() {
	const result = hexColor("rgb(255, 0, 0)")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "HEX_COLOR_INVALID_FORMAT")
	}
})
```

---

## Part 6: Predicate Pattern

**Location**: `src/predicates/is[TypeName]/index.ts`

**Structure**:
```
predicates/is[TypeName]/
├── index.ts           # Type guard function
└── index.test.ts      # Type narrowing tests (optional)
```

**Pattern for string-based predicates**:

```typescript
import type { TypeName } from "@sitebender/toolsmith/types/branded/index.ts"

//++ Type predicate that checks if a string is a valid TypeName
export default function isTypeName(value: string): value is TypeName {
	if (typeof value !== "string") {
		return false
	}

	// Validation logic here
	return true // or false
}
```

---

## Part 7: Validation Regex Patterns for Color Types

### HexColor Regex

**Pattern**: `^#[0-9a-fA-F]{3}([0-9a-fA-F]{3})?$`

**Explanation**:
- `^#` - Starts with hash
- `[0-9a-fA-F]{3}` - Exactly 3 hex digits (RGB)
- `([0-9a-fA-F]{3})?` - Optionally 3 more hex digits (GGB → full RRGGBB)
- `$` - End of string

**Normalization**: Convert to lowercase for consistency

### OklchColor Regex

**Pattern**: `^oklch\s*\(\s*([0-9.]+%?)\s+([0-9.]+)\s+([0-9.]+)\s*(?:/\s*([0-9.]+))?\s*\)$`

**Explanation**:
- `^oklch\s*\(` - Function name, optional whitespace
- `\s*([0-9.]+%?)\s+` - L value (with optional %), whitespace
- `([0-9.]+)\s+` - C value, whitespace
- `([0-9.]+)` - H value
- `(?:/\s*([0-9.]+))?` - Optional alpha value with slash
- `\s*\)$` - Closing paren

**Normalization**: Lowercase function name, normalize whitespace

### P3Color Regex

**Pattern**: `^color\s*\(\s*display-p3\s+([0-9.]+%?)\s+([0-9.]+%?)\s+([0-9.]+%?)\s*(?:/\s*([0-9.]+))?\s*\)$`

**Explanation**:
- `^color\s*\(` - Function name, optional whitespace
- `display-p3` - Colorspace specifier
- `([0-9.]+%?)\s+` - R value (with optional %)
- `([0-9.]+%?)\s+` - G value
- `([0-9.]+%?)\s*` - B value
- `(?:/\s*([0-9.]+))?` - Optional alpha with slash
- `\)$` - Closing paren

**Normalization**: Lowercase function name, normalize whitespace

---

## Part 8: Key Implementation Rules (From CLAUDE.md)

### Constitutional Rules (MANDATORY)

1. **No Classes**: Use pure functions in modules
2. **No Mutations**: All data immutable, use spread operators
3. **No Loops**: Use map/filter/reduce from Toolsmith
4. **No Exceptions**: Return `Result<ValidationError, T>` or `Validation<ValidationError, T>`
5. **One Function Per File**: One export per file (except curried inner functions)
6. **Pure Functions**: Except at IO boundaries (no side effects)
7. **Named Functions Only**: Never use arrow function syntax
8. **All Functions Curried**: Each function takes only ONE parameter

### String Type Specifics

- All string types are immutable
- Validation via regex or functional approach
- Error codes use SCREAMING_SNAKE_CASE
- Field names use camelCase
- Suggestions are actionable and specific

### Predicate Requirements

- Return type must be `value is BrandedType`
- Must include type safety check (`typeof value === "string"`)
- Reuse validation logic from smart constructor when possible
- Keep logic simple (predicate is for type narrowing)

---

## Summary: What You'll Need

### For Each Color Type Implementation:

**1. Type Definition** (`types/branded/index.ts`)
- Add branded type alias
- Include descriptive comment

**2. Smart Constructor** (`newtypes/stringTypes/[colorType]/index.ts`)
- Function signature: `(value: string) => Result<ValidationError, ColorType>`
- Validation logic (regex or functional)
- Error handling with full ValidationError object
- Return via `unsafeConstructor(value)`

**3. Unsafe Constructor** (`newtypes/stringTypes/[colorType]/unsafe[ColorType]/index.ts`)
- Simple type cast: `value as ColorType`

**4. Unwrap Function** (`newtypes/stringTypes/[colorType]/unwrap[ColorType]/index.ts`)
- Simple extraction: return the value

**5. Type Predicate** (`predicates/is[ColorType]/index.ts`)
- Function signature: `(value: string) => value is ColorType`
- Type checking first
- Reuse regex or validation logic
- Return boolean

**6. Tests**
- Smart constructor tests (`newtypes/stringTypes/[colorType]/index.test.ts`)
- Valid cases (multiple examples)
- Invalid format cases
- Edge cases (empty, malformed)
- Property-based tests (if appropriate)

---

## File Paths Summary

### Batch 6 Reference Implementations:
- NonEmptyString: `/Users/guy/Workspace/@sitebender/toolsmith-ai/libraries/toolsmith/src/newtypes/stringTypes/nonEmptyString/`
- Char: `/Users/guy/Workspace/@sitebender/toolsmith-ai/libraries/toolsmith/src/newtypes/stringTypes/char/`
- Base58: `/Users/guy/Workspace/@sitebender/toolsmith-ai/libraries/toolsmith/src/newtypes/stringTypes/base58/`

### Batch 7 Targets (to be created):
- HexColor: `/Users/guy/Workspace/@sitebender/toolsmith-ai/libraries/toolsmith/src/newtypes/stringTypes/hexColor/`
- OklchColor: `/Users/guy/Workspace/@sitebender/toolsmith-ai/libraries/toolsmith/src/newtypes/stringTypes/oklchColor/`
- P3Color: `/Users/guy/Workspace/@sitebender/toolsmith-ai/libraries/toolsmith/src/newtypes/stringTypes/p3Color/`

### Predicates (to be created):
- isHexColor: `/Users/guy/Workspace/@sitebender/toolsmith-ai/libraries/toolsmith/src/predicates/isHexColor/`
- isOklchColor: `/Users/guy/Workspace/@sitebender/toolsmith-ai/libraries/toolsmith/src/predicates/isOklchColor/`
- isP3Color: `/Users/guy/Workspace/@sitebender/toolsmith-ai/libraries/toolsmith/src/predicates/isP3Color/`

### Type Definitions:
- Update: `/Users/guy/Workspace/@sitebender/toolsmith-ai/libraries/toolsmith/src/types/branded/index.ts` (add 3 type definitions after line 93)

### Checklist:
- Update: `/Users/guy/Workspace/@sitebender/toolsmith-ai/libraries/toolsmith/docs/NEWTYPES_IMPLEMENTATION_CHECKLIST.md` (section starting at line 458)

---

## Validation Requirements Details

### HexColor Format Details
- **3-digit form** (#RGB): Each digit is a hex value (0-9, a-f, A-F)
- **6-digit form** (#RRGGBB): Each pair represents red, green, blue
- **Normalization**: Convert to lowercase (e.g., `#FFF` → `#fff`)
- **Examples to support**:
  - `#fff` (white, short)
  - `#ffffff` (white, long)
  - `#f00` (red, short)
  - `#ff0000` (red, long)
  - `#0a0` (green, short)
  - `#00aa00` (green, long)

### OklchColor Format Details
- **Function-based**: `oklch(lightness chroma hue)` with optional alpha
- **Lightness**: 0-1 or 0%-100%
- **Chroma**: 0-1 (unitless, typically 0-0.4 in practice)
- **Hue**: 0-360 (degrees) or 0-1 (normalized)
- **Alpha**: 0-1 (optional, after `/`)
- **Whitespace flexible**: Should normalize/accept variable spacing
- **Case flexible**: `oklch`, `OKLCH`, `OkLch` all valid
- **Examples**:
  - `oklch(0.5 0.1 120)`
  - `oklch(50% 0.1 120deg)`
  - `oklch(0.5 0.1 120 / 0.8)`
  - `oklch( 0.5  0.1  120 )`

### P3Color Format Details
- **Function-based**: `color(display-p3 red green blue)` with optional alpha
- **Color space**: Must be `display-p3` (strict)
- **R, G, B**: 0-1 or 0%-100%
- **Alpha**: 0-1 (optional, after `/`)
- **Whitespace flexible**: Should normalize/accept variable spacing
- **Case flexible**: `color`, `COLOR`, but `display-p3` may be strict
- **Examples**:
  - `color(display-p3 1 0 0)` (red)
  - `color(display-p3 100% 0% 0%)`
  - `color(display-p3 1 0 0 / 0.8)`
  - `color( display-p3  1  0  0 )`

---

## Error Codes to Implement

### HexColor Errors
- `HEX_COLOR_EMPTY`: Value is empty
- `HEX_COLOR_NO_HASH`: Missing leading `#`
- `HEX_COLOR_INVALID_LENGTH`: Not 3 or 6 hex digits after `#`
- `HEX_COLOR_INVALID_CHARACTERS`: Non-hex characters present

### OklchColor Errors
- `OKLCH_COLOR_EMPTY`: Value is empty
- `OKLCH_COLOR_INVALID_FORMAT`: Doesn't match oklch() function format
- `OKLCH_COLOR_INVALID_LIGHTNESS`: L value out of range or invalid
- `OKLCH_COLOR_INVALID_CHROMA`: C value out of range or invalid
- `OKLCH_COLOR_INVALID_HUE`: H value out of range or invalid
- `OKLCH_COLOR_INVALID_ALPHA`: Alpha value out of range or invalid

### P3Color Errors
- `P3_COLOR_EMPTY`: Value is empty
- `P3_COLOR_INVALID_FORMAT`: Doesn't match color(display-p3 ...) function format
- `P3_COLOR_INVALID_RED`: R value out of range or invalid
- `P3_COLOR_INVALID_GREEN`: G value out of range or invalid
- `P3_COLOR_INVALID_BLUE`: B value out of range or invalid
- `P3_COLOR_INVALID_ALPHA`: Alpha value out of range or invalid

