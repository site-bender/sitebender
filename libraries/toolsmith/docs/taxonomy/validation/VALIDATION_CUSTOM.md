# Validation - Custom/Specialized Validators

**Location**: `src/vanilla/validation/`
**Functions**: 14
**Status**: Cataloged
**Created**: 2025-10-07

---

## Function List

### isCreditCard
- **Current**: `(options?: CreditCardOptions) => (value: unknown) => boolean`
- **Returns**: Curried function returning boolean
- **Description**: Validates credit card numbers using the Luhn algorithm, optionally checking specific card types
- **Target**: `(options?: CreditCardOptions) => (value: unknown) => Validation<ValidationError, string>`

### isIban
- **Current**: `(value: unknown) => () => boolean`
- **Returns**: Function returning boolean
- **Description**: Validates International Bank Account Numbers (IBAN) per ISO 13616
- **Target**: `(value: unknown) => Validation<ValidationError, string>`
- **Note**: Current signature is malformed (curried incorrectly), should be refactored

### isIsbn (should this be two functions, `isIsbn10` and `isIsbn13`?)
- **Current**: `(options?: IsbnOptions) => (value: unknown) => boolean`
- **Returns**: Curried function returning boolean
- **Description**: [INFERRED] Validates ISBN (International Standard Book Numbers) for both ISBN-10 and ISBN-13 formats with optional version constraint
- **Target**: `(options?: IsbnOptions) => (value: unknown) => Validation<ValidationError, string>`
- **Note**: Uses arrow function syntax, needs refactoring

### isEmail (an Email is a message, should be `isEmailAddress`)
- **Current**: `(options?: EmailOptions) => (value: unknown) => boolean`
- **Returns**: Curried function returning boolean
- **Description**: Validates email addresses according to RFC 5322 standards with practical limitations
- **Target**: `(options?: EmailOptions) => (value: unknown) => Validation<ValidationError, string>`

### isUrl (need `isUri` and `isIri` as well)
- **Current**: `(options?: UrlOptions) => (value: unknown) => boolean`
- **Returns**: Curried function returning boolean
- **Description**: URL validator — WHATWG-compliant via URL() with optional constraints
- **Target**: `(options?: UrlOptions) => (value: unknown) => Validation<ValidationError, string>`
- **Note**: Uses try/catch internally, needs refactoring for Result monad

### isUuid
- **Current**: `(options?: UuidOptions) => (value: unknown) => boolean`
- **Returns**: Curried function returning boolean
- **Description**: UUID validator — supports v1–v5 with options and nil handling
- **Target**: `(options?: UuidOptions) => (value: unknown) => Validation<ValidationError, string>`
- **Note**: Uses arrow function syntax, needs refactoring

### isBase64 (need `isBase58` as well)
- **Current**: `(options?: Base64Options) => (value?: Value) => boolean`
- **Returns**: Curried function returning boolean
- **Description**: Validates if a string is properly Base64 encoded
- **Target**: `(options?: Base64Options) => (value: unknown) => Validation<ValidationError, string>`

### isHexColor (need `isOklch` and `isP3Color` as well, and maybe others)
- **Current**: `(options?: HexColorOptions) => (value: unknown) => boolean`
- **Returns**: Curried function returning boolean
- **Description**: Validates hexadecimal color codes with optional format restrictions
- **Target**: `(options?: HexColorOptions) => (value: unknown) => Validation<ValidationError, string>`

### isIpv4
- **Current**: `(value: unknown) => () => boolean`
- **Returns**: Function returning boolean
- **Description**: Validates IPv4 addresses in dotted-decimal notation
- **Target**: `(value: unknown) => Validation<ValidationError, string>`
- **Note**: Current signature is malformed (curried incorrectly), should be refactored

### isIpv6
- **Current**: `(value: unknown) => boolean`
- **Returns**: Boolean
- **Description**: [INFERRED] Validates IPv6 addresses including compressed notation, zone identifiers, and IPv4-mapped addresses
- **Target**: `(value: unknown) => Validation<ValidationError, string>`
- **Note**: Uses arrow function syntax, needs refactoring

### isPhone (should be `isPhoneNumber` — a phone is a piece of equipment)
- **Current**: `(options?: PhoneOptions) => (value: unknown) => boolean`
- **Returns**: Curried function returning boolean
- **Description**: [INFERRED] Validates phone numbers with country-specific patterns and optional strict mode
- **Target**: `(options?: PhoneOptions) => (value: unknown) => Validation<ValidationError, string>`

### isPostalCode
- **Current**: `(options?: PostalCodeOptions) => (value: unknown) => boolean`
- **Returns**: Curried function returning boolean
- **Description**: [INFERRED] Validates postal codes for multiple countries with country-specific formats
- **Target**: `(options?: PostalCodeOptions) => (value: unknown) => Validation<ValidationError, string>`
- **Note**: Uses arrow function syntax, needs refactoring

### isJSON (should be `isJson`, good to have `isToml`, `isYaml`, etc.)
- **Current**: `(options?: JSONOptions) => (value: unknown) => boolean`
- **Returns**: Curried function returning boolean
- **Description**: [INFERRED] Validates JSON strings with optional type checking for parsed value
- **Target**: `(options?: JSONOptions) => (value: unknown) => Validation<ValidationError, string>`
- **Note**: Uses try/catch internally, needs refactoring for Result monad

### isSerializable
- **Current**: `(value: unknown) => boolean`
- **Returns**: Boolean
- **Description**: Type guard that checks if a value can be serialized to JSON
- **Target**: `(value: unknown) => Validation<ValidationError, unknown>`

---

## Migration Notes

Custom validators will be converted to Validation-returning functions that accumulate errors. The monadic versions will:

1. Return `valid(value)` when validation succeeds with the validated value
2. Return `invalid(Array<ValidationError>)` when validation fails, with descriptive error messages
3. Maintain currying for functions with options parameters
4. Support error accumulation for complex multi-step validations
5. Preserve type safety while adding rich error context

## Special Considerations

### Signature Issues
- **isIban** and **isIpv4** have malformed currying (take value first, then return zero-argument function)
- These should be refactored to either take value only OR options first, value second

### Arrow Function Violations
- **isIsbn**, **isUuid**, **isPostalCode**, **isIpv6** use arrow function syntax
- All need refactoring to named function declarations per constitutional rules

### Exception Handling
- **isUrl** uses try/catch with URL constructor
- **isJSON** uses try/catch with JSON.parse
- Both need refactoring to use Result monad pattern

### Complex Validation Logic
- **isCreditCard**: Multi-step validation (cleaning, digit check, length check, type match, Luhn algorithm)
- **isIban**: Country-specific length validation + mod-97 checksum
- **isIsbn**: Two different algorithms for ISBN-10 vs ISBN-13
- **isPhone**: Country-specific patterns for 10+ countries
- **isPostalCode**: Country-specific patterns for 20+ countries

### Validation vs Result
- Most custom validators should return **Validation** monad for error accumulation
- Functions like **isJSON** that parse may benefit from **Result** monad
- Consider hybrid approach: Result for parsing, Validation for validation steps

## Options Types

### CreditCardOptions
```typescript
{
	cardType?: "visa" | "mastercard" | "amex" | "discover" | string
}
```

### IsbnOptions
```typescript
{
	version?: 10 | 13
}
```

### EmailOptions
```typescript
{
	requireTLD?: boolean
	allowDisplayName?: boolean
	strict?: boolean
}
```

### UrlOptions
```typescript
{
	protocols?: Array<string>
	allowedDomains?: Array<string>
	requireDomain?: string
	requirePath?: boolean
	disallowLocalhost?: boolean
}
```

### UuidOptions
```typescript
{
	version?: 1 | 2 | 3 | 4 | 5
	versions?: Array<1 | 2 | 3 | 4 | 5>
	allowNil?: boolean
}
```

### Base64Options
```typescript
{
	urlSafe?: boolean
	allowUnpadded?: boolean
	strict?: boolean
}
```

### HexColorOptions
```typescript
{
	requireHash?: boolean
	format?: "3-digit" | "4-digit" | "6-digit" | "8-digit" | "with-alpha" | "no-alpha"
}
```

### PhoneOptions
```typescript
{
	country?: "US" | "CA" | "GB" | "FR" | "DE" | "JP" | "AU" | "IN" | "CN" | "BR" | string
	strict?: boolean
}
```

### PostalCodeOptions
```typescript
{
	country?: "US" | "CA" | "GB" | "DE" | "FR" | "JP" | "AU" | "NL" | "IT" | "ES" | "SE" | "BE" | "AT" | "DK" | "FI" | "NO" | "CH" | "BR" | "MX" | "IN" | "CN" | string
}
```

### JSONOptions
```typescript
{
	type?: "object" | "array" | "string" | "number" | "boolean" | "null"
}
```

---

## Implementation Priority

### High Priority (Common Use Cases)
1. **isEmail** - Universal need for email validation
2. **isUrl** - Common for link validation
3. **isJSON** - Essential for API/config validation

### Medium Priority (Business Applications)
4. **isCreditCard** - E-commerce applications
5. **isPhone** - Contact forms and user profiles
6. **isPostalCode** - Shipping and billing addresses
7. **isUuid** - Database identifiers and API tokens

### Lower Priority (Specialized Cases)
8. **isIban** - Banking applications (regional)
9. **isIsbn** - Publishing/library applications
10. **isBase64** - Data encoding validation
11. **isHexColor** - Design tools and UI configurations
12. **isIpv4/isIpv6** - Network administration
13. **isSerializable** - Internal utility

---

## Related Functions

### String Validators (See VALIDATION_STRING.md)
- isAlpha, isAlphanumeric, isBlank, isNonEmptyString
- matches (for custom regex patterns)

### Luhn Algorithm (Shared)
- Used by **isCreditCard**
- Could be extracted as shared utility for other Luhn-based validators

### Format Validators
- These validators focus on domain-specific format rules
- Distinguished from generic string pattern matching by their specialized business logic
