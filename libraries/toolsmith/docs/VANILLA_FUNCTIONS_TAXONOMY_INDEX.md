# Vanilla Functions Taxonomy - Master Index

**Status**: ✅ Complete - All 786 functions cataloged
**Created**: 2025-10-07
**Purpose**: Master index linking to all domain-specific taxonomy files

---

## Overview

This index provides links to detailed catalogs of all vanilla functions in `src/vanilla/`. Each domain has been documented in separate files with complete signatures, descriptions, and migration targets.

**Total Functions Cataloged**: 786 across 24 domains in 48 files

---

## Quick Navigation

| Domain | Functions | Files | Status |
|--------|-----------|-------|--------|
| [Activation](#activation) | 9 | 1 | ✅ Complete |
| [Array](#array) | 131 | 6 | ✅ Complete |
| [Async](#async) | 10 | 1 | ✅ Complete |
| [Combinator](#combinator) | 49 | 3 | ✅ Complete |
| [Conversion](#conversion) | 9 | 1 | ✅ Complete |
| [Finance](#finance) | 12 | 1 | ✅ Complete |
| [Geometry](#geometry) | 10 | 1 | ✅ Complete |
| [Hash](#hash) | 1 | 1 | ✅ Complete |
| [Interpolation](#interpolation) | 7 | 1 | ✅ Complete |
| [Lens](#lens) | 5 | 1 | ✅ Complete |
| [Logic](#logic) | 13 | 1 | ✅ Complete |
| [Map](#map) | 41 | 2 | ✅ Complete |
| [Math](#math) | 57 | 3 | ✅ Complete |
| [Matrix](#matrix) | 10 | 1 | ✅ Complete |
| [Object](#object) | 60 | 3 | ✅ Complete |
| [Physics](#physics) | 8 | 1 | ✅ Complete |
| [Set](#set) | 27 | 2 | ✅ Complete |
| [Special](#special) | 8 | 1 | ✅ Complete |
| [Statistics](#statistics) | 13 | 1 | ✅ Complete |
| [String](#string) | 71 | 4 | ✅ Complete |
| [Temporal](#temporal) | 79 | 4 | ✅ Complete |
| [Trigonometry](#trigonometry) | 19 | 1 | ✅ Complete |
| [Tuple](#tuple) | 13 | 1 | ✅ Complete |
| [Validation](#validation) | 124 | 6 | ✅ Complete |
| **TOTAL** | **786** | **48** | **✅ Complete** |

---

## Domain Details

### Activation

**Functions**: 9 | **Files**: 1 | **Location**: `taxonomy/activation/`

Neural network activation functions for machine learning applications.

- [ACTIVATION_FUNCTIONS.md](taxonomy/activation/ACTIVATION_FUNCTIONS.md) - All 9 activation functions
  - sigmoid, relu, leakyRelu, gelu, swish, softmax, softplus

---

### Array

**Functions**: 131 | **Files**: 6 | **Location**: `taxonomy/array/`

Comprehensive array manipulation, transformation, and query functions.

- [ARRAY_CREATION.md](taxonomy/array/ARRAY_CREATION.md) - 23 creation functions
  - range, repeat, from, unfold, cartesianProduct, zip, transpose, etc.
- [ARRAY_ACCESS.md](taxonomy/array/ARRAY_ACCESS.md) - 22 access functions
  - head, tail, last, nth, take, drop, slice, takeWhile, etc.
- [ARRAY_TRANSFORMATION.md](taxonomy/array/ARRAY_TRANSFORMATION.md) - 30 transformation functions
  - map, filter, reduce, flatMap, flatten, scan, partition, groupBy, etc.
- [ARRAY_COMBINATION.md](taxonomy/array/ARRAY_COMBINATION.md) - 23 combination functions
  - zip, zipWith, concat, interleave, union, intersection, etc.
- [ARRAY_PARTITIONING.md](taxonomy/array/ARRAY_PARTITIONING.md) - 25 partitioning functions
  - chunk, splitAt, span, takeWhile, dropWhile, groupBy, etc.
- [ARRAY_OPERATIONS.md](taxonomy/array/ARRAY_OPERATIONS.md) - 30 operation functions
  - sort, reverse, unique, find, includes, all, some, shuffle, etc.

---

### Async

**Functions**: 10 | **Files**: 1 | **Location**: `taxonomy/async/`

Promise and async function utilities for concurrent operations.

- [ASYNC_FUNCTIONS.md](taxonomy/async/ASYNC_FUNCTIONS.md) - All 10 async functions
  - delay, parallel, series, waterfall, whilst, retry, timeout, race

---

### Combinator

**Functions**: 49 | **Files**: 3 | **Location**: `taxonomy/combinator/`

Function combinators for composition, currying, and higher-order operations.

- [COMBINATOR_COMPOSITION.md](taxonomy/combinator/COMBINATOR_COMPOSITION.md) - 20 composition functions
  - compose, pipe, composeAsync, pipeAsync, lift, converge, juxt, etc.
- [COMBINATOR_CURRY.md](taxonomy/combinator/COMBINATOR_CURRY.md) - 15 currying functions
  - curry, curryN, partial, partialRight, arity, unary, binary, flip, etc.
- [COMBINATOR_UTILITIES.md](taxonomy/combinator/COMBINATOR_UTILITIES.md) - 14 utility functions
  - tap, memoize, debounce, throttle, once, tryCatch, identity, constant, etc.

---

### Conversion

**Functions**: 9 | **Files**: 1 | **Location**: `taxonomy/conversion/`

Type conversion and casting utilities.

- [CONVERSION_FUNCTIONS.md](taxonomy/conversion/CONVERSION_FUNCTIONS.md) - All 9 conversion functions
  - castValue, fromJson, toJson, safeParse, safeParseInt, safeParseFloat, etc.

---

### Finance

**Functions**: 12 | **Files**: 1 | **Location**: `taxonomy/finance/`

Financial calculations for present value, NPV, IRR, and amortization.

- [FINANCE_FUNCTIONS.md](taxonomy/finance/FINANCE_FUNCTIONS.md) - All 12 finance functions
  - presentValue, futureValue, netPresentValue, internalRateOfReturn, etc.

---

### Geometry

**Functions**: 10 | **Files**: 1 | **Location**: `taxonomy/geometry/`

Vector operations and distance metrics.

- [GEOMETRY_FUNCTIONS.md](taxonomy/geometry/GEOMETRY_FUNCTIONS.md) - All 10 geometry functions
  - dotProduct, crossProduct, magnitude, normalize, euclideanDistance, haversineDistance, etc.

---

### Hash

**Functions**: 1 | **Files**: 1 | **Location**: `taxonomy/hash/`

Cryptographic hashing utilities.

- [HASH_FUNCTIONS.md](taxonomy/hash/HASH_FUNCTIONS.md) - Hash function
  - hashHex (SHA-256 with extensible algorithm registry)

---

### Interpolation

**Functions**: 7 | **Files**: 1 | **Location**: `taxonomy/interpolation/`

Interpolation algorithms for smooth transitions.

- [INTERPOLATION_FUNCTIONS.md](taxonomy/interpolation/INTERPOLATION_FUNCTIONS.md) - All 7 interpolation functions
  - linearInterpolation, cubicInterpolation, bezierInterpolation, smoothstep, etc.

---

### Lens

**Functions**: 5 | **Files**: 1 | **Location**: `taxonomy/lens/`

Functional lenses for immutable data access and modification.

- [LENS_FUNCTIONS.md](taxonomy/lens/LENS_FUNCTIONS.md) - All 5 lens functions
  - composeLens, lensEq, lensGte, lensLte, lensSatisfies

---

### Logic

**Functions**: 13 | **Files**: 1 | **Location**: `taxonomy/logic/`

Boolean logic operators and control flow combinators.

- [LOGIC_FUNCTIONS.md](taxonomy/logic/LOGIC_FUNCTIONS.md) - All 13 logic functions
  - and, or, not, xor, implies, ifElse, when, unless, cond, etc.

---

### Map

**Functions**: 41 | **Files**: 2 | **Location**: `taxonomy/map/`

Immutable Map utilities for key-value collections.

- [MAP_CREATION.md](taxonomy/map/MAP_CREATION.md) - 5 creation functions
  - fromArray, fromEntries, fromObject, toObject, clear
- [MAP_OPERATIONS.md](taxonomy/map/MAP_OPERATIONS.md) - 36 operation functions
  - get, set, has, delete, map, filter, merge, union, intersection, etc.

---

### Math

**Functions**: 57 | **Files**: 3 | **Location**: `taxonomy/math/`

Mathematical operations from basic arithmetic to advanced functions.

- [MATH_ARITHMETIC.md](taxonomy/math/MATH_ARITHMETIC.md) - 25 arithmetic functions
  - add, subtract, multiply, divide, power, modulo, factorial, etc.
- [MATH_ROUNDING.md](taxonomy/math/MATH_ROUNDING.md) - 8 rounding functions
  - round, floor, ceiling, truncate, clamp, sign, absoluteValue
- [MATH_OPERATIONS.md](taxonomy/math/MATH_OPERATIONS.md) - 29 operation functions
  - max, min, sum, product, average, median, gcd, lcm, isPrime, etc.

---

### Matrix

**Functions**: 10 | **Files**: 1 | **Location**: `taxonomy/matrix/`

Matrix operations for linear algebra.

- [MATRIX_FUNCTIONS.md](taxonomy/matrix/MATRIX_FUNCTIONS.md) - All 10 matrix functions
  - determinant, transpose, multiply, inverse, trace, identityMatrix, etc.

---

### Object

**Functions**: 60 | **Files**: 3 | **Location**: `taxonomy/object/`

Object manipulation, traversal, and transformation utilities.

- [OBJECT_ACCESS.md](taxonomy/object/OBJECT_ACCESS.md) - 22 access functions
  - keys, values, entries, prop, path, has, view, lens, where, etc.
- [OBJECT_TRANSFORMATION.md](taxonomy/object/OBJECT_TRANSFORMATION.md) - 23 transformation functions
  - map, pick, omit, assoc, dissoc, merge, evolve, transform, etc.
- [OBJECT_UTILITIES.md](taxonomy/object/OBJECT_UTILITIES.md) - 20 utility functions
  - clone, fromEntries, toPairs, invert, zipObject, isEmpty, etc.

---

### Physics

**Functions**: 8 | **Files**: 1 | **Location**: `taxonomy/physics/`

Physics formulas for mechanics calculations.

- [PHYSICS_FUNCTIONS.md](taxonomy/physics/PHYSICS_FUNCTIONS.md) - All 8 physics functions
  - velocity, acceleration, force, momentum, kineticEnergy, potentialEnergy, etc.

---

### Set

**Functions**: 27 | **Files**: 2 | **Location**: `taxonomy/set/`

Immutable Set operations with ES2025 progressive enhancement.

- [SET_CREATION.md](taxonomy/set/SET_CREATION.md) - 12 creation functions
  - fromArray, toArray, map, filter, reduce, partitionBy, etc.
- [SET_OPERATIONS.md](taxonomy/set/SET_OPERATIONS.md) - 15 operation functions
  - add, delete, union, intersection, difference, isSubsetOf, etc.

---

### Special

**Functions**: 8 | **Files**: 1 | **Location**: `taxonomy/special/`

Special mathematical functions (gamma, beta, erf, etc.).

- [SPECIAL_FUNCTIONS.md](taxonomy/special/SPECIAL_FUNCTIONS.md) - All 8 special functions
  - gamma, beta, erf, erfc, binomialCoefficient, permutation, combination

---

### Statistics

**Functions**: 13 | **Files**: 1 | **Location**: `taxonomy/statistics/`

Statistical measures and calculations.

- [STATISTICS_FUNCTIONS.md](taxonomy/statistics/STATISTICS_FUNCTIONS.md) - All 13 statistics functions
  - variance, standardDeviation, covariance, correlation, zScore, percentile, etc.

---

### String

**Functions**: 71 | **Files**: 4 | **Location**: `taxonomy/string/`

Comprehensive string manipulation, testing, and formatting.

- [STRING_CASE.md](taxonomy/string/STRING_CASE.md) - 14 case conversion functions
  - toCamel, toPascal, toKebab, toSnake, toTitle, toUpper, toLower, etc.
- [STRING_TESTING.md](taxonomy/string/STRING_TESTING.md) - 15 testing functions
  - contains, startsWith, endsWith, isEmpty, test, match, levenshtein, etc.
- [STRING_MANIPULATION.md](taxonomy/string/STRING_MANIPULATION.md) - 24 manipulation functions
  - replace, trim, pad, slice, reverse, truncate, escape, normalize, etc.
- [STRING_UTILITIES.md](taxonomy/string/STRING_UTILITIES.md) - 22 utility functions
  - split, concat, repeat, lines, words, chars, indexOf, etc.

---

### Temporal

**Functions**: 79 | **Files**: 4 | **Location**: `taxonomy/temporal/`

TC39 Temporal API utilities for date/time operations.

- [TEMPORAL_CREATION.md](taxonomy/temporal/TEMPORAL_CREATION.md) - 14 creation functions
  - now, today, fromISO, parse, toPlainDate, duration, dateRange, etc.
- [TEMPORAL_MANIPULATION.md](taxonomy/temporal/TEMPORAL_MANIPULATION.md) - 28 manipulation functions
  - addDays, addHours, addMonths, startOfDay, endOfMonth, withTimeZone, etc.
- [TEMPORAL_COMPARISON.md](taxonomy/temporal/TEMPORAL_COMPARISON.md) - 14 comparison functions
  - compare, equals, diffDays, since, until, isLeapYear, isWeekend, etc.
- [TEMPORAL_FORMATTING.md](taxonomy/temporal/TEMPORAL_FORMATTING.md) - 23 formatting functions
  - format, toISO, getYear, getMonth, getDayOfWeek, getQuarter, etc.

---

### Trigonometry

**Functions**: 19 | **Files**: 1 | **Location**: `taxonomy/trigonometry/`

Trigonometric functions and coordinate conversions.

- [TRIGONOMETRY_FUNCTIONS.md](taxonomy/trigonometry/TRIGONOMETRY_FUNCTIONS.md) - All 19 trig functions
  - sine, cosine, tangent, arcSine, arcCosine, sinh, cosh, degreesToRadians, etc.

---

### Tuple

**Functions**: 13 | **Files**: 1 | **Location**: `taxonomy/tuple/`

Tuple constructors, accessors, and transformers.

- [TUPLE_FUNCTIONS.md](taxonomy/tuple/TUPLE_FUNCTIONS.md) - All 13 tuple functions
  - pair, triple, fst, snd, swap, both, mapFst, curry, uncurry, etc.

---

### Validation

**Functions**: 124 | **Files**: 6 | **Location**: `taxonomy/validation/`

Type guards, validators, and predicates for runtime type checking.

- [VALIDATION_TYPE_GUARDS.md](taxonomy/validation/VALIDATION_TYPE_GUARDS.md) - 24 type guard functions
  - isString, isNumber, isBoolean, isArray, isObject, isFunction, etc.
- [VALIDATION_NUMERIC.md](taxonomy/validation/VALIDATION_NUMERIC.md) - 21 numeric validators
  - isInteger, isFinite, isPositive, isNegative, gt, gte, lt, lte, etc.
- [VALIDATION_STRING.md](taxonomy/validation/VALIDATION_STRING.md) - 20 string validators
  - isEmail, isUrl, isUuid, isIpv4, isHexColor, isJSON, isAlpha, etc.
- [VALIDATION_COLLECTION.md](taxonomy/validation/VALIDATION_COLLECTION.md) - 22 collection validators
  - hasProperty, isEmpty, allPass, anyPass, both, either, minLength, etc.
- [VALIDATION_DATE.md](taxonomy/validation/VALIDATION_DATE.md) - 28 date validators
  - isAfterDate, isBeforeDate, isBetweenDates, isFutureDate, isPastDate, etc.
- [VALIDATION_CUSTOM.md](taxonomy/validation/VALIDATION_CUSTOM.md) - 14 custom validators
  - isCreditCard, isIban, isISBN, isPhone, isPostalCode, etc.

---

## Migration Summary

### Completion Status

✅ **All 786 functions cataloged** across 24 domains

### Documentation Includes

For each function:
- **Current Signature**: Exact vanilla implementation signature
- **Return Behavior**: What it returns (null, NaN, empty array, throws, etc.)
- **Description**: From //++ Envoy comments or inferred from implementation
- **Target Signature**: Proposed monadic signature using Result/Option
- **Migration Notes**: Domain-specific guidance for conversion
- **Special Considerations**: Edge cases, dependencies, constitutional violations

### Key Insights

**Constitutional Rule Violations Found**:
- Arrow functions: ~300+ functions need refactoring to named functions
- Try/catch usage: ~20 functions need Result monad conversion
- Loops: ~50 functions need functional rewrites
- Mutations: ~15 functions have mutable operations

**Return Patterns**:
- Null/undefined: ~200 functions
- NaN: ~80 math/numeric functions
- Empty array/object: ~100 collection functions
- Throws: ~20 functions
- Boolean: ~150 predicates/validators

**Target Patterns**:
- `Result<ValidationError, T>` for validators
- `Result<MathError, number>` for math operations
- `Result<ArrayError, Array<T>>` for array operations
- `Option<T>` for nullable returns
- Branded types for specialized values (Integer, RealNumber, etc.)

---

## Next Steps

1. ✅ **Taxonomy Complete** - All 786 functions documented
2. ⏭️ **Design Branded Types** - Create 308 branded type files (11 phases)
3. ⏭️ **Create Migration Templates** - One template per function category
4. ⏭️ **Execute Migration** - Domain by domain, following priority order
5. ⏭️ **Remove Legacy Code** - Delete vanilla/ folder when complete

---

## File Organization Plan

See [FILE_ORGANIZATION_PLAN.md](taxonomy/FILE_ORGANIZATION_PLAN.md) for the complete organizational strategy and rationale.

---

**Taxonomy Status**: ✅ COMPLETE - Ready for migration planning
**Last Updated**: 2025-10-07
