# Error System for Newtypes

## Philosophy: Help, Don't Scold

Errors in Sitebender are **help messages**, not scolding. The system has limitations, not the user. Our error messages explain:

1. **What the system needs** that is missing or must be different
2. **WHY the system needs** that (rules/constraints are on the SYSTEM, not the user)
3. **What will work** for the system
4. **How to update** their input to match the system's **limitations**
5. **Exactly where and what to do**

## ValidationError Type

**Location**: `types/ValidationError/index.ts`

### Complete Type Definition

```typescript
import type { Serializable } from "@sitebender/toolsmith/types/index.ts"

type ValidationError = {
	// Machine identification
	code: string  // "INTEGER_NOT_SAFE" - SCREAMING_SNAKE_CASE
	field: string // "age", "amount", etc.

	// Human messages (both for i18n flexibility)
	messages: ReadonlyArray<string>  // English default: ["The system needs..."]
	messageKeys?: ReadonlyArray<string>  // i18n keys: ["validation.integer.not_safe"]

	// Required context (what system needs)
	received: Serializable     // What was provided: 3.14, "hello", etc.
	expected: string           // What system needs: "Safe integer"
	suggestion: string         // REQUIRED: How to fix

	// Optional helpful context
	examples?: ReadonlyArray<Serializable>  // Valid examples: [42, 100, -5]
	constraints?: Readonly<Record<string, Serializable>>  // System limits

	// Location context (for nested object validation)
	path?: ReadonlyArray<string>  // ["user", "profile", "age"]

	// Severity (describes system limitation severity)
	severity: "info" | "notice" | "requirement"

	// i18n support (Linguist integration)
	locale?: string
	interpolation?: Readonly<Record<string, Serializable>>

	// Optional documentation
	helpUrl?: string
}
```

### Field Descriptions

#### Required Fields

- **`code`**: Machine-readable error code in SCREAMING_SNAKE_CASE
  - Examples: `"INTEGER_NOT_SAFE"`, `"CURRENCY_NOT_FINITE"`, `"DECIMAL_PRECISION_EXCEEDED"`
  - Used for programmatic error handling and logging

- **`field`**: Which field/property failed validation
  - Examples: `"integer"`, `"currency"`, `"age"`
  - Helps locate the problem in forms/objects

- **`messages`**: Array of English error messages (lingua franca default)
  - Always present (works everywhere, even without i18n)
  - Example: `["The system needs a whole number within the safe integer range."]`
  - Multiple messages can accumulate for the same field (Semigroup pattern)

- **`received`**: The actual value that was provided
  - Type: `Serializable` (can be number, string, object, etc.)
  - Shows user exactly what they gave us
  - Example: `3.14`, `"hello"`, `{ amount: 100 }`

- **`expected`**: Human-readable description of what the system needs
  - Type: `string`
  - Example: `"Safe integer"`, `"Finite number"`, `"Whole number with 2 decimal places"`

- **`suggestion`**: REQUIRED actionable help on how to fix
  - Type: `string`
  - Must tell user HOW to update their input
  - Example: `"Use a whole number between -9,007,199,254,740,991 and 9,007,199,254,740,991"`
  - Can be auto-generated but must always be present

- **`severity`**: Describes the type of system limitation
  - `"info"` - Helpful guidance (system is providing context)
  - `"notice"` - Something worth attention (system wants you to be aware)
  - `"requirement"` - System limitation that must be addressed to proceed
  - NO "error" or "warning" - we don't blame users

#### Optional Fields

- **`messageKeys`**: i18n translation keys for Linguist
  - Array of keys: `["validation.integer.not_safe"]`
  - When present with `locale`, overrides English `messages`
  - Falls back to English if translation missing

- **`examples`**: Valid example values
  - Type: `ReadonlyArray<Serializable>`
  - Shows concrete examples of what works
  - Example: `[42, 100, -5, 0]`

- **`constraints`**: Machine-readable system constraints
  - Type: `Readonly<Record<string, Serializable>>`
  - Example: `{ min: -9007199254740991, max: 9007199254740991, decimals: false }`
  - Useful for auto-generating suggestions

- **`path`**: Location in nested structures
  - Type: `ReadonlyArray<string>`
  - Example: `["user", "profile", "age"]`
  - Helps locate errors in complex objects

- **`locale`**: Current locale for rendering
  - Type: `string`
  - Example: `"en"`, `"es-ES"`, `"zh-Hans-CN"`
  - Used by Linguist to select translation

- **`interpolation`**: Data for ICU MessageFormat
  - Type: `Readonly<Record<string, Serializable>>`
  - Values inserted into translated messages
  - Example: `{ received: "3.14", min: "-9007199254740991", max: "9007199254740991" }`

- **`helpUrl`**: Link to documentation
  - Type: `string`
  - Example: `"https://docs.sitebender.com/validation/integers"`

## Error Codes for Newtypes

All error codes in SCREAMING_SNAKE_CASE, prefixed with type name.

### Integer Errors

- `INTEGER_NOT_SAFE` - Value exceeds safe integer range or has decimals

### BigInteger Errors

- `BIGINTEGER_NOT_BIGINT` - Value is not a bigint type

### Float Errors

- `FLOAT_NOT_FINITE` - Value is Infinity, -Infinity, or NaN

### Currency Errors

- `CURRENCY_NOT_FINITE` - Input value is not finite
- `CURRENCY_PRECISION_LOST` - Value has more than 2 decimal places (rounding occurred)

### Decimal0 Errors

- `DECIMAL0_NOT_FINITE` - Input value is not finite
- `DECIMAL0_HAS_DECIMALS` - Value must be whole number (0 decimals)

### Decimal1 Errors

- `DECIMAL1_NOT_FINITE` - Input value is not finite
- `DECIMAL1_PRECISION_EXCEEDED` - Value has more than 1 decimal place

### Decimal3 Errors

- `DECIMAL3_NOT_FINITE` - Input value is not finite
- `DECIMAL3_PRECISION_EXCEEDED` - Value has more than 3 decimal places

### Decimal4 Errors

- `DECIMAL4_NOT_FINITE` - Input value is not finite
- `DECIMAL4_PRECISION_EXCEEDED` - Value has more than 4 decimal places

### Decimal8 Errors

- `DECIMAL8_NOT_FINITE` - Input value is not finite
- `DECIMAL8_PRECISION_EXCEEDED` - Value has more than 8 decimal places

### Percentage Errors

- `PERCENTAGE_NOT_FINITE` - Input value is not finite
- `PERCENTAGE_OUT_OF_RANGE` - Value must be between 0 and 1 (0% to 100%)
- `PERCENTAGE_PRECISION_EXCEEDED` - Value has more than 4 decimal places

## Message Templates

### Template Structure

All messages follow this structure:

1. **What system needs**: "The system needs..."
2. **What was received**: "You provided {received}."
3. **What works**: "Please use..."
4. **Specific guidance**: Range, format, examples

### Example Messages

#### INTEGER_NOT_SAFE (English)
```
messages: ["The system needs a whole number within the safe integer range."]
suggestion: "Use a whole number between -9,007,199,254,740,991 and 9,007,199,254,740,991"
```

#### CURRENCY_NOT_FINITE (English)
```
messages: ["The system needs a finite currency amount."]
suggestion: "Use a finite number like 19.99 or 0.01. Infinity and NaN are not valid currency values"
```

#### DECIMAL3_PRECISION_EXCEEDED (English)
```
messages: ["The system needs a number with at most 3 decimal places."]
suggestion: "Round your value to 3 decimal places. For example: 1.234 instead of 1.23456"
```

## Linguist Integration

### Storing Translations as Triples

All error message translations stored in Pathfinder triple store:

```turtle
:validation.integer.not_safe
  :locale "en" ;
  :text "The system needs a whole number within the safe integer range. You provided {received}. Please use a value between {min} and {max}." ;
  :severity "requirement" .

:validation.integer.not_safe
  :locale "es-ES" ;
  :text "El sistema necesita un número entero dentro del rango seguro. Proporcionó {received}. Use un valor entre {min} y {max}." ;
  :severity "requirement" .

:validation.integer.not_safe
  :locale "zh-Hans-CN" ;
  :text "系统需要安全整数范围内的整数。您提供了 {received}。请使用 {min} 和 {max} 之间的值。" ;
  :severity "requirement" .
```

### Rendering with Linguist

```typescript
import { translate } from "@sitebender/linguist/translate/index.ts"

function renderError(error: ValidationError): string {
  // If i18n key and locale available, use Linguist
  if (error.messageKeys?.[0] && error.locale) {
    const translated = translate(error.messageKeys[0])(error.interpolation || {})

    if (translated._tag === "Ok") {
      return translated.value
    }
  }

  // Fall back to English messages
  return error.messages.join(" ")
}
```

## Auto-Generation Helpers

### Suggestion Generator

```typescript
function generateSuggestion(
  expected: string,
  constraints?: Readonly<Record<string, Serializable>>,
): string {
  if (!constraints) {
    return `Provide a valid ${expected}`
  }

  const { min, max, decimals } = constraints

  if (min !== undefined && max !== undefined) {
    return `Use a value between ${formatNumber(min)} and ${formatNumber(max)}`
  }

  if (decimals !== undefined) {
    return `Use a number with at most ${decimals} decimal places`
  }

  return `Provide a valid ${expected}`
}

function formatNumber(n: Serializable): string {
  if (typeof n === "number" || typeof n === "bigint") {
    return n.toLocaleString()
  }
  return String(n)
}
```

### Standard Error Constructor

```typescript
function createValidationError(
  code: string,
  field: string,
  expected: string,
  received: Serializable,
  constraints?: Readonly<Record<string, Serializable>>,
): ValidationError {
  return {
    code,
    field,
    messages: [`The system needs ${expected}.`],
    messageKeys: [`validation.${field}.${code.toLowerCase()}`],
    received,
    expected,
    suggestion: generateSuggestion(expected, constraints),
    examples: generateExamples(expected, constraints),
    constraints,
    severity: "requirement",
    locale: "en",
    interpolation: {
      received: String(received),
      expected,
      ...formatConstraints(constraints),
    },
  }
}
```

## Testing Error Messages

Each error should be tested for:

1. **Correct error code**
2. **Helpful messages** (English default)
3. **Valid suggestion** (actionable)
4. **Accurate received value**
5. **Clear expected description**
6. **Appropriate severity**

Example test:

```typescript
Deno.test("integer rejects non-safe integer with helpful error", () => {
  const result = integer(3.14)

  assert(isError(result))
  assertEquals(result.error.code, "INTEGER_NOT_SAFE")
  assertEquals(result.error.field, "integer")
  assertEquals(result.error.received, 3.14)
  assertEquals(result.error.expected, "Safe integer")
  assert(result.error.suggestion.includes("whole number"))
  assertEquals(result.error.severity, "requirement")
})
```

## Summary

- ✅ **System-centric**: Errors explain system limitations, not user failures
- ✅ **Always helpful**: Required `suggestion` field with actionable guidance
- ✅ **i18n ready**: Linguist integration with fallback to English
- ✅ **Type-safe**: Uses `Serializable` instead of `unknown`/`any`
- ✅ **Consistent**: Standard codes, messages, and structure across all newtypes
- ✅ **Testable**: Clear expectations for error structure and content

**Next**: See `plan.md` for implementation checklist with error integration.
