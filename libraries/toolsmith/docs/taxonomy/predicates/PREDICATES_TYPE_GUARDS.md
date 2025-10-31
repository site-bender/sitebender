# Predicates - Type Guard Functions

**Location**: `src/predicates/`
**Functions**: 53
**Status**: Implemented
**Created**: 2025-10-31

---

## Overview

Type guards are predicate functions that return `boolean` and enable TypeScript type narrowing. All `is*` functions have been moved from validation to this dedicated predicates folder.

These are pure functions that check types at runtime and provide compile-time type narrowing through TypeScript's type predicate syntax (`value is Type`).

---

## Primitive Type Guards

### isString

- **Location**: `src/predicates/isString/`
- **Signature**: `(value: unknown) => value is string`
- **Description**: Type guard that checks if a value is a string primitive (not String object)
- **Status**: ✅ Implemented

### isNumber

- **Location**: `src/predicates/isNumber/`
- **Signature**: `(value: unknown) => value is number`
- **Description**: Type guard that checks if a value is a JavaScript number primitive (excludes NaN)
- **Status**: ✅ Implemented

### isBoolean

- **Location**: `src/predicates/isBoolean/`
- **Signature**: `(value: unknown) => value is boolean`
- **Description**: Type guard that checks if a value is a boolean primitive (true or false)
- **Status**: ✅ Implemented

### isNull

- **Location**: `src/predicates/isNull/`
- **Signature**: `(value: unknown) => value is null`
- **Description**: Type guard that checks if a value is strictly null (not undefined or falsy)
- **Status**: ✅ Implemented

### isUndefined

- **Location**: `src/predicates/isUndefined/`
- **Signature**: `(value: unknown) => value is undefined`
- **Description**: Type guard that checks if a value is strictly undefined (not null or falsy)
- **Status**: ✅ Implemented

### isNullish

- **Location**: `src/predicates/isNullish/`
- **Signature**: `<T>(value: T | null | undefined) => value is null | undefined`
- **Description**: Type guard that checks if a value is null or undefined
- **Status**: ✅ Implemented

---

## Object Type Guards

### isObject

- **Location**: `src/predicates/isObject/`
- **Signature**: `(value: unknown) => value is object`
- **Description**: Type guard that checks if a value is a non-null object (includes arrays, functions, dates, etc.)
- **Status**: ✅ Implemented

### isPlainObject

- **Location**: `src/predicates/isPlainObject/`
- **Signature**: `(value: unknown) => value is Record<string, unknown>`
- **Description**: Type guard that checks if a value is a plain object (created by {} or Object.create(null))
- **Status**: ✅ Implemented

### isArray

- **Location**: `src/predicates/isArray/`
- **Signature**: `(value: unknown) => value is Array<unknown>`
- **Description**: Type guard that checks if a value is an Array using Array.isArray
- **Status**: ✅ Implemented

### isFunction

- **Location**: `src/predicates/isFunction/`
- **Signature**: `(value: unknown) => value is AnyFunction`
- **Description**: Type guard that checks if a value is callable as a function
- **Status**: ✅ Implemented

### isMap

- **Location**: `src/predicates/isMap/`
- **Signature**: `(value: unknown) => value is Map<unknown, unknown>`
- **Description**: Type guard that checks if a value is a Map instance
- **Status**: ✅ Implemented

### isSet

- **Location**: `src/predicates/isSet/`
- **Signature**: `(value: unknown) => value is Set<unknown>`
- **Description**: Type guard that checks if a value is a Set instance
- **Status**: ✅ Implemented

### isDate

- **Location**: `src/predicates/isDate/`
- **Signature**: `(value: unknown) => value is Date`
- **Description**: Type guard for legacy JavaScript Date objects
- **Status**: ✅ Implemented

### isRegExp

- **Location**: `src/predicates/isRegExp/`
- **Signature**: `(value: unknown) => value is RegExp`
- **Description**: Type guard that checks if a value is a RegExp instance
- **Status**: ✅ Implemented

---

## Existence Checks

### isDefined

- **Location**: `src/predicates/isDefined/`
- **Signature**: `<T>(value: T | undefined) => value is T`
- **Description**: Type guard that checks if a value is not undefined
- **Status**: ✅ Implemented

### isNotNull

- **Location**: `src/predicates/isNotNull/`
- **Signature**: `<T>(value: T | null) => value is T`
- **Description**: Type guard that checks if a value is not null
- **Status**: ✅ Implemented

### isNotNullish

- **Location**: `src/predicates/isNotNullish/`
- **Signature**: `<T>(value: T | null | undefined) => value is T`
- **Description**: Type guard that checks if a value is neither null nor undefined
- **Status**: ✅ Implemented

---

## Number Special Cases

### isFinite

- **Location**: `src/predicates/isFinite/`
- **Signature**: `(value: unknown) => value is number`
- **Description**: Type guard that checks if a value is a finite number (not Infinity or NaN)
- **Status**: ✅ Implemented

### isInfinite

- **Location**: `src/predicates/isInfinite/`
- **Signature**: `(value: unknown) => value is number`
- **Description**: Type guard that checks if a value is Infinity or -Infinity
- **Status**: ✅ Implemented

### isNaN

- **Location**: `src/predicates/isNaN/`
- **Signature**: `(value: unknown) => value is number`
- **Description**: Type guard that checks if a value is NaN
- **Status**: ✅ Implemented

### isPositiveInfinity

- **Location**: `src/predicates/isPositiveInfinity/`
- **Signature**: `(value: unknown) => value is number`
- **Description**: Type guard that checks if a value is positive Infinity
- **Status**: ✅ Implemented

### isNegativeInfinity

- **Location**: `src/predicates/isNegativeInfinity/`
- **Signature**: `(value: unknown) => value is number`
- **Description**: Type guard that checks if a value is negative Infinity
- **Status**: ✅ Implemented

---

## Branded Type Guards (Numeric)

### isInteger

- **Location**: `src/predicates/isInteger/`
- **Signature**: `(value: unknown) => value is Integer`
- **Description**: Type guard for Integer branded type
- **Status**: ✅ Implemented

### isBigInteger

- **Location**: `src/predicates/isBigInteger/`
- **Signature**: `(value: unknown) => value is BigInteger`
- **Description**: Type guard for BigInteger branded type
- **Status**: ✅ Implemented

### isRealNumber

- **Location**: `src/predicates/isRealNumber/`
- **Signature**: `(value: unknown) => value is RealNumber`
- **Description**: Type guard for RealNumber branded type (floating-point)
- **Status**: ✅ Implemented

### isOneDecimalPlace

- **Location**: `src/predicates/isOneDecimalPlace/`
- **Signature**: `(value: unknown) => value is OneDecimalPlace`
- **Description**: Type guard for OneDecimalPlace branded type
- **Status**: ✅ Implemented

### isTwoDecimalPlaces

- **Location**: `src/predicates/isTwoDecimalPlaces/`
- **Signature**: `(value: unknown) => value is TwoDecimalPlaces`
- **Description**: Type guard for TwoDecimalPlaces branded type
- **Status**: ✅ Implemented

### isThreeDecimalPlaces

- **Location**: `src/predicates/isThreeDecimalPlaces/`
- **Signature**: `(value: unknown) => value is ThreeDecimalPlaces`
- **Description**: Type guard for ThreeDecimalPlaces branded type
- **Status**: ✅ Implemented

### isFourDecimalPlaces

- **Location**: `src/predicates/isFourDecimalPlaces/`
- **Signature**: `(value: unknown) => value is FourDecimalPlaces`
- **Description**: Type guard for FourDecimalPlaces branded type
- **Status**: ✅ Implemented

### isEightDecimalPlaces

- **Location**: `src/predicates/isEightDecimalPlaces/`
- **Signature**: `(value: unknown) => value is EightDecimalPlaces`
- **Description**: Type guard for EightDecimalPlaces branded type (for cryptocurrencies)
- **Status**: ✅ Implemented

### isPercent

- **Location**: `src/predicates/isPercent/`
- **Signature**: `(value: unknown) => value is Percent`
- **Description**: Type guard for Percent branded type (0-1 range)
- **Status**: ✅ Implemented

---

## Branded Type Guards (Web/Network)

### isEmailAddress

- **Location**: `src/predicates/isEmailAddress/`
- **Signature**: `(value: unknown) => value is EmailAddress`
- **Description**: Type guard for EmailAddress branded type (RFC 5321 + RFC 6531)
- **Status**: ✅ Implemented

### isDomain

- **Location**: `src/predicates/isDomain/`
- **Signature**: `(value: unknown) => value is Domain`
- **Description**: Type guard for Domain branded type (RFC 1034/1035 + RFC 5890)
- **Status**: ✅ Implemented

### isHostname

- **Location**: `src/predicates/isHostname/`
- **Signature**: `(value: unknown) => value is Hostname`
- **Description**: Type guard for Hostname branded type (domain, localhost, or IP)
- **Status**: ✅ Implemented

### isIpv4Address

- **Location**: `src/predicates/isIpv4Address/`
- **Signature**: `(value: unknown) => value is Ipv4Address`
- **Description**: Type guard for Ipv4Address branded type
- **Status**: ✅ Implemented

### isIpv6Address

- **Location**: `src/predicates/isIpv6Address/`
- **Signature**: `(value: unknown) => value is Ipv6Address`
- **Description**: Type guard for Ipv6Address branded type (RFC 4291)
- **Status**: ✅ Implemented

### isUri

- **Location**: `src/predicates/isUri/`
- **Signature**: `(value: unknown) => value is Uri`
- **Description**: Type guard for Uri branded type (RFC 3986)
- **Status**: ✅ Implemented

### isUrl

- **Location**: `src/predicates/isUrl/`
- **Signature**: `(value: unknown) => value is Url`
- **Description**: Type guard for Url branded type (URL with protocol and domain)
- **Status**: ✅ Implemented

### isIri

- **Location**: `src/predicates/isIri/`
- **Signature**: `(value: unknown) => value is Iri`
- **Description**: Type guard for Iri branded type (RFC 3987, internationalized URI)
- **Status**: ✅ Implemented

---

## Branded Type Guards (Identifiers)

### isUuid

- **Location**: `src/predicates/isUuid/`
- **Signature**: `(value: unknown) => value is Uuid`
- **Description**: Type guard for Uuid branded type (RFC 4122)
- **Status**: ✅ Implemented

### isIsbn10

- **Location**: `src/predicates/isIsbn10/`
- **Signature**: `(value: unknown) => value is Isbn10`
- **Description**: Type guard for Isbn10 branded type
- **Status**: ✅ Implemented

### isIsbn13

- **Location**: `src/predicates/isIsbn13/`
- **Signature**: `(value: unknown) => value is Isbn13`
- **Description**: Type guard for Isbn13 branded type
- **Status**: ✅ Implemented

### isPhoneNumber

- **Location**: `src/predicates/isPhoneNumber/`
- **Signature**: `(value: unknown) => value is PhoneNumber`
- **Description**: Type guard for PhoneNumber branded type (E.164 format)
- **Status**: ✅ Implemented

### isPostalCode

- **Location**: `src/predicates/isPostalCode/`
- **Signature**: `(value: unknown) => value is PostalCode`
- **Description**: Type guard for PostalCode branded type
- **Status**: ✅ Implemented

---

## VirtualNode Type Guards

### isVirtualNode

- **Location**: `src/predicates/isVirtualNode/`
- **Signature**: `(value: unknown) => value is VirtualNode`
- **Description**: Type guard for VirtualNode (Sitebender's data-as-configuration DOM nodes)
- **Status**: ✅ Implemented

### isElementNode

- **Location**: `src/predicates/isElementNode/`
- **Signature**: `(value: unknown) => value is ElementNode`
- **Description**: Type guard for ElementNode VirtualNode variant
- **Status**: ✅ Implemented

### isTextNode

- **Location**: `src/predicates/isTextNode/`
- **Signature**: `(value: unknown) => value is TextNode`
- **Description**: Type guard for TextNode VirtualNode variant
- **Status**: ✅ Implemented

### isCommentNode

- **Location**: `src/predicates/isCommentNode/`
- **Signature**: `(value: unknown) => value is CommentNode`
- **Description**: Type guard for CommentNode VirtualNode variant
- **Status**: ✅ Implemented

### isErrorNode

- **Location**: `src/predicates/isErrorNode/`
- **Signature**: `(value: unknown) => value is ErrorNode`
- **Description**: Type guard for ErrorNode VirtualNode variant
- **Status**: ✅ Implemented

### hasTag

- **Location**: `src/predicates/hasTag/`
- **Signature**: `(value: unknown) => value is { tag: string }`
- **Description**: Type guard that checks if a value has a tag property
- **Status**: ✅ Implemented

---

## Utility Predicates

### isEqual

- **Location**: `src/predicates/isEqual/`
- **Signature**: `<T>(a: T) => (b: T) => boolean`
- **Description**: Curried equality check using Object.is
- **Status**: ✅ Implemented

### isUnequal

- **Location**: `src/predicates/isUnequal/`
- **Signature**: `<T>(a: T) => (b: T) => boolean`
- **Description**: Curried inequality check (negation of isEqual)
- **Status**: ✅ Implemented

### isPrintableCharacter

- **Location**: `src/predicates/isPrintableCharacter/`
- **Signature**: `(value: unknown) => value is string`
- **Description**: Type guard that checks if a string is a single printable ASCII character (code 32-126)
- **Status**: ✅ Implemented

---

## Implementation Notes

### Constitutional Compliance

All predicate functions follow Toolsmith constitutional rules:
- Named function declarations (no arrow functions)
- Pure functions (no side effects)
- Use raw operators internally with `[EXCEPTION]` comments
- Single function per file (one export per index.ts)

### Exception Comments

Predicates use raw operators (`typeof`, `===`, `Array.isArray()`, `instanceof`) with proper exception documentation:

```typescript
//++ [EXCEPTION] Using typeof for primitive type check
//++ This is a primitive type guard operation
return typeof value === "string"
```

### Type Narrowing

These predicates enable TypeScript's type narrowing:

```typescript
if (isString(value)) {
  // TypeScript now knows value is string
  const upper = value.toUpperCase()
}
```

---

## Migration Status

**Status**: ✅ COMPLETE - All predicates moved from validation to predicates folder

**Implementation**: 53/53 functions (100%)

All type guards have been successfully moved from `src/validation/` to `src/predicates/` and are fully implemented following the Toolsmith skill patterns.

---

**Last Updated**: 2025-10-31
