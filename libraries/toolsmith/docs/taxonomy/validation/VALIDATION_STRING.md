# Validation - String Validation Functions

**Location**: `src/vanilla/validation/`
**Functions**: 20
**Status**: Cataloged
**Created**: 2025-10-07

---

## Function List

### isEmail (should be `isEmailAddress` — an email is an electronic message)

- **Current**: `(options?: EmailOptions) => (value: unknown) => boolean`
- **Options**: `{ requireTLD?: boolean, allowDisplayName?: boolean, strict?: boolean }`
- **Returns**: Curried function returning boolean
- **Description**: Validates email addresses according to RFC 5322 standards with practical limitations
- **Target**: `(options?: EmailOptions) => (value: unknown) => Result<ValidationError, string>`

### isUrl

- **Current**: `(options?: UrlOptions) => (value: unknown) => boolean`
- **Options**: `{ protocols?: Array<string>, allowedDomains?: Array<string>, requireDomain?: string, requirePath?: boolean, disallowLocalhost?: boolean }`
- **Returns**: Curried function returning boolean
- **Description**: URL validator - WHATWG-compliant via URL() with optional constraints
- **Target**: `(options?: UrlOptions) => (value: unknown) => Result<ValidationError, string>`

### isUuid

- **Current**: `(options?: UuidOptions) => (value: unknown) => boolean`
- **Options**: `{ version?: 1 | 2 | 3 | 4 | 5, versions?: Array<1 | 2 | 3 | 4 | 5>, allowNil?: boolean }`
- **Returns**: Curried function returning boolean
- **Description**: UUID validator - supports v1-v5 with options and nil handling
- **Target**: `(options?: UuidOptions) => (value: unknown) => Result<ValidationError, string>`

### isIpv4

- **Current**: `(value: unknown) => () => boolean`
- **Returns**: Curried function returning boolean
- **Description**: Validates IPv4 addresses in dotted-decimal notation
- **Target**: `(value: unknown) => Result<ValidationError, string>`

### isIpv6

- **Current**: `(value: unknown) => boolean`
- **Returns**: Boolean
- **Description**: [INFERRED] Validates IPv6 addresses including zone identifiers and IPv4-mapped addresses
- **Target**: `(value: unknown) => Result<ValidationError, string>`

### isHexColor (aren't these all in VALIDATION_CUSTOM also? Should have all color types, e.g., `isOklch`)

- **Current**: `(options?: HexColorOptions) => (value: unknown) => boolean`
- **Options**: `{ requireHash?: boolean, format?: '3-digit' | '4-digit' | '6-digit' | '8-digit' | 'with-alpha' | 'no-alpha' }`
- **Returns**: Curried function returning boolean
- **Description**: Validates hexadecimal color codes with optional format restrictions
- **Target**: `(options?: HexColorOptions) => (value: unknown) => Result<ValidationError, string>`

### isAlpha (confusing — maybe `isAlphabetic`? Alpha is a Greek letter)

- **Current**: `(options?: AlphaOptions) => (value: unknown) => boolean`
- **Options**: `{ allowSpaces?: boolean, allowHyphens?: boolean, allowApostrophes?: boolean, unicode?: boolean }`
- **Returns**: Curried function returning boolean
- **Description**: Validates if a string contains only alphabetic characters
- **Target**: `(options?: AlphaOptions) => (value: unknown) => Result<ValidationError, string>`

### isAlphanumeric

- **Current**: `(options?: AlphanumericOptions) => (value: unknown) => boolean`
- **Options**: `{ allowSpaces?: boolean, allowHyphens?: boolean, allowUnderscores?: boolean, unicode?: boolean }`
- **Returns**: Curried function returning boolean
- **Description**: Validates if a string contains only alphanumeric characters
- **Target**: `(options?: AlphanumericOptions) => (value: unknown) => Result<ValidationError, string>`

### isBase64 (and `isBase58` — what about `isBinary`, `isOctal`, `isHexadecimal`?)

- **Current**: `(options?: Base64Options) => (value?: Value) => boolean`
- **Options**: `{ urlSafe?: boolean, allowUnpadded?: boolean, strict?: boolean }`
- **Returns**: Curried function returning boolean
- **Description**: Validates if a string is properly Base64 encoded
- **Target**: `(options?: Base64Options) => (value: unknown) => Result<ValidationError, string>`

### isBlank

- **Current**: `(str: string | null | undefined) => boolean`
- **Returns**: Boolean
- **Description**: Checks if a string is empty or contains only whitespace
- **Target**: `(value: unknown) => Result<ValidationError, string>`

### isEmpty

- **Current**: `(value: unknown) => boolean`
- **Returns**: Boolean
- **Description**: Checks if a value is empty based on its type (null, undefined, empty string/array/object/Map/Set)
- **Target**: `(value: unknown) => Result<ValidationError, never>`
- **Note**: Polymorphic - handles multiple types, returns never when empty

### isJSON

- **Current**: `(options?: JSONOptions) => (value: unknown) => boolean`
- **Options**: `{ type?: 'object' | 'array' | 'string' | 'number' | 'boolean' | 'null' }`
- **Returns**: Curried function returning boolean
- **Description**: [INFERRED] Validates if a string is valid JSON with optional type checking
- **Target**: `(options?: JSONOptions) => (value: unknown) => Result<ValidationError, string>`

### isIsbn (split into `isIsbn10` and `isIsbn13` (or all three?))

- **Current**: `(options?: IsbnOptions) => (value: unknown) => boolean`
- **Options**: `{ version?: 10 | 13 }`
- **Returns**: Curried function returning boolean
- **Description**: [INFERRED] Validates ISBN book identifiers (both ISBN-10 and ISBN-13 formats)
- **Target**: `(options?: IsbnOptions) => (value: unknown) => Result<ValidationError, string>`

### isCreditCard

- **Current**: `(options?: CreditCardOptions) => (value: unknown) => boolean`
- **Options**: `{ cardType?: string }`
- **Returns**: Curried function returning boolean
- **Description**: Validates credit card numbers using the Luhn algorithm, optionally checking specific card types
- **Target**: `(options?: CreditCardOptions) => (value: unknown) => Result<ValidationError, string>`

### isIban

- **Current**: `(value: unknown) => () => boolean`
- **Returns**: Curried function returning boolean
- **Description**: Validates International Bank Account Numbers (IBAN) per ISO 13616
- **Target**: `(value: unknown) => Result<ValidationError, string>`

### isPhone (should be `isPhoneNumber` — a phone is a piece of equipment)

- **Current**: `(options?: PhoneOptions) => (value: unknown) => boolean`
- **Options**: `{ country?: string, strict?: boolean }`
- **Returns**: Curried function returning boolean
- **Description**: [INFERRED] Validates phone numbers with support for multiple country formats
- **Target**: `(options?: PhoneOptions) => (value: unknown) => Result<ValidationError, string>`

### isPostalCode (also have the more specific `isZipCode` and `isZipPlusFour`?)

- **Current**: `(options?: PostalCodeOptions) => (value: unknown) => boolean`
- **Options**: `{ country?: string }`
- **Returns**: Curried function returning boolean
- **Description**: [INFERRED] Validates postal codes for various countries
- **Target**: `(options?: PostalCodeOptions) => (value: unknown) => Result<ValidationError, string>`

### isNonEmptyString

- **Current**: `(value: unknown) => value is string`
- **Returns**: Type guard boolean
- **Description**: Type guard that checks if a value is a non-empty string primitive
- **Target**: `(value: unknown) => Result<ValidationError, string>`

### isNumeric

- **Current**: `(options?: NumericOptions) => (value: unknown) => boolean`
- **Options**: `{ allowNegative?: boolean, allowDecimal?: boolean, allowScientific?: boolean }`
- **Returns**: Curried function returning boolean
- **Description**: [INFERRED] Validates if a string represents a numeric value with configurable format options
- **Target**: `(options?: NumericOptions) => (value: unknown) => Result<ValidationError, string>`

### isString

- **Current**: `(value: unknown) => value is string`
- **Returns**: Type guard boolean
- **Description**: Type guard that checks if a value is a string primitive (not String object)
- **Target**: `(value: unknown) => Result<ValidationError, string>`

---

## Migration Notes

String validators will be converted to Result-returning validators that provide detailed error information on failure. The monadic versions will:

1. Return `ok(validatedString)` when validation succeeds with the validated string value
2. Return `error(ValidationError)` when validation fails, with descriptive error messages indicating:
   - What format was expected
   - What part of the validation failed
   - Any constraint violations
3. Maintain currying for option-based validators
4. Preserve all validation logic while adding comprehensive error reporting

## Special Considerations

### Arrow Function Refactoring Required

- **isUuid** - Uses arrow function syntax, needs refactoring to named functions
- **isIpv6** - Uses arrow function syntax, needs refactoring to named functions
- **isIsbn** - Uses arrow function syntax with nested helper functions
- **isPostalCode** - Uses arrow function syntax, needs refactoring to named functions
- **isNumeric** - Uses arrow function syntax, needs refactoring to named functions

### Currying Inconsistencies

- **isIpv4** - Has unusual currying pattern `(value) => () => boolean`, should be `(value) => boolean`
- **isIban** - Has unusual currying pattern `(value) => () => boolean`, should be `(value) => boolean`
- **isBlank** - Not curried, takes `string | null | undefined` directly

### Type Safety Issues

- **isBlank** - Accepts `string | null | undefined` instead of `unknown`, should be normalized
- **isBase64** - Uses `Value` type instead of `unknown`, should be normalized
- **isNonEmptyString** - Returns type guard but should return Result in monadic form

### Complex Validators with Dependencies

- **isEmail** - Complex RFC 5322 validation with multiple constraint checks
- **isUrl** - Uses WHATWG URL API with try/catch (needs Result conversion)
- **isUuid** - Supports multiple UUID versions and nil UUID
- **isIpv6** - Complex validation including zone identifiers and IPv4-mapped addresses
- **isCreditCard** - Uses Luhn algorithm validation with helper functions
- **isIban** - Uses mod-97 checksum validation
- **isPhone** - Country-specific validation patterns (10+ countries)
- **isPostalCode** - Country-specific validation patterns (20+ countries)

### Empty/Blank Distinction

- **isEmpty** - Polymorphic, checks various collection types for emptiness
- **isBlank** - String-specific, checks for whitespace-only strings
- **isNonEmptyString** - Combines string type check with emptiness check

### Format Validators

- **isBase64** - Supports URL-safe encoding and padding options
- **isHexColor** - Supports multiple hex color formats (3/4/6/8 digit, with/without alpha)
- **isJSON** - Can validate specific JSON value types

### International Standards

- **isEmail** - RFC 5322 compliance
- **isIban** - ISO 13616 compliance
- **isPhone** - ITU-T E.164 compliance for international format
- **isUuid** - RFC 4122 compliance

### Character Set Validators

- **isAlpha** - Supports Unicode character ranges
- **isAlphanumeric** - Supports Unicode character ranges
- Both support flexible character inclusion (spaces, hyphens, apostrophes, underscores)

---

## Pattern Summary

Most string validators follow these patterns:

1. **Options-based**: `(options) => (value) => boolean` - for configurable validation
2. **Direct**: `(value) => boolean` - for simple format checking
3. **Type guard**: `(value) => value is string` - for TypeScript type narrowing

All will convert to Result-returning validators:

- Options-based: `(options) => (value) => Result<ValidationError, string>`
- Direct: `(value) => Result<ValidationError, string>`
- Type guards become Result validators with proper error messages
