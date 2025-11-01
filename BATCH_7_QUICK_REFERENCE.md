# Batch 7 Color Types - Quick Reference Guide

## At-a-Glance Summary

### What You're Building
Three color type newtypes with validation and type predicates:
- **HexColor**: `#RGB` or `#RRGGBB` (hex color codes)
- **OklchColor**: `oklch(L C H / A)` (CSS color function)
- **P3Color**: `color(display-p3 R G B / A)` (CSS color space)

### Files You Need to Create (Per Color Type)

```
9 files per color type × 3 color types = 27 files total

For HexColor (example):
src/newtypes/stringTypes/hexColor/
  ├── index.ts                         # Smart constructor (validates, returns Result)
  ├── index.test.ts                    # Test smart constructor
  ├── unsafeHexColor/
  │   └── index.ts                     # Unsafe constructor (no validation)
  └── unwrapHexColor/
      └── index.ts                     # Extract raw value

src/predicates/isHexColor/
  ├── index.ts                         # Type guard (returns boolean)
  └── index.test.ts                    # Test type narrowing

src/types/branded/
  └── index.ts                         # Add type definition (1 line per type)
```

---

## Implementation Workflow

### Step 1: Add Type Definitions
**File**: `src/types/branded/index.ts` (add after line 93)

```typescript
//++ Hexadecimal color in #RGB or #RRGGBB format (3 or 6 hex digits)
export type HexColor = Brand<string, "HexColor">

//++ CSS Oklch color in oklch(L C H) or oklch(L C H / A) format
export type OklchColor = Brand<string, "OklchColor">

//++ CSS display-p3 color in color(display-p3 R G B) or color(display-p3 R G B / A) format
export type P3Color = Brand<string, "P3Color">
```

### Step 2: Create Smart Constructors (Main Logic)

**Pattern**: `src/newtypes/stringTypes/[colorType]/index.ts`

```typescript
import type { Result } from "@sitebender/toolsmith/types/fp/result/index.ts"
import type { ValidationError } from "@sitebender/toolsmith/types/fp/validation/index.ts"
import type { HexColor } from "@sitebender/toolsmith/types/branded/index.ts"

import error from "@sitebender/toolsmith/monads/result/error/index.ts"
import ok from "@sitebender/toolsmith/monads/result/ok/index.ts"
import unsafeHexColor from "@sitebender/toolsmith/newtypes/stringTypes/hexColor/unsafeHexColor/index.ts"

//++ Smart constructor - validates and creates HexColor
//++ Validates #RGB or #RRGGBB format (case-insensitive input)
export default function hexColor(
	value: string,
): Result<ValidationError, HexColor> {
	if (value.length === 0) {
		return error({
			code: "HEX_COLOR_EMPTY",
			field: "hexColor",
			messages: ["The system needs a hex color value."],
			received: value,
			expected: "#RGB or #RRGGBB format (3 or 6 hex digits)",
			suggestion: "Provide a hex color like '#fff' or '#ffffff'",
			examples: ["#fff", "#ffffff", "#f0f0f0"],
			severity: "requirement",
		})
	}

	//++ Validate format: #RGB or #RRGGBB
	const hexPattern = /^#[0-9a-fA-F]{3}([0-9a-fA-F]{3})?$/
	if (!hexPattern.test(value)) {
		return error({
			code: "HEX_COLOR_INVALID_FORMAT",
			field: "hexColor",
			messages: ["The system needs a valid hex color format."],
			received: value,
			expected: "#RGB or #RRGGBB (3 or 6 hex digits after #)",
			suggestion: "Use format like '#fff' (short) or '#ffffff' (long)",
			examples: ["#fff", "#ffffff", "#abc123"],
			severity: "requirement",
		})
	}

	//++ Normalize to lowercase
	const normalized = value.toLowerCase()
	return ok(unsafeHexColor(normalized))
}

export type { HexColor }
```

### Step 3: Create Unsafe Constructors

**Pattern**: `src/newtypes/stringTypes/[colorType]/unsafe[ColorType]/index.ts`

```typescript
import type { HexColor } from "@sitebender/toolsmith/types/branded/index.ts"

//++ Unsafe constructor - brands value without validation (use only after validation)
export default function unsafeHexColor(value: string): HexColor {
	return value as HexColor
}
```

### Step 4: Create Unwrap Functions

**Pattern**: `src/newtypes/stringTypes/[colorType]/unwrap[ColorType]/index.ts`

```typescript
import type { HexColor } from "@sitebender/toolsmith/types/branded/index.ts"

//++ Extract the underlying string value from a HexColor
export default function unwrapHexColor(hexColor: HexColor): string {
	return hexColor
}
```

### Step 5: Create Type Predicates

**Pattern**: `src/predicates/is[ColorType]/index.ts`

```typescript
import type { HexColor } from "@sitebender/toolsmith/types/branded/index.ts"

//++ Type predicate that checks if a string is a valid hex color
export default function isHexColor(value: string): value is HexColor {
	if (typeof value !== "string") {
		return false
	}

	//++ [EXCEPTION] Using regex for hex color validation
	//++ Pattern: # followed by 3 or 6 hex digits (0-9, a-f, A-F)
	const hexPattern = /^#[0-9a-fA-F]{3}([0-9a-fA-F]{3})?$/

	return hexPattern.test(value)
}
```

### Step 6: Write Tests

**Pattern**: `src/newtypes/stringTypes/[colorType]/index.test.ts`

```typescript
import { assertEquals } from "@std/assert"

import hexColor from "@sitebender/toolsmith/newtypes/stringTypes/hexColor/index.ts"

Deno.test("hexColor returns Ok for valid #RGB format", function returnsOkForRgb() {
	const result = hexColor("#fff")
	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(result.value, "#fff" as any)
	}
})

Deno.test("hexColor returns Ok for valid #RRGGBB format", function returnsOkForRrggbb() {
	const result = hexColor("#ffffff")
	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(result.value, "#ffffff" as any)
	}
})

Deno.test("hexColor returns Error for empty string", function returnsErrorForEmpty() {
	const result = hexColor("")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "HEX_COLOR_EMPTY")
		assertEquals(result.error.field, "hexColor")
	}
})

Deno.test("hexColor returns Error for missing hash", function returnsErrorNoHash() {
	const result = hexColor("ffffff")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "HEX_COLOR_INVALID_FORMAT")
	}
})

Deno.test("hexColor returns Error for invalid hex digits", function returnsErrorInvalidHex() {
	const result = hexColor("#gggggg")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "HEX_COLOR_INVALID_FORMAT")
	}
})

Deno.test("hexColor normalizes uppercase to lowercase", function normalizesCase() {
	const result = hexColor("#FFF")
	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(result.value, "#fff" as any)
	}
})
```

---

## Validation Patterns by Color Type

### HexColor Validation

**Regex Pattern**: `^#[0-9a-fA-F]{3}([0-9a-fA-F]{3})?$`

**Validation Steps**:
1. Check if not empty
2. Check if matches hex pattern (# + 3 or 6 hex digits)
3. Normalize to lowercase
4. Return ok with unsafe constructor

**Valid Examples**:
- `#fff` (white, short)
- `#ffffff` (white, long)
- `#f00` (red, short)
- `#ff0000` (red, long)
- `#0a0` (green, short)
- `#a0a` (magenta, short)

**Invalid Examples**:
- `fff` (no hash)
- `#ff` (too short)
- `#ffff` (wrong length)
- `#gggggg` (invalid hex)
- `#fff;` (extra character)

---

### OklchColor Validation

**Regex Pattern**: `^oklch\s*\(\s*([0-9.]+%?)\s+([0-9.]+)\s+([0-9.]+)\s*(?:/\s*([0-9.]+))?\s*\)$/i`

**Validation Steps**:
1. Check if not empty
2. Match oklch() function format (case-insensitive)
3. Extract and validate L value (0-1 or 0%-100%)
4. Extract and validate C value (0-1 typically)
5. Extract and validate H value (0-360)
6. Extract and validate optional alpha (0-1)
7. Normalize whitespace and lowercase
8. Return ok with unsafe constructor

**Valid Examples**:
- `oklch(0.5 0.1 120)` (basic)
- `oklch(50% 0.1 120)` (percentage lightness)
- `oklch(0.5 0.1 120 / 0.8)` (with alpha)
- `oklch( 0.5  0.1  120 )` (extra whitespace)

**Invalid Examples**:
- `oklch(0.5 0.1)` (missing hue)
- `oklch(2 0.1 120)` (lightness out of range)
- `oklch(0.5 0.1 380)` (hue out of range)
- `rgb(0.5 0.1 120)` (wrong function)

---

### P3Color Validation

**Regex Pattern**: `^color\s*\(\s*display-p3\s+([0-9.]+%?)\s+([0-9.]+%?)\s+([0-9.]+%?)\s*(?:/\s*([0-9.]+))?\s*\)$/i`

**Validation Steps**:
1. Check if not empty
2. Match color(display-p3 ...) function format (case-insensitive)
3. Extract and validate display-p3 specifier
4. Extract and validate R value (0-1 or 0%-100%)
5. Extract and validate G value (0-1 or 0%-100%)
6. Extract and validate B value (0-1 or 0%-100%)
7. Extract and validate optional alpha (0-1)
8. Normalize whitespace and lowercase
9. Return ok with unsafe constructor

**Valid Examples**:
- `color(display-p3 1 0 0)` (red)
- `color(display-p3 100% 0% 0%)` (red with percentages)
- `color(display-p3 1 0 0 / 0.8)` (with alpha)
- `color( display-p3  1  0  0 )` (extra whitespace)

**Invalid Examples**:
- `color(srgb 1 0 0)` (wrong color space)
- `color(display-p3 1 0)` (missing blue)
- `color(display-p3 2 0 0)` (value out of range)
- `color(display-p3 1 0 0 / 2)` (alpha out of range)

---

## Error Code Reference

### HexColor Error Codes
- `HEX_COLOR_EMPTY` - Empty string provided
- `HEX_COLOR_INVALID_FORMAT` - Doesn't match #RGB or #RRGGBB

### OklchColor Error Codes
- `OKLCH_COLOR_EMPTY` - Empty string provided
- `OKLCH_COLOR_INVALID_FORMAT` - Doesn't match oklch() function format
- `OKLCH_COLOR_INVALID_LIGHTNESS` - L value invalid or out of range
- `OKLCH_COLOR_INVALID_CHROMA` - C value invalid or out of range
- `OKLCH_COLOR_INVALID_HUE` - H value invalid or out of range
- `OKLCH_COLOR_INVALID_ALPHA` - Alpha value out of range

### P3Color Error Codes
- `P3_COLOR_EMPTY` - Empty string provided
- `P3_COLOR_INVALID_FORMAT` - Doesn't match color(display-p3 ...) format
- `P3_COLOR_INVALID_RED` - R value invalid or out of range
- `P3_COLOR_INVALID_GREEN` - G value invalid or out of range
- `P3_COLOR_INVALID_BLUE` - B value invalid or out of range
- `P3_COLOR_INVALID_ALPHA` - Alpha value out of range

---

## Testing Checklist Per Type

For each color type, ensure these test cases pass:

### HexColor Tests
- ✓ Valid #RGB (3 hex digits): `#fff`, `#abc`, `#def`
- ✓ Valid #RRGGBB (6 hex digits): `#ffffff`, `#abcdef`, `#123456`
- ✓ Case normalization: `#FFF` → `#fff`
- ✓ Error: empty string
- ✓ Error: no hash symbol
- ✓ Error: wrong length (2 or 4 or 5 digits)
- ✓ Error: invalid hex characters (G-Z)
- ✓ Property-based: all valid hex alphabets work

### OklchColor Tests
- ✓ Valid basic: `oklch(0.5 0.1 120)`
- ✓ Valid with percentage L: `oklch(50% 0.1 120)`
- ✓ Valid with alpha: `oklch(0.5 0.1 120 / 0.8)`
- ✓ Valid with extra whitespace: `oklch( 0.5  0.1  120 )`
- ✓ Normalization preserves normalized form
- ✓ Error: empty string
- ✓ Error: missing components
- ✓ Error: L out of range (> 1 or > 100%)
- ✓ Error: H out of range (> 360)
- ✓ Error: alpha out of range

### P3Color Tests
- ✓ Valid basic: `color(display-p3 1 0 0)`
- ✓ Valid with percentages: `color(display-p3 100% 0% 0%)`
- ✓ Valid with alpha: `color(display-p3 1 0 0 / 0.8)`
- ✓ Valid with extra whitespace: `color( display-p3  1  0  0 )`
- ✓ Normalization preserves normalized form
- ✓ Error: empty string
- ✓ Error: wrong color space (srgb, etc.)
- ✓ Error: missing components
- ✓ Error: values out of range (> 1 or > 100%)
- ✓ Error: alpha out of range

---

## File Checklist

### Files to Create (27 total)

#### HexColor (9 files)
- [ ] `src/types/branded/index.ts` - Add HexColor type
- [ ] `src/newtypes/stringTypes/hexColor/index.ts` - Smart constructor
- [ ] `src/newtypes/stringTypes/hexColor/index.test.ts` - Smart constructor tests
- [ ] `src/newtypes/stringTypes/hexColor/unsafeHexColor/index.ts` - Unsafe constructor
- [ ] `src/newtypes/stringTypes/hexColor/unwrapHexColor/index.ts` - Unwrap function
- [ ] `src/predicates/isHexColor/index.ts` - Type predicate
- [ ] `src/predicates/isHexColor/index.test.ts` - Predicate tests (optional)

#### OklchColor (9 files)
- [ ] `src/types/branded/index.ts` - Add OklchColor type
- [ ] `src/newtypes/stringTypes/oklchColor/index.ts` - Smart constructor
- [ ] `src/newtypes/stringTypes/oklchColor/index.test.ts` - Smart constructor tests
- [ ] `src/newtypes/stringTypes/oklchColor/unsafeOklchColor/index.ts` - Unsafe constructor
- [ ] `src/newtypes/stringTypes/oklchColor/unwrapOklchColor/index.ts` - Unwrap function
- [ ] `src/predicates/isOklchColor/index.ts` - Type predicate
- [ ] `src/predicates/isOklchColor/index.test.ts` - Predicate tests (optional)

#### P3Color (9 files)
- [ ] `src/types/branded/index.ts` - Add P3Color type
- [ ] `src/newtypes/stringTypes/p3Color/index.ts` - Smart constructor
- [ ] `src/newtypes/stringTypes/p3Color/index.test.ts` - Smart constructor tests
- [ ] `src/newtypes/stringTypes/p3Color/unsafeP3Color/index.ts` - Unsafe constructor
- [ ] `src/newtypes/stringTypes/p3Color/unwrapP3Color/index.ts` - Unwrap function
- [ ] `src/predicates/isP3Color/index.ts` - Type predicate
- [ ] `src/predicates/isP3Color/index.test.ts` - Predicate tests (optional)

#### Documentation
- [ ] Update `docs/NEWTYPES_IMPLEMENTATION_CHECKLIST.md` - Mark Batch 7 items as complete

---

## Key Rules to Remember

1. **All functions are curried** (take 1 parameter each) ✓
2. **No arrow functions** - use named function declarations ✓
3. **No exceptions** - return Result monads ✓
4. **No mutations** - use immutable data ✓
5. **Error messages help users** - not blaming, suggest fixes ✓
6. **Validation is in smart constructor** - predicates reuse logic ✓
7. **Type predicates return boolean** - type narrowing only ✓
8. **Regex validation in predicates** uses comments to explain exception ✓

