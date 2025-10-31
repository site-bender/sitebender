# Validation - Logic Functions

**Location**: `src/validation/`
**Functions**: 9
**Status**: Implemented
**Created**: 2025-10-31

---

## Overview

Validation logic functions for composing predicates and checking value constraints. These are distinct from type guards (which have been moved to `src/predicates/`).

These functions provide validation logic, predicate composition, and range checking utilities.

---

## Predicate Composition

### allPass

- **Location**: `src/validation/allPass/`
- **Signature**: `(predicates: ReadonlyArray<Predicate<T>>) => (value: T) => boolean`
- **Description**: Returns true if all predicates pass for the given value
- **Status**: ✅ Implemented
- **Pattern**: Curried predicate combinator
- **Example**:
  ```typescript
  const isPositiveInteger = allPass([isInteger, isPositive])
  isPositiveInteger(42) // true
  isPositiveInteger(-5) // false
  ```

### anyPass

- **Location**: `src/validation/anyPass/`
- **Signature**: `(predicates: ReadonlyArray<Predicate<T>>) => (value: T) => boolean`
- **Description**: Returns true if any predicate passes for the given value
- **Status**: ✅ Implemented
- **Pattern**: Curried predicate combinator
- **Example**:
  ```typescript
  const isNullOrEmpty = anyPass([isNull, isEmpty])
  isNullOrEmpty(null) // true
  isNullOrEmpty("") // true
  isNullOrEmpty("hello") // false
  ```

---

## Range Validation

### between

- **Location**: `src/validation/between/`
- **Signature**: `(min: number) => (max: number) => (value: number) => boolean`
- **Description**: Check if value is between min and max (exclusive on both ends)
- **Status**: ✅ Implemented
- **Pattern**: Ternary curried
- **Example**:
  ```typescript
  const isBetween1And10 = between(1)(10)
  isBetween1And10(5) // true
  isBetween1And10(1) // false (exclusive)
  isBetween1And10(10) // false (exclusive)
  ```

### betweenInclusive

- **Location**: `src/validation/betweenInclusive/`
- **Signature**: `(min: number) => (max: number) => (value: number) => boolean`
- **Description**: Check if value is between min and max (inclusive on both ends)
- **Status**: ✅ Implemented
- **Pattern**: Ternary curried
- **Example**:
  ```typescript
  const isBetween1And10Inclusive = betweenInclusive(1)(10)
  isBetween1And10Inclusive(1) // true (inclusive)
  isBetween1And10Inclusive(10) // true (inclusive)
  ```

### betweenMinInclusive

- **Location**: `src/validation/betweenMinInclusive/`
- **Signature**: `(min: number) => (max: number) => (value: number) => boolean`
- **Description**: Check if value is between min (inclusive) and max (exclusive)
- **Status**: ✅ Implemented
- **Pattern**: Ternary curried
- **Example**:
  ```typescript
  const isInRange = betweenMinInclusive(0)(100)
  isInRange(0) // true (min inclusive)
  isInRange(100) // false (max exclusive)
  ```

### betweenMaxInclusive

- **Location**: `src/validation/betweenMaxInclusive/`
- **Signature**: `(min: number) => (max: number) => (value: number) => boolean`
- **Description**: Check if value is between min (exclusive) and max (inclusive)
- **Status**: ✅ Implemented
- **Pattern**: Ternary curried
- **Example**:
  ```typescript
  const isInRange = betweenMaxInclusive(0)(100)
  isInRange(0) // false (min exclusive)
  isInRange(100) // true (max inclusive)
  ```

---

## Equality Comparison

### is

- **Location**: `src/validation/is/`
- **Signature**: `<T>(a: T) => (b: T) => boolean`
- **Description**: SameValue comparison using Object.is (handles NaN and -0/+0 correctly)
- **Status**: ✅ Implemented
- **Pattern**: Binary curried
- **Example**:
  ```typescript
  const isZero = is(0)
  isZero(0) // true
  isZero(-0) // false (Object.is distinguishes -0 from +0)

  const isNaN = is(NaN)
  isNaN(NaN) // true (Object.is correctly handles NaN)
  ```

---

## Internal Helpers

### _applyPredicate

- **Location**: `src/validation/_applyPredicate/`
- **Description**: Internal helper for applying predicates safely
- **Status**: ✅ Implemented
- **Visibility**: Private (underscore prefix indicates internal use only)

### _createRangeError

- **Location**: `src/validation/_createRangeError/`
- **Description**: Internal helper for creating ValidationError objects for range violations
- **Status**: ✅ Implemented
- **Visibility**: Private (underscore prefix indicates internal use only)

---

## Implementation Notes

### Constitutional Compliance

All validation functions follow Toolsmith constitutional rules:
- Named function declarations (no arrow functions)
- Pure functions (no side effects)
- Curried when multi-parameter
- Single function per file

### Predicate Type

Predicates used by `allPass` and `anyPass` have signature:
```typescript
type Predicate<T> = (value: T) => boolean
```

### Range Function Behavior

Range functions use strict inequality comparisons:
- **Exclusive** means `<` and `>`
- **Inclusive** means `<=` and `>=`
- Min always comes before max in currying order: `between(min)(max)(value)`

---

## Migration Status

**Status**: ✅ COMPLETE - Validation logic separated from type guards

**Implementation**: 9/9 functions (100%)

All validation logic functions are implemented. Type guards have been successfully moved to `src/predicates/`.

---

**Related Documentation**:
- [Predicates - Type Guards](../predicates/PREDICATES_TYPE_GUARDS.md)

**Last Updated**: 2025-10-31
